import networkx as nx


def network(snapshot, nodes):
    graph = nx.Graph()
    graph_nodes = nx.Graph()
    nodes_nodes = []
    edges = []
    for num in range(len(snapshot)):
        flag = True
        nodes_nodes.append(snapshot[num]['id0'])
        nodes_nodes.append(snapshot[num]['id1'])
        for num1 in range(len(edges)):
            if (snapshot[num]['id0'] == edges[num1][0] and snapshot[num]['id1'] == edges[num1][1]) \
            or (snapshot[num]['id1'] == edges[num1][0] and snapshot[num]['id0'] == edges[num1][1]):
                edges[num1][2] += 1
                flag = False
        if flag:
            edges.append([snapshot[num]['id0'], snapshot[num]['id1'], 1])
    graph.add_nodes_from(nodes)
    graph_nodes.add_nodes_from(nodes_nodes)
    for edge in edges:
        graph.add_edge(edge[0], edge[1], weight=edge[2])
        graph_nodes.add_edge(edge[0], edge[1], weight=edge[2])
    return graph, graph_nodes


def Nodes(snapshots):
    id = []
    for snapshot in snapshots:
        for num in range(len(snapshot)):
            id.append(snapshot[num]['id0'])
            id.append(snapshot[num]['id1'])
    nodes = list(set(id))
    return nodes
