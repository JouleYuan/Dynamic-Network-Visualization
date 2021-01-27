import React, {Component, Fragment} from 'react';
import * as d3 from "d3"
import './App.css'
import Graph from './graph';

class Partc extends Component{
    constructor(props) {
        super(props);
        this.state = {
            time: [],
            graphnow: []
        }
    }

    componentDidMount() {
        const allGraph = []
        d3.json("./test_data.json").then(snapshots => {
                for (let i = 0;i < snapshots.length; i++)   allGraph.push(snapshots[i].graph)
            this.setState({
                graphnow : allGraph,
                time : snapshots[this.props.graphN].time
            })
            
        })
    }

    componentWillReceiveProps(props){
        const day=props.dayN
        var allGraph = []
        d3.json("./test_data.json").then(snapshots => {
               if(day==0){
                    for(let i=0,j=0;i<957;)
                    allGraph[j++]=snapshots[i++].graph
                }else if(day==1){
                    for(let i=0,j=0;i<110;)
                    allGraph[j++]=snapshots[i++].graph
                }else if(day==2){
                    for(let i=110,j=0;i<350;)
                   allGraph[j++]=snapshots[i++].graph
                }else if(day==3){
                    for(let i=350,j=0;i<590;)
                    allGraph[j++]=snapshots[i++].graph
                }else if(day==4){
                    for(let i=590,j=0;i<830;)
                    allGraph[j++]=snapshots[i++].graph
                }else{
                    for(let i=830,j=0;i<957;)
                    allGraph[j++]=snapshots[i++].graph
                }

            const addtion=[0,0,110,350,590,830]
            if(props.graphN<allGraph.length){
                this.setState({
                    graphnow : allGraph,
                    time : snapshots[props.graphN+addtion[day]].time
                })
            }
        })
    }

    render() {
        const graph = this.state.graphnow[this.props.graphN]
        const time=this.state.time
            
            return(
                <Fragment>
                    <div id = 'partC'>
                        NETWORK
                        <Graph time={time} graph={graph} />
                    </div>
                </Fragment>
            )
    }
}

export default Partc;