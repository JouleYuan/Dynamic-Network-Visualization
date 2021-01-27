import csv
import json

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
            class0 = "NUR"  # NUR
        elif int(row[3]) == 2:
            class0 = "PAT"  # PAT
        elif int(row[3]) == 3:
            class0 = "MED"  # MED
        elif int(row[3]) == 4:
            class0 = "ADM"  # ADM
        if int(row[4]) == 1:
            class1 = "NUR"  # NUR
        elif int(row[4]) == 2:
            class1 = "PAT"  # PAT
        elif int(row[4]) == 3:
            class1 = "MED"  # MED
        elif int(row[4]) == 4:
            class1 = "MED"  # MED
        # demo
        # class0 = row[3]
        # class1 = row[4]
        links.append({
            'time': int(time),
            'id0': id0,
            'id1': id1,
            'class0': class0,
            'class1': class1
        })

nodes = []
for link in links:
    flag0 = True
    flag1 = True
    for node in nodes:
        if node['id'] == link['id0']:
            flag0 = False
        if node['id'] == link['id1']:
            flag1 = False
        if flag0 == False and flag1 == False:
            break
    if flag0:
        nodes.append({
            'id': link['id0'],
            'class': link['class0']
        })
    if flag1:
        nodes.append({
            'id': link['id1'],
            'class': link['class1']
        })

start_time = links[0]['time']
end_time = links[len(links)-1]['time']
snapshot_time = 3600
interval_time = 360

with open("original_data.json", 'r') as f:
    data = json.load(f)

for single_data in data:
    for data_node in single_data['graph']['nodes']:
        for node in nodes:
            if node['id'] == data_node['id']:
                data_node['class'] = node['class']
                break

for num in range(len(data)):
    data[num]['time'] = [start_time + num * interval_time, start_time + snapshot_time + num * interval_time]

with open("data.json", "w") as f:
    json.dump(data, f)

