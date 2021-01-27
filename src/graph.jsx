import React, { Component } from "react"
import * as d3 from "d3"

class Graph extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const graphSVG = d3.select("#graph")
        const width = 670
        graphSVG.attr("width", width).attr("height", width)

        graphSVG.append("rect").attr("x",400).attr("y",12).attr("width",16).attr("height",16)
            .attr("fill","steelblue")
        graphSVG.append("rect").attr("x",445).attr("y",12).attr("width",16).attr("height",16)
            .attr("fill","green")
        graphSVG.append("rect").attr("x",490).attr("y",12).attr("width",16).attr("height",16)
            .attr("fill","red")
        graphSVG.append("rect").attr("x",535).attr("y",12).attr("width",16).attr("height",16)
            .attr("fill","orange")
    }

    componentWillReceiveProps(props) {
        const graph = props.graph
        const graphSVG = d3.select("#graph")
        const padding = 100
        const width = 670
        const time=props.time
        
        const mcolor1=d3.rgb(10,121,187)
        const mcolor2=d3.rgb(29,165,21)
        const mcolor3=d3.rgb(224,42,43)
        const mcolor4=d3.rgb(255,194,83)
        const mcolor5=d3.rgb(172,172,59)
        graphSVG.attr("width", width).attr("height", width)

        //display time
        var unixtime0=time[0]
        var unixtime1=time[1]
        var unixTimestamp0 = new Date(unixtime0* 1000+6*60*60*1000) 
        var unixTimestamp1 = new Date(unixtime1* 1000+6*60*60*1000) 
        var date1=unixTimestamp0.getDate()
        var date2=unixTimestamp1.getDate()
        var hour1=unixTimestamp0.getHours()
        var hour2=unixTimestamp1.getHours()
        var min1=unixTimestamp0.getMinutes()
        var min2=unixTimestamp1.getMinutes() 
        min1<10&&(min1='0'+min1)
        min2<10&&(min2='0'+min2)
        hour1<10&&(hour1='0'+hour1)
        hour2<10&&(hour2='0'+hour2)
        date1<10&&(date1='0'+date1)
        date2<10&&(date2='0'+date2)
        
        const text=graphSVG
          .selectAll("text")
          .remove()
        graphSVG.append("text").attr("x",330).attr("y",620).attr("font-size",13).attr("fill","white")
        .text(date1+"/12/2010 "+hour1+":"+min1+" - "+date2+"/12/2010 "+hour2+":"+min2)
        .attr("opacity",0.7)
        
        const  classname=["NUR","PAT","MED","ADM"]
        graphSVG.append("text").attr("x",397).attr("y",45).attr("font-size",10).attr("fill","white").text(classname[0])
        graphSVG.append("text").attr("x",444).attr("y",45).attr("font-size",10).attr("fill","white").text(classname[1])
        graphSVG.append("text").attr("x",488).attr("y",45).attr("font-size",10).attr("fill","white").text(classname[2])
        graphSVG.append("text").attr("x",533).attr("y",45).attr("font-size",10).attr("fill","white").text(classname[3])
    
        const degreeEach = []
        for (let i = 0; i <graph.links.length; i++){
            let vertice1 = "000"
            let vertice2 = "000"

            if (graph.links[i].source.id) vertice1 = graph.links[i].source.id
            else vertice1 = graph.links[i].source
            if (graph.links[i].target.id) vertice2 = graph.links[i].target.id
            else vertice2 = graph.links[i].target

            if ( !degreeEach[vertice1] ) degreeEach[vertice1] = graph.links[i].weight
            else degreeEach[vertice1] += graph.links[i].weight
            if ( !degreeEach[vertice2] ) degreeEach[vertice2]= graph.links[i].weight
            else degreeEach[vertice2] += graph.links[i].weight
        }

        const simulation = d3
            .forceSimulation()
            .force(
                "link",
                d3.forceLink().id(function(d) {
                    return d.id
                })

            )
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, width / 2))
            .force("y", d3.forceY(0.001))
            .force("x", d3.forceX(0.001))

        simulation.nodes(graph.nodes).on("tick", ticked)
        simulation.force("link").links(graph.links).distance(100)

        var colorScale = d3.scaleOrdinal()
    		.domain(["NUR","PAT","MED","ADM"])
            .range(["steelblue","green","red","orange"]);
        
        var colorScale2 = d3.scaleOrdinal()
    		.domain(["NUR","PAT","MED","ADM"])
            .range([mcolor1,mcolor2,mcolor3,mcolor4]);

        let weightM = {}
        weightM.min = d3.min(graph.links, n => n.weight)
        weightM.max = d3.max(graph.links, n => n.weight)
        
        let degreeM={}
        degreeM.min=d3.min(degreeEach)
        degreeM.max=d3.max(degreeEach)
        const weightScale = d3
                .scaleLinear()
                .domain([weightM.min,weightM.max])
                .range([2,11])
        const rScale=d3
                .scaleLinear()
                .domain([degreeM.min,degreeM.max])
                .range([4,11])

        const oldlink = graphSVG
            .selectAll("line")
            .remove()

        const oldnodes = graphSVG
            .selectAll("circle")
            .remove()

        const link = graphSVG
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke", "grey")
            .attr("stroke-width",function(d){
                return weightScale(d.weight)
            }) 
            .attr("opacity",0.7)
         
        var gradient=graphSVG.append("defs")
        
        var l=[]
        const node = graphSVG
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r", function(d,i){
                return rScale(degreeEach[d.id])
            })
            .attr("fill",(d,i)=>{
                var tcolor=colorScale(d.class) 
                var tcolor2=colorScale2(d.class)
                 
                l[i]=
                gradient.append("linearGradient")
                .attr("id", tcolor)
                .attr("x1", "100%")
                .attr("y1", "100%")
                .attr("x2", "0%")
                .attr("y2", "0%")
                .attr("spreadMethod", "pad");
                //console.log(l[i])
                l[i].append("stop")
                .attr("offset", "0%")
                .attr("stop-color", ()=>{
                     return tcolor
                })
                .attr("stop-opacity", 1);
            
               l[i].append("stop")
                .attr("offset","50%")
                .attr("stop-color", ()=>{
                    //console.log(tcolor)
                    return tcolor2
                })
                .attr("stop-opacity",1)

                l[i].append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "white")
                .attr("stop-opacity", 1);     
                return "url(#" +l[i].attr("id") + ")"
            })
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.5).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        } 

        function ticked() {
            let max = {}
            let min = {}
            
            max.x = d3.max(graph.nodes, n => n.x)
            max.y = d3.max(graph.nodes, n => n.y)
            min.x = d3.min(graph.nodes, n => n.x)
            min.y = d3.min(graph.nodes, n => n.y)

        const xScale = d3
                .scaleLinear()
                .domain([min.x, max.x])
                .range([0.6*padding, width - padding*1.3])
        const yScale = d3
                .scaleLinear()
                .domain([min.y, max.y])
                .range([padding, width - padding])
                
          link.attr("x1", function(d) {
                return xScale(d.source.x)
            })
                .attr("y1", function(d) {
                    return yScale(d.source.y)
                })
                .attr("x2", function(d) {
                    return xScale(d.target.x)
                })
                .attr("y2", function(d) {
                    return yScale(d.target.y)
                })
            node.attr("cx", function(d) {
                return xScale(d.x)
            }).attr("cy", function(d) {
                return yScale(d.y)
            })
        }
    }
    render() {
        return <svg id="graph" />
    }
}

export default Graph
