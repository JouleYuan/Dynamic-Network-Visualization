# Dynamic Network Visualization

This is a react web app which visualizes a dynamic network. The visualization mechanism is based on the [paper](https://ieeexplore.ieee.org/document/7192717), *Reducing Snapshots to Points A Visual Analytics Approach to Dynamic Network Exploration*. And the [dataset](http://networkrepository.com/ia-hospital-ward-proximity-attr.php) records the temporal network of contacts between patients and health-care workers (HCWs) in a hospital ward in Lyon, France, from Monday, December 6, 2010 at 1:00 pm to Friday, December 10, 2010 at 2:00 pm.

## Quick Start

First, install all the dependencies.

```shell
yarn install
```

Start the web app by the following command.

```shell
yarn start
```

The main page of the web app is shown as followed.

![home](.\public\home.png)

## Data Transformation

The code of the program to transform the data is in the data_processing directory, which is implemented with Python. If you want to try to transform the data yourself, please run algorithms.py first and then run class.py.

