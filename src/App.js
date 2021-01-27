import React, {Component} from 'react';
import './App.css'
import Parta from './Parta'
import Partb from './Partb'
import Partc from './Partc'


class App extends Component{
    constructor(props){
        super(props);
        this.state={
            graphNum : 0,
            dayNum : 0
        }
    }

    getGraphNum = newGraph => {
        this.setState({
            graphNum : newGraph
        })
    }
    getDayNum = newDay => {
        this.setState({
            dayNum: newDay
        })
    }
    render(){
        return(
            <div>
                <Parta dayN={this.state.dayNum} graphN = {this.state.graphNum}/>
                <Partb getDay={this.getDayNum.bind(this)} getGraph = {this.getGraphNum.bind(this)} dayNum={this.state.dayNum} />
                <Partc graphN = {this.state.graphNum} dayN={this.state.dayNum}/>
            </div>
        )
    }
}

export default App;