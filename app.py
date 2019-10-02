import src.data_import as data_import
import src.clustering as cluster
#import matplotlib.pyplot as plt

df = data_import.load_coordinates_from_csv("data/voters.csv")
print df.head(5)
kmeans = cluster.create_clusters(df, 3)
print cluster.get_centroids(kmeans)
#plt.scatter(df['2'], df['3'], c= kmeans.labels_.astype(float), s=50, alpha=0.5)
