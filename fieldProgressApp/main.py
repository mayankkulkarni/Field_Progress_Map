import os
import pandas as pd
import geopandas as gpd
from mapboxgl.utils import *
from mapboxgl.viz import *
from shapely.geometry import Polygon, Point
from mapbox import DirectionsMatrix
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
from geojson import dump

class VehicleRouting(object):

    def __init__(self, volunteer_info, mapbox_token, volunteers = 4, precinct = '130960', penalty = 1000, slack = 600):
        self.volunteers = volunteers
        self.precinct = precinct
        self.volunteer_info = volunteer_info
        self.mapbox_token = mapbox_token
        self.travel_times = None
        self.penalty = penalty
        self.precinct_voters = None
        self.slack = slack

        if self.precinct == None or self.precinct == '':
            raise Exception('Must provide a precinct')

    def load_data(self):
        df = pd.read_csv('fieldProgressApp/data/voters.csv')
        df.columns = ['Name', 'Address', 'lat', 'lon', 'zipcode']
        pdf = gpd.read_file('fieldProgressApp/data/precincts_sdcc_d6.json')
        vdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))
        return pdf, vdf

    def get_volunteer_mapping(self):

        if len(self.volunteer_info) == 0:
            raise Exception('Cannot work with no volunteers')

        availability = []
        names = {}
        idx = 0
        for i in self.volunteer_info:
            availability += [int(float(i['availability'])*60*60)]
            names[idx] = i['volunteerName']
            idx+=1
        return availability, names

    def create_voter_geojson(self, pvdf):
        voters = df_to_geojson(pvdf, filename=None,
                               properties=['Name', 'Address', 'zipcode'],
                               lat='lat', lon='lon', precision=10)
        return voters

    def get_travel_time_matrix(self):
        if len(self.precinct_voters) > 25:
            raise NotImplemented("API Allows only 25 voters currently")
        service = DirectionsMatrix()
        response = service.matrix(self.precinct_voters['features'], profile='mapbox/walking')
        travel_times = response.json()['durations']
        for i in range(len(travel_times)):
            for j in range(len(travel_times[0])):
                travel_times[i][j] = int(travel_times[i][j]) + 600
        travel_times.insert(0, [0] * len(travel_times))
        for i in travel_times:
            i.insert(0, 0)
        return travel_times

    def create_data_model(self, availability):
        data = {}
        data['time_matrix'] = self.travel_times
        data['num_vehicles'] = self.volunteers
        data['depot'] = 0
        data['demands'] = [0] * len(self.travel_times)  # voters don't have any demands
        data['vehicle_capacities'] = availability # availability for 4 volunteers in seconds
        return data

    def get_solution(self, data, manager, routing, solution, names):
        max_route_distance = 0
        for vehicle_id in range(data['num_vehicles']):
            st_index = routing.Start(vehicle_id)
            index = solution.Value(routing.NextVar(st_index))
            plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
            self.precinct_voters['features'][manager.IndexToNode(st_index) - 1]['properties'].update({'first_voter': True})
            route_distance = 0
            while not routing.IsEnd(index):
                plan_output += ' {} -> '.format(manager.IndexToNode(index))
                idx = manager.IndexToNode(index) - 1
                self.precinct_voters['features'][idx]['properties'].update({'volunteer': names[vehicle_id]})
                self.precinct_voters['features'][idx]['properties'].update({'cluster': vehicle_id})
                previous_index = index
                index = solution.Value(routing.NextVar(index))
                if routing.IsEnd(index):
                    self.precinct_voters['features'][idx]['properties'].update({'next_voter': None})
                else:
                    self.precinct_voters['features'][idx]['properties'].update(
                        {'next_voter': self.precinct_voters['features'][manager.IndexToNode(index) - 1]['properties']['Address']})
                self.precinct_voters['features'][manager.IndexToNode(index) - 1]['properties'].update({'first_voter': False})
                route_distance += routing.GetArcCostForVehicle(
                    previous_index, index, vehicle_id)
            #         plan_output += '{}\n'.format(manager.IndexToNode(index))
            plan_output = plan_output[:-3]
            plan_output += '\nTime of the route: {}secs\n'.format(route_distance)
        with open('cluster.geojson', 'w') as f:
            geojson.dump(self.precinct_voters, f)

    def VehicleRoutingProblem(self, availability, names):
        data = self.create_data_model(availability)
        manager = pywrapcp.RoutingIndexManager(len(data['time_matrix']), data['num_vehicles'], data['depot'])
        routing = pywrapcp.RoutingModel(manager)

        def distance_callback(from_index, to_index):
            """Returns the distance between the two nodes."""
            # Convert from routing variable Index to distance matrix NodeIndex.
            from_node = manager.IndexToNode(from_index)
            to_node = manager.IndexToNode(to_index)
            return data['time_matrix'][from_node][to_node]

        transit_callback_index = routing.RegisterTransitCallback(distance_callback)
        routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

        dimension_name = 'TravelDistance'
        routing.AddDimensionWithVehicleCapacity(
            transit_callback_index,
            self.slack,  # slack is 10 minutes wait time at each voter (taking time)
            data['vehicle_capacities'],  # vehicle maximum travel distance
            True,  # start cumul to zero
            dimension_name)

        for node in range(1, len(data['time_matrix'])):
            routing.AddDisjunction([manager.NodeToIndex(node)], self.penalty)

        # Setting first solution heuristic.
        search_parameters = pywrapcp.DefaultRoutingSearchParameters()
        search_parameters.first_solution_strategy = (
            routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
        # Solve the problem.
        solution = routing.SolveWithParameters(search_parameters)

        if solution:
            self.get_solution(data, manager, routing, solution, names)

    def cut(self):
        precinct_df, voter_df = self.load_data()
        availability, names = self.get_volunteer_mapping()
        pvdf = voter_df[precinct_df.loc[precinct_df['code'] == self.precinct]['geometry'].apply(lambda x: voter_df['geometry'].within(x)).any()]
        os.environ['MAPBOX_ACCESS_TOKEN'] = self.mapbox_token
        self.precinct_voters = self.create_voter_geojson(pvdf)
        self.travel_times = self.get_travel_time_matrix()
        self.VehicleRoutingProblem(availability, names)


# volunteer_info = [
#     {
#        'volunteer_name' : 'Dracula',
#         'availability' : 2400
#     },
#     {
#         'volunteer_name': 'Kutti Kamini',
#         'availability': 2400
#     },
#     {
#         'volunteer_name': 'Khwaab',
#         'availability': 2900
#     },
#     {
#         'volunteer_name': 'Velma',
#         'availability': 1400
#     }
# ]

# mapbox_token = 'pk.eyJ1IjoidWJhY2hyaXMiLCJhIjoiY2sxYjczdWhpMGZuMzNjb2I5OGlqb3gwaCJ9.iLrtxaVXfhsJM0iyWwdQ5Q'

# vrp = VehicleRouting(volunteer_info, mapbox_token)
# vrp.cut()
