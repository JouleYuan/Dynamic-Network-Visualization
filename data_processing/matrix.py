import networkx as nx
import numpy as np


def matrix(graphs, num):
    A = nx.adjacency_matrix(graphs[num]).todense()
    vector = np.array([])
    for row in A:
        vector = np.append(vector, row)
    return vector
