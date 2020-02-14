import React, { useState,Component } from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import '../css/About.css'
import '../css/Glitch.css'

import BarChart from './BarChart'
import BarChart2 from './BarChart2'
import PieChart from './PieChart'

class ChartVisualize extends Component {
    state = {
        id:"1",
        barchartData:[],
        piechartData:[],
        wordtypedata:[],

        barchartcatData:[],
        piechartcatData:[],
        wordtypecatdata:[],

        totalcatData:[],
        categorydropdown:[],

        categoryenabled:false,
        wait:true,
    }

    getCategoryName(id)
    {
            axios.get("/reviews/insights/?id="+id).then(res =>{
                let data = res.data
                let final = []
                let final_data = []
                let in_data = {}

                for (var key in data) {
                  if (data.hasOwnProperty(key)) {           
                        if(key === "categories")
                        {
                            in_data ={}
                            in_data = data[key]

                            for (var in_key in in_data) {
                              if (in_data.hasOwnProperty(in_key)) {           
                                    final.push(in_key)
                                    final_data.push(in_data[in_key])
                                }
                              }
                        }
                    }
                  }
                this.setState({totalcatData:in_data})
              this.setState({categorydropdown:final})
            }); 
    }

    changeID = e => {

        this.getCategoryName(e.target.value);
        this.getJSONBarData(e.target.value);
        this.getJSONPieData(e.target.value);
        this.getJSONWordTypeData(e.target.value);

 
        setTimeout(()=>{
          this.setState({wait:false})
        },6000)

    }


    getJSONBarData(id){
        this.setState({
            barchartData : []
        })
             axios.get("/reviews/insights/?id="+id).then(res =>{
                let data = res.data
                let final = []

                for (var key in data) {
                  if (data.hasOwnProperty(key)) {           
                        if(key === "happy" || key === "angry" || key === "sad" || key === "joy" || key === "surprise" || key === "love")
                        {
                            let dict = {}
                            dict["sentiment"] = key
                            dict["percent"] = data[key]
                            final.push(dict)
                        }
                    }
                  }


              var avgData = d3.nest()
                            .key(function(d) { return d.sentiment; })
                            .rollup(function(v) { return d3.mean(v, function(d) { return d.percent; }); })
                            .entries(final);
              const newAvg = []
              avgData.forEach(element => {
                  let dict = {}
                  dict["sentiment"] = element.key
                  dict["percent"] = element.value*100
                  newAvg.push(dict)
              });
              let percent = 0
              newAvg.forEach(element=>{
                percent += element["percent"]
              })

              newAvg.forEach(element=>{
                element["percent"] = (element["percent"]/percent)*100
              })
              this.setState({barchartData:newAvg})
            }); 
    }


        getJSONPieData(id){
        this.setState({
            piechartData : []
        })
             axios.get("/reviews/insights/?id="+id).then(res =>{
                let data = res.data
                let final = []

                for (var key in data) {
                  if (data.hasOwnProperty(key)) {           
                        if(key === "positive" || key === "negative")
                        {
                            let dict = {}
                            dict["type"] = key
                            dict["percent"] = data[key]
                            final.push(dict)
                        }
                    }
                  }


              var avgData = d3.nest()
                            .key(function(d) { return d.type; })
                            .rollup(function(v) { return d3.mean(v, function(d) { return d.percent; }); })
                            .entries(final);
              const newAvg = []
              avgData.forEach(element => {
                  let dict = {}
                  dict["type"] = element.key
                  dict["percent"] = element.value*100
                  newAvg.push(dict)
              });
              let percent = 0
              newAvg.forEach(element=>{
                percent += element["percent"]
              })

              newAvg.forEach(element=>{
                element["percent"] = (element["percent"]/percent)*100
              })
              this.setState({piechartData:newAvg})
            }); 
    }

