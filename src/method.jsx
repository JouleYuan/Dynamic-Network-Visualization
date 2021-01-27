import React, { Component } from "react"
import * as d3 from "d3"

class Methodbtn extends Component {
    constructor(props) {
        super(props)
    }

    getMethodNum = newMethod => {
        this.props.getMethod(newMethod)
    }
    getDayNum = newDay=>{
        this.props.getDay(newDay)
    }

    componentDidMount(props){
        const self = this
        const snapshotSVG = d3.select("#methodbtn")
        const width = 300
        const methods = [0,1,2,3]
        const methodName = ["t-SNE","PCA","PCA(3rd & 4th)","PCA(1st) & Time"]
        snapshotSVG.attr("width", width).attr("height",width)


        snapshotSVG
            .selectAll("circle")
            .data(methods)
            .enter()
            .append("circle")
            .attr("cx",40)
            .attr("cy",i => 15 + i*35)
            .attr("r",7)
            .attr("stroke-width",3)
            .attr("stroke","#4B7BAE")
            .attr("fill","rgb(79,79,79)")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("r", 8)
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .attr("r", 7)
            })
            .on("click",function(d,i){
                const y = 15 + i*35
                self.getMethodNum(i)
                snapshotSVG.select(".methodChoice").remove()
                snapshotSVG.append("circle")
                    .attr("class","methodChoice")
                    .attr("cx",40)
                    .attr("cy",y)
                    .attr("r",7)
                    .attr("stroke-width",3)
                    .attr("stroke","#5CE1F4")
                    .attr("fill","rgb(79,79,79)")
            })

        snapshotSVG.append("text").attr("x",60).attr("y",22).attr("font-size",20).attr("fill","#CC9966").text(methodName[0])
        snapshotSVG.append("text").attr("x",60).attr("y",57).attr("font-size",20).attr("fill","#CC9966").text(methodName[1])
        snapshotSVG.append("text").attr("x",60).attr("y",92).attr("font-size",20).attr("fill","#CC9966").text(methodName[2])
        snapshotSVG.append("text").attr("x",60).attr("y",127).attr("font-size",20).attr("fill","#CC9966").text(methodName[3])
    
      snapshotSVG.append("text").attr("x",95).attr("y",175).attr("font-size",20).attr("fill","rgb(202, 194, 194)").text("SELECT DATE")
      const days=[0,1,2,3,4,5]
       
      snapshotSVG
        .selectAll("rect")
        .data(days)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            if(i>2)
              return 180
            else
              return 40
        })
        .attr("y",function(d,i){
            if(i<3)
              return 200+35*i
            else  
              return 200+35*(i-3)
        })
        .attr("width",80)
        .attr("height",25)
        .attr("fill","rgb(66,197,227)")
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("fill", "rgb(184,228,232")
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", "rgb(66,197,227)")
        })
        .on("click",function(d,i){
            const y =200+35*(i%3)
            self.getDayNum(i)
            snapshotSVG.select(".dayChoice").remove()
            snapshotSVG.append("rect")
                .attr("class","dayChoice")
                .attr("x",i<3?40:180)
                .attr("y",y)
                .attr("width",80)
                .attr("height",25)
                .attr("fill","rgb(184,228,232)")
            
        })
    
        snapshotSVG.append("text").attr("x",40).attr("y",220).attr("font-size",20).attr("fill","rgb(27,67,106)").text("all")
        snapshotSVG.append("text").attr("x",40).attr("y",255).attr("font-size",18).attr("fill","rgb(27,67,106)").text("12-6")
        snapshotSVG.append("text").attr("x",40).attr("y",290).attr("font-size",18).attr("fill","rgb(27,67,106)").text("12-7")
        snapshotSVG.append("text").attr("x",180).attr("y",220).attr("font-size",18).attr("fill","rgb(27,67,106)").text("12-8")
        snapshotSVG.append("text").attr("x",180).attr("y",255).attr("font-size",18).attr("fill","rgb(27,67,106)").text("12-9")
        snapshotSVG.append("text").attr("x",180).attr("y",290).attr("font-size",18).attr("fill","rgb(27,67,106)").text("12-10")
    }

    render() {
        return <svg id="methodbtn" />
    }
}

export default Methodbtn
