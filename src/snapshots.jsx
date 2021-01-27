import React, { Component } from "react"
import * as d3 from "d3"

class Snapshots extends Component {
    constructor(props) {
        super(props)
    }

    getGraphNum = newNum => {
        this.props.getGraph(newNum)
    }

    componentDidMount(props) {
        const colorExample = d3.select("#snapshot")
        var defs = colorExample.append("defs");

        var linearGradient = defs.append("linearGradient")
            .attr("id","linearColor")
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","100%")
            .attr("y2","0%");

        var stop1 = linearGradient.append("stop")
            .attr("offset","0%")
            .style("stop-color","rgb(232,247,233)");

        var stop2 = linearGradient.append("stop")
            .attr("offset","100%")
            .style("stop-color","rgb(36,63,109)");

        var colorRect = colorExample.append("rect")
            .attr("x", 420)
            .attr("y", 0)
            .attr("width", 150)
            .attr("height", 8)
            .style("fill","url(#" + linearGradient.attr("id") + ")");
    }

    componentWillReceiveProps(props) {
        var snapshots = props.snapshots
        const self = this
        const snapshotSVG = d3.select("#snapshot")
        const padding = 40
        const width = 620
        const methods = ["tsne","pca","pca2","one_dimension"]
        snapshotSVG.attr("width", width).attr("height", width )
        const max = {}
        const min = {}
        const method = methods[props.method]
        const day=props.day
        var tsnapshots=[]

        if(day==0){
            tsnapshots=snapshots
        }else if(day==1){
            for(let i=0,j=0;i<110;)
            tsnapshots[j++]=snapshots[i++]
        }else if(day==2){
            for(let i=110,j=0;i<350;)
            tsnapshots[j++]=snapshots[i++]
        }else if(day==3){
            for(let i=350,j=0;i<590;)
            tsnapshots[j++]=snapshots[i++]
        }else if(day==4){
            for(let i=590,j=0;i<830;)
            tsnapshots[j++]=snapshots[i++]
        }else{
            for(let i=830,j=0;i<957;)
            tsnapshots[j++]=snapshots[i++]
        }
        snapshots=tsnapshots

        const cntday=[957,110,240,240,240,126]
        const daytext1=["06.12.10 13:00","06.12 13:00","07.12 00:00","08.12 00:00","09.12 00:00","10.12 00:00"]
        const daytext2=["10.12.10 14:00","06.12 24:00","07.12 24:00","08.12 24:00","09.12 24:00","10.12 14:00"]
        snapshotSVG.selectAll("text").remove()
        snapshotSVG.append("text").attr("x",400).attr("y",19).attr("font-size",8).attr("fill","white").text(daytext1[day])
        snapshotSVG.append("text").attr("x",535).attr("y",19).attr("font-size",8).attr("fill","white").text(daytext2[day])
        
        max.x = d3.max(snapshots, snpst => snpst.vector[method][0])
        max.y = d3.max(snapshots, snpst => snpst.vector[method][1])
        min.x = d3.min(snapshots, snpst => snpst.vector[method][0])
        min.y = d3.min(snapshots, snpst => snpst.vector[method][1])
        const xScale = d3
            .scaleLinear()
            .domain([min.x, max.x])
            .range([padding, width - padding])
        const yScale = d3
            .scaleLinear()
            .domain([min.y, max.y])
            .range([padding, width - padding])
        const rScale = d3
            .scaleLinear()
            .domain([0, cntday[day]])
            .range([232, 36])
        const gScale = d3
            .scaleLinear()
            .domain([0, cntday[day]])
            .range([247, 63])
        const bScale = d3
            .scaleLinear()
            .domain([0, cntday[day]])
            .range([233, 109])

        snapshotSVG.selectAll("line").remove()
        snapshotSVG.selectAll("circle").remove()

        const snapshotLinkData = []
        for (let i = 0; i < snapshots.length - 1; i++) {
             snapshotLinkData.push([
                snapshots[i].vector[method],
                snapshots[i + 1].vector[method]
            ])
        }
        const snapshotLink = snapshotSVG
            .selectAll("line")
            .data(snapshotLinkData)
        snapshotLink.exit().remove()
        snapshotLink
            .enter()
            .append("line")
            .attr("x1", d => xScale(d[0][0]))
            .attr("x2", d => xScale(d[1][0]))
            .attr("y1", d => yScale(d[0][1]))
            .attr("y2", d => yScale(d[1][1]))
            .attr("stroke", "rgb(214,214,214)")
            .attr("stroke-width", 1.5)

        const pointsData = snapshots.map(snpst => snpst.vector[method])
        const points = snapshotSVG.selectAll("circle").data(pointsData)
        points.exit().remove()
        points
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 5)
            .attr("fill",function(d,i) {
                return "rgb("+rScale(i)+","+gScale(i)+","+bScale(i)+")"
            })
            .attr("stroke", "black")
            .attr("stroke-width", 0.1)
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", 8)
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .delay(200)
                    .attr("r", 5)
            })
            .on("click",function (d,i) {
                self.getGraphNum(i)
                snapshotSVG.append("circle")
                    .attr("class","select")
                    .attr("cx", xScale(d[0]))
                    .attr("cy", yScale(d[1]))
                    .attr("r", 6)
                    .attr("fill","rgb("+rScale(i)+","+gScale(i)+","+bScale(i)+")")
                    .attr("stroke", "blue")
                    .attr("stroke-width", 3)

            })
    }

    render() {
        return <svg id="snapshot" />
    }
}

export default Snapshots