    getJSONWordTypeData(id){
        this.setState({
            wordtypedata : []
        })
             axios.get("/reviews/insights/?id="+id).then(res =>{
                let data = res.data
                let final = []

                for (var key in data) {
                  if (data.hasOwnProperty(key)) {           
                        if(key === "offensive" || key === "non_offensive")
                        {
                            let dict = {}
                            dict["type"] = key
                            dict["percent"] = data[key]
                            final.push(dict)
                        }
                    }
                  }


              var avgData = d3.nest()
                            .key(function(d) { return d.type; })
                            .rollup(function(v) { return d3.mean(v, function(d) { return d.percent; }); })
                            .entries(final);
              const newAvg = []
              avgData.forEach(element => {
                  let dict = {}
                  dict["type"] = element.key
                  dict["percent"] = element.value*100
                  newAvg.push(dict)
              });
              let percent = 0
              newAvg.forEach(element=>{
                percent += element["percent"]
              })

              newAvg.forEach(element=>{
                element["percent"] = (element["percent"]/percent)*100
              })

              console.log(newAvg)
              this.setState({wordtypedata:newAvg})
            }); 
    }

    getJSONBarCatData(cat_name){
        this.setState({
            barchartcatData : []
        })

                let data = this.state.totalcatData
                let final = []

                for (var key in data[cat_name]) {
      
                        if(key === "happy" || key === "angry" || key === "sad" || key === "joy" || key === "surprise" || key === "love")
                        {
                            let dict = {}
                            dict["sentiment"] = key
                            dict["percent"] = data[cat_name][key]
                            final.push(dict)
                        }
                  }


              var avgData = d3.nest()
                            .key(function(d) { return d.sentiment; })
                            .rollup(function(v) { return d3.mean(v, function(d) { return d.percent; }); })
                            .entries(final);
              const newAvg = []
              avgData.forEach(element => {
                  let dict = {}
                  dict["sentiment"] = element.key
                  dict["percent"] = element.value*100
                  newAvg.push(dict)
              });
              let percent = 0
              newAvg.forEach(element=>{
                percent += element["percent"]
              })

              newAvg.forEach(element=>{
                element["percent"] = (element["percent"]/percent)*100
              })

        setTimeout(()=>{
            this.setState({
                barchartcatData:newAvg
            }); 
        },2000)

    }


    getJSONPieCatData(cat_name){

        this.setState({
            piechartcatData : []
        })
             
                let data = this.state.totalcatData
                let final = []

                for (var key in data[cat_name]) {         
                        if(key === "positive" || key === "negative")
                        {
                            let dict = {}
                            dict["type"] = key
                            dict["percent"] = data[cat_name][key]
                            final.push(dict)
                        }
                  }


              var avgData = d3.nest()
                            .key(function(d) { return d.type; })
                            .rollup(function(v) { return d3.mean(v, function(d) { return d.percent; }); })
                            .entries(final);
              const newAvg = []
              avgData.forEach(element => {
                  let dict = {}
                  dict["type"] = element.key
                  dict["percent"] = element.value*100
                  newAvg.push(dict)
              });
              let percent = 0
              newAvg.forEach(element=>{
                percent += element["percent"]
              })

              newAvg.forEach(element=>{
                element["percent"] = (element["percent"]/percent)*100
              })

              this.setState({piechartcatData:newAvg})
    }


    getJSONWordTypeCatData(cat_name){

        this.setState({
            wordtypecatdata : []
        })
             
                let data = this.state.totalcatData
                let final = []

                for (var key in data[cat_name]) {         
                        if(key === "offensive" || key === "non_offensive")
                        {
                            let dict = {}
                            dict["type"] = key
                            dict["percent"] = data[cat_name][key]
                            final.push(dict)
                        }
                  }


              var avgData = d3.nest()
                            .key(function(d) { return d.type; })
                            .rollup(function(v) { return d3.mean(v, function(d) { return d.percent; }); })
                            .entries(final);
              const newAvg = []
              avgData.forEach(element => {
                  let dict = {}
                  dict["type"] = element.key
                  dict["percent"] = element.value*100
                  newAvg.push(dict)
              });
              let percent = 0
              newAvg.forEach(element=>{
                percent += element["percent"]
              })

              newAvg.forEach(element=>{
                element["percent"] = (element["percent"]/percent)*100
              })

              console.log(newAvg)

              this.setState({wordtypecatdata:newAvg})
    }


