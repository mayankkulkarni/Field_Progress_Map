from sklearn.cluster import KMeans

def create_clusters(dataframe, volunteers):
    kmeans = KMeans(n_clusters=volunteers).fit(dataframe)
    return kmeans


def get_centroids(kmeans):
    return kmeans.cluster_centers_
