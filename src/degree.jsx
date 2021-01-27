import React, { Component } from "react"
import * as d3 from "d3"

class Degree extends Component {
   componentWillReceiveProps(props) {
       
       const graph = props.graph
        const graphSVG = d3.select("#degree")
        const width = 300
        graphSVG.attr("width", width).attr("height", width * 1.2)
        graphSVG.append("rect").attr("x",25).attr("y",12).attr("width",width*0.9).attr("height",width*0.76)
    if(graph){
        const degreeEach = {}
        const ID = []
        let totalDegree = 0
        for (let i = 0; i <graph.links.length; i++){
            let vertice1 = graph.links[i].source
            let vertice2 = graph.links[i].target
            ID.push(vertice1,vertice2)
            totalDegree += graph.links[i].weight * 2
            if ( !degreeEach[vertice1] ) degreeEach[vertice1] = graph.links[i].weight
            else degreeEach[vertice1] += graph.links[i].weight
            if ( !degreeEach[vertice2] ) degreeEach[vertice2]= graph.links[i].weight
            else degreeEach[vertice2] += graph.links[i].weight
        }

        let IDs = ID.filter(function(ele,index,self){
            return self.indexOf(ele) === index;
        });

        graphSVG.selectAll("text").remove()
        graphSVG.append("text").text("Total Degree: "+ totalDegree).attr("transform","translate(20,295)").attr("fill","rgb(202, 194, 194)")
        graphSVG.append("text").text("Average Degree: "+ totalDegree / IDs.length).attr("transform","translate(20,315)").attr("fill","rgb(202, 194, 194)")

        const degreeDis = [0,0,0,0,0,0,0,0,0,0]
        for (let i = 0;i < IDs.length;i++){
            for(let j = 0;j<10;j++){
                if (degreeEach[IDs[i]] >= 2**j && degreeEach[IDs[i]] < 2**(j+1)){
                    degreeDis[j] ++;
                    break;
                }
            }
        }

        const maxdegree = d3.max(degreeDis)

        const text = ['1-1','2-3','4-7','8-15','16-31','32-63','64-127','128-255','256-511','512-1023']
        const xScale = d3.scaleBand()
            .range([0,width*0.95])
            .domain(text)
        const yScale = d3.scaleLinear()
            .range([0,width*0.7])
            .domain([maxdegree,0])
        let xAxis = d3.axisBottom().scale(xScale)
        let yAxis = d3.axisLeft().scale(yScale)

        graphSVG.selectAll(".axis").remove()
        graphSVG.selectAll("circle").remove()

        graphSVG.append("g")
            .attr("class","axis")
            .attr("transform","translate("+width*0.04+","+width*0.8+")")
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(55)")
            .style("text-anchor", "start");
        graphSVG.append("g")
            .attr("class","axis")
            .attr("transform","translate(24,20)")
            .call(yAxis)

        var line_generator=d3.line()
            .x(function(d,i){
                return xScale(text[i])
            })
            .y(function(d){
                return yScale(d)
            })

        var g=graphSVG.append("g")
            .attr("transform","translate("+width*0.09+","+20+")")

        g.append("path")
            .attr("d",line_generator(degreeDis))
            .attr('stroke', 'white')
            .attr('stroke-width', 1)

        const nodeData = []
        for (let i = 0; i < 10;i ++){
            nodeData.push([xScale(text[i]),yScale(degreeDis[i])])
        }

        const nodes = graphSVG
            .selectAll("circle")
            .data(nodeData)
        nodes
            .enter()
            .append("circle")
            .attr("transform",d => "translate("+(d[0]+width*0.09)+","+(d[1]+20)+")")
            .attr("r",5)
            .attr("fill","white")
      }
    }

    render() {
        return <svg id="degree" />
    }
}

export default Degree