    oncatChange = e =>{

        localStorage.setItem('changed',"yes");

        this.getJSONBarCatData(e.target.value)
        this.getJSONPieCatData(e.target.value)
        this.getJSONWordTypeCatData(e.target.value)
        this.setState({
            categoryenabled : true
        })
    }

    componentDidMount(){
        document.title = "Sentinet";
        localStorage.setItem('changed',"no");
        this.getCategoryName("1");
        this.getJSONBarData("1");
        this.getJSONPieData("1");
        this.getJSONWordTypeData("1");
    }

    render() {
        var changed = localStorage.getItem('changed');
        const dropdown = [];
        
        this.state.categorydropdown.map((item, key) =>
            dropdown.push(<option key = {item} value = {item}>{item}</option>)
        );

        let data1 = this.state.barchartData;
        let data2 = this.state.piechartData;
        let data3 = this.state.wordtypedata;

    return (
    <div className="container">
            <select id="type" onChange = {this.changeID}>
                <option value="1">Amazon customer reviews</option>
                <option value="2">Women's E-commerce website reviews</option>
                <option value="3">Bank Reviews</option>
                <option value="4">Airline customer reviews</option>
            </select><br/><br/><br/>
    {
        data1.length > 0 && data2.length > 0 && data3.length > 0 ? (

        <div className="et-slide" style={{marginTop:"10px"}}>

            <div className="charts">
            <div className="piechart-class">
                <p className="p-chart-class">Sentiment</p>
                <PieChart
                  data= {this.state.piechartData}
                  width={300}
                  height={300}
                  innerRadius={70}
                  outerRadius={120}
                />
            </div>
            <div className="barchart-class">
                <p className="p-chart-class">Emotion</p>
                <BarChart chartData = {this.state.barchartData}/>
            </div>
            <div className="piechart-class">
                <p className="p-chart-class">Offensive Words</p>
                <PieChart
                  data= {this.state.wordtypedata}
                  width={300}
                  height={300}
                  innerRadius={70}
                  outerRadius={120}
                />
            </div>
            </div><br/><br/><br/>
            <hr/><br/>
    <b>CATEGORIES :</b>{'\u00A0'}{'\u00A0'} 
      <select id="category" defaultValue={'default'} onChange = {this.oncatChange}>
        <option key = "default" disabled value = "default">Select</option>
        {dropdown}
      </select><br/><br/><br/>
      <div className="charts" id="2nd">
      {
        this.state.categoryenabled == true && this.state.barchartcatData.length > 0 &&
           this.state.piechartcatData.length > 0 && this.state.wordtypecatdata.length > 0 ? 
        (
            
            <div className="charts" style={{paddingBottom:"50px"}}>
            <div className="piechart-class">
                <p className="p-chart-class">Sentiment</p>
                <PieChart
                  data= {this.state.piechartcatData}
                  width={300}
                  height={300}
                  innerRadius={70}
                  outerRadius={120}
                />
            </div>
            <div className="barchart-class">
                <p className="p-chart-class">Emotion</p>
                <BarChart2 chartData = {this.state.barchartcatData}/>
            </div>
            <div className="piechart-class">
                <p className="p-chart-class">Offensive Words</p>
                <PieChart
                  data= {this.state.wordtypecatdata}
                  width={300}
                  height={300}
                  innerRadius={70}
                  outerRadius={120}
                />
            </div>
            <br/><br/>
            </div>

        ) : (changed === "yes" ? (<div className="loader"></div>):(null))
      }
      </div>
      </div>
        ) : (<div className="loader"></div>)
    }
    </div>
        )
    }
}

export default ChartVisualize
