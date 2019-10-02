import pandas as pd



def load_coordinates_from_csv(filename):
    data = pd.read_csv(filename, header=None, usecols=[2,3])
    return data


#Test


# Tasks:
# 1. Import the csv file ~
# 2. Input format for scikit-learn kmeans
# 3. Run kmeans on the imported data
# 4. Provide results in csv format
# 5. Handle exceptions


