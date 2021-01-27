import React, {Component, Fragment} from 'react';
import * as d3 from "d3"
import './App.css'
import  Degree from  './degree'

class Parta extends Component{
    constructor(props){
        super(props);
        this.state = {
            graphnow: []
        }
    }

    componentDidMount() {
        
        var allGraph = []
        d3.json("./test_data.json").then(snapshots => {
            for (let i = 0;i < snapshots.length; i++)   allGraph.push(snapshots[i].graph)
            this.setState({
                graphnow : allGraph
            })
        })
    }
    componentWillReceiveProps(){
        const day=this.props.dayN
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
                    for(let i=830,j=0;i<956;)
                    allGraph[j++]=snapshots[i++].graph
                }
            //console.log(allGraph)
            if(this.props.graphN<allGraph.length){
                this.setState({
                    graphnow : allGraph
                })
            }
        })
    }
    render() {
        const graph = this.state.graphnow[this.props.graphN]
        return(
            <Fragment>
                <div id = 'partA'>
                    Degree Distribution
                    <Degree graph = {graph}/>
                </div>
            </Fragment>
        )
    }
}

export default Parta;