import csv
import json

with open('thiers_2012.csv', 'r') as f:
    thiers_2012 = csv.reader(f, delimiter=',')
    links = []
    # read file
    for row in thiers_2012:
        time = row[0]
        id0 = row[1]
        id1 = row[2]
        class0 = row[3]
        class1 = row[4]
        links.append({
            'time': int(time),
            'id0': id0,
            'id1': id1,
            'class0': class0,
            'class1': class1
        })

start_time = links[0]['time']
end_time = links[len(links)-1]['time']
snapshot_time = 3600
interval_time = 360

with open("data_class.json", 'r') as f:
    data = json.load(f)

for num in range(len(data)):
    data[num]['time'] = [start_time + num * interval_time, start_time + snapshot_time + num * interval_time]

with open("data_time.json", "w") as f:
    json.dump(data, f)
