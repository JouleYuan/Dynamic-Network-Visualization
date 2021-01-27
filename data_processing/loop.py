def loop(links, temp_link_number, start_time, flag, interval_time, snapshot_time):
    temp_graph = []
    while start_time + flag * interval_time > links[temp_link_number]['time']:
        temp_link_number += 1
        if temp_link_number >= len(links):
            break
    link_number = temp_link_number
    while links[temp_link_number]['time'] < start_time + flag * interval_time + snapshot_time:
        temp_graph.append(links[temp_link_number])
        temp_link_number += 1
        if temp_link_number >= len(links):
            break
    return temp_graph, link_number
