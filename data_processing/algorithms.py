"""
dataset citation:
@inproceedings{nr-aaai15,
    title = {The Network Data Repository with Interactive Graph Analytics and Visualization},
    author={Ryan A. Rossi and Nesreen K. Ahmed},
    booktitle = {AAAI},
    url={http://networkrepository.com},
    year={2015}
}
"""

import csv
from networkx.readwrite import json_graph
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
from sklearn.manifold import MDS
import json
import numpy as np
import networkx as nx
from sklearn import preprocessing

from loop import loop
from network import network, Nodes
from matrix import matrix

with open('ia-hospital-ward-proximity-attr.csv') as f:
    hospital = csv.reader(f, delimiter=',')
    links = []
    # read file
    for row in hospital:
        time = row[0]
        id0 = row[1]
        id1 = row[2]
        # hospital
        if int(row[3]) == 1:
            class0 = "NUR"
        elif int(row[3]) == 2:
            class0 = "PAT"
        elif int(row[3]) == 3:
            class0 = "MED"
        elif int(row[3]) == 4:
            class0 = "ADM"
        if int(row[4]) == 1:
            class1 = "NUR"
        elif int(row[4]) == 2:
            class1 = "MP*2"
        elif int(row[4]) == 3:
            class1 = "MED"
        elif int(row[4]) == 4:
            class1 = "ADM"
        links.append({
            'time': int(time),
            'id0': id0,
            'id1': id1,
            'class0': class0,
            'class1': class1
        })

snapshots = []
start_time = links[0]['time']
end_time = links[len(links)-1]['time']
flag = 0
link_number = 0
interval_time = 360
snapshot_time = 3600
while start_time + flag * interval_time - interval_time <= end_time - snapshot_time:
    if link_number >= len(links):
        break
    link_graph, link_number = loop(links, link_number, start_time, flag, interval_time, snapshot_time)
    snapshots.append(link_graph)
    flag += 1

nodes = Nodes(snapshots)
graphs = []
graphs_nodes = []
for snapshot in snapshots:
    graph, graph_nodes = network(snapshot, nodes)
    graphs.append(graph)
    graphs_nodes.append(graph_nodes)

vectors = []
for num in range(len(graphs)):
    vector = matrix(graphs, num)
    vectors.append(vector)

do_pca = True
do_tsne = True
do_mds = False
do_one_dimension_pca = True
do_normolization =False

# PCA
if do_pca:
    estimator = PCA(n_components=2)
    X_pca = estimator.fit_transform(vectors)
    PCA_Vectors = X_pca.tolist()
    estimator = PCA(n_components=4)
    X_pca = estimator.fit_transform(vectors)
    PCAVectors = X_pca.tolist()
    PCA2_Vectors = []
    for num in range(len(PCAVectors)):
        PCA2_Vectors.append([PCAVectors[num][2], PCAVectors[num][3]])

# TSNE
if do_tsne:
    estimator = TSNE(n_components=2)
    X_tsne = estimator.fit_transform(vectors)
    TSNE_Vectors = X_tsne.tolist()

# MDS
if do_mds:
    estimator = MDS(n_components=2)
    X_mds = estimator.fit_transform(vectors)
    MDS_Vectors = X_mds.tolist()

if do_one_dimension_pca:
    estimator = PCA(n_components=1)
    X_pca = estimator.fit_transform(vectors)
    PCAVectors = X_pca.tolist()
    ONEDIMENSION_Vectors = []
    for num in range(len(PCAVectors)):
        ONEDIMENSION_Vectors.append([PCAVectors[num][0], num])

if do_normolization:
    vectors = preprocessing.scale(vectors)
    estimator = TSNE(n_components=2)
    X_tsne = estimator.fit_transform(vectors)
    TSNE2_Vectors = X_tsne.tolist()

data = []
for num in range(len(vectors)):
    Graph = json_graph.node_link_data(graphs_nodes[num])
    data.append({
        'vector': {
            'tsne': TSNE_Vectors[num],
            'pca': PCA_Vectors[num],
            'pca2': PCA2_Vectors[num],
            'one_dimension': ONEDIMENSION_Vectors[num]
        },
        'graph': Graph
    })
with open("original_data.json", "w") as f:
    json.dump(data, f)
