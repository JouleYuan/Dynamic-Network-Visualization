import React, {Component, Fragment} from 'react';
import * as d3 from "d3"
import './App.css'
import Snapshots from "./snapshots";
import Methodbtn from "./method";

class Partb extends Component{
    constructor(props){
        super(props);
        this.state = {
            Snapshots: [],
            methodNum : 0,
        }
    }

    getGraphNum = newGraph => {
        this.props.getGraph(newGraph)
    }
    getDayNum = newDay =>{
        this.props.getDay(newDay)
    }
    getMethodNum = newMethod => {
        this.setState({
            methodNum : newMethod
        })
    }
     
    
     
componentDidMount() { 
        
        d3.json("./test_data.json").then(snapshots => {
            this.setState({
                Snapshots : snapshots
            })
        })
    }
     
    render() {
        
        const snapshots = this.state.Snapshots
        return(
            <Fragment>
                <div id = 'partB'>
                    PROJECTION
                    <Snapshots snapshots={snapshots} method = {this.state.methodNum} day={this.props.dayNum} getGraph ={this.getGraphNum.bind(this)}/>
                </div>
                <div id = 'method'>
                    METHOD
                    <Methodbtn getMethod = {this.getMethodNum.bind(this)} getDay={this.getDayNum.bind(this)}/>
                </div>
            </Fragment>
        )
    }
}



export default Partb;