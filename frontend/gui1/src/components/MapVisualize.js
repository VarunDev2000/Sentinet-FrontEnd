import React, { useContext,Component } from 'react'
import axios from 'axios';
import {Map, TileLayer ,GeoJSON} from 'react-leaflet'
import shapeData from './india-state-shapes.json'


class MapVisualize extends Component {

    state ={
      data : {},
      wait:true,
    }

    mapstyle = {
        height: "100%",
        width: "100%",
      }
    
    getColor = d => {
        return d === "positive" ? '#2BAE66FF' :
               d === "negative" ? '#e40000' :
               d === "sadness" ? 'black' :
               d === "surprise"  ? '#FFFF4D' :
               d === "love"  ? '#AF50BA' :
               d === "happiness"  ? 'green' :
               d === "joy"   ? '#0048BA' :
               d === "anger"   ? 'red' :
                                '#FFEDA0';
    }
    

    styleSentiment = feature => {

      var data = this.state.data;
      var fillColor = "";

      for (var key in data) {
      if (data.hasOwnProperty(key)) {           
            if(feature.properties.stateId == Number(key))
            {
              fillColor = this.getColor(data[key]["sentiment"])
            }
            else if(feature.properties.stateId == 35 || feature.properties.stateId == 36)
            {
              fillColor = "#e40000"
            }
        }
      }
/*
          votesData.forEach(elem=>{
            //console.log(feature.properties.stateId)
            if(feature.properties.stateId == 2)
            {
              fillColor = this.getColor(feature.properties.stateId)
            }
          })
*/
          return {
              fillColor: fillColor,
              opacity: 1,
              color: 'white',
              dashArray: '1',
              fillOpacity: 0.7
         };

    }



    styleEmotion = feature => {

      var data = this.state.data;
      var fillColor = "";

      for (var key in data) {
      if (data.hasOwnProperty(key)) {           
            if(feature.properties.stateId == Number(key))
            {
              fillColor = this.getColor(data[key]["emotion"])
            }

            else if(feature.properties.stateId == 35 || feature.properties.stateId == 36)
            {
              fillColor = "#0048BA"
            }
        }
      }

          return {
              fillColor: fillColor,
              opacity: 1,
              color: 'white',
              dashArray: '1',
              fillOpacity: 0.7
         };

    }

    
    onChange = e => {
      var id = e.target.value;
      this.getJSONData(id);
    }


    getJSONData(id){
      this.setState({
        data : {}
      })
      
      axios.get("/reviews/region-insights/?id="+id)
        .then(res => {
          const data = res.data;
          this.setState({ data });
        })

      setTimeout(()=>{
          this.setState({wait:false})
        },6000)
    }

    componentDidMount()
    {
        document.title = "Sentinet";
        this.getJSONData("1");
    }

/*    
    componentWillUpdate() {
        this.getJSONData();
    }
*/

    render() {
        const position = [21.970217, 78.720704];
        let data = this.state.data;
        var count = 0

        for(var i in data) {
            if(data.hasOwnProperty(i))
                ++count;
        }

        console.log(count)

        return (
      <div>
      <br/><br/>
      <select id="year" onChange = {this.onChange}>
        <option value="1">Amazon customer reviews</option>
        <option value="2">Women's E-commerce website reviews</option>
        <option value="3">Bank Reviews</option>
        <option value="4">Airline customer reviews</option>
      </select>

      { count > 0 ? (

      <div class ="outlay">
      <div class="row justify-content-center h-100" style={{paddingTop:"40px"}}>
      <div class ="col-sm-1" ></div>
      <div class ="col-sm-4">
      <div class ="card">
      <p>Sentiment</p>

        <Map center={position} zoom={4} preferCanvas={true} style={this.mapstyle}>

        <TileLayer
              url=
              // "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />

        <GeoJSON key="whatever" data={shapeData} style={this.styleSentiment} onEachFeature={ (feature, layer) => {
          let toolTiptext;

          toolTiptext = "<strong>State Name : </strong>"+feature.properties.stateName+"<br/>";
          layer.bindTooltip(toolTiptext)

           }}/>

        </Map>
        </div>
        </div>
        <div class ="col-sm-2" ></div>

        <div class ="col-sm-4">
        <div class = "card">
        <p>Emotion</p>
        <Map center={position} zoom={4} preferCanvas={true} style={this.mapstyle}>
        <TileLayer
              url=
              // "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <GeoJSON key="whatever" data={shapeData} style={this.styleEmotion} onEachFeature={ (feature, layer) => {
          let toolTiptext;

          toolTiptext = "<strong>State Name : </strong>"+feature.properties.stateName+"<br/>";
          layer.bindTooltip(toolTiptext)

           }}/>
        </Map>
        </div>
        </div>

        <div class ="col-sm-1" ></div>
        </div>
        

        </div>


        ) : (<div className="loader"></div>)
      }

      </div>
        )
    }
}

export default MapVisualize
