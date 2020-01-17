import React, { Component } from 'react';
import Head from 'next/head';
import Inputfield from './Inputfield';




class Map extends Component {
    state = {
        inputs: {
          addresse: {
            value: '',
            type: 'text'
          },
          rejsetid: {
            value: 0,
            type: 'number'
          },
          afgangstid: {
            value: '',
            type: 'datetime-local'
          }
        },
        map: null,
        polygon: null
 
    }

    onChange= e => {
      const { name, type, value } = e.target;
      const val = type === 'number' ? parseFloat(value) : value;
      this.setState({ inputs: {
        ...this.state.inputs,
        [name]: {
          ...this.state.inputs[name],
          value: val
        }
      } });
    };

    async getCords(address) {

        const api = `https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOLOCATION_APIKEY}&q=${address}&viewbox=7.7254,53.6710,15.4383,57.8654&bounded=1&format=json`;
        const response = await fetch(api)
        .then(res => res.json())
        .then(local => {
          return {
            lat : parseFloat(local[0].lat),
            lng : parseFloat(local[0].lon)
          }
            
        }).catch(err => console.log(err));
       
    }

    
    ringCoordsHashToArray(ring) {
        return ring.map(function (latLng) {return [latLng.lat, latLng.lng];});
      };

    drawTimeMap = (map, response) => {
         var ringFunc = this.ringCoordsHashToArray;
        // Reference for the response: http://docs.traveltimeplatform.com/reference/time-map/#response-body-json-attributes
        var shapesCoords = response.results[0].shapes.map(function (polygon) {
          var shell = ringFunc(polygon.shell);
          var holes = polygon.holes.map(ringFunc);
          return [shell].concat(holes);
        });
        if(this.state.polygon) map.removeLayer(this.state.polygon);
        this.state.polygon = L.polygon(shapesCoords, { color: 'red' });
        this.state.polygon.addTo(map);
        map.fitBounds(this.state.polygon.getBounds());
      
    };
    

    sendTimeMapRequest = async () => {
        const cords = await this.getCords(this.state.inputs.addresse.value);

        const departTime = "2020-02-02T09:00:00-0500";
        const travelTime = this.state.inputs.rejsetid.value * 60;
        const map = this.state.map;
        const mapFunc = this.drawTimeMap

        var request = {
          departure_searches: [{
            id: "first_location",
            coords: cords,
            transportation: {
              type: "public_transport" },
      
            departure_time: departTime,
            travel_time: travelTime }],
      
          arrival_searches: [] };
      
          //rewrite this with fetch.
       var xhr = new XMLHttpRequest()
       xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4) {
             console.log(this.response)
           mapFunc(map, this.response);
         }
       });
       xhr.open("POST", "https://api.traveltimeapp.com/v4/time-map")
       xhr.setRequestHeader("X-Application-Id", process.env.TRAVELTIME_APPID);
       xhr.setRequestHeader("X-Api-Key", process.env.TRAVELTIME_APIKEY);
       xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
       xhr.responseType = "json";
       xhr.send(JSON.stringify(request));

    }


    
    componentDidMount() {
        this.state.map = L.map('mapid').setView([this.props.cords.lat, this.props.cords.lon], 13);
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoiaW56b2xpbjIiLCJhIjoiY2szaDM0bHQ4MDYxcjNkcGhpcTNrNnNlMCJ9.y8RASuL3s-eLjX-TybEzzQ'
                }).addTo(this.state.map);


                //put this in serperate function
                var markers = L.markerClusterGroup();

                fetch('http://localhost:4466', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ homes { lat lon title rooms size address price }}'}),
          })
            .then(res => res.json())
            .then(res =>{ 
                res.data.homes.forEach(({lat, lon, title, address, price, size, rooms}) => {
                if(lat != null ) {
                    markers.addLayer(L.marker([lat, lon]).bindPopup(`
                    <p>${title}</p>
                    <p>${address}</p>
                    <p>${size}, ${rooms ? rooms : "0"} rum</p>
                    <p>${price}</p>
                    `));
                }
            });
        }
            );
            this.state.map.addLayer(markers);
    }
    render() {
        return (
          
              <div >

                <Head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
                <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
   <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" integrity="sha384-5kMSQJ6S4Qj5i09mtMNrWpSi8iXw230pKU76xTmrpezGnNJQzj0NzXjQLLg+jE7k" crossorigin="anonymous"></link>
                <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js" integrity="sha384-RLIyj5q1b5XJTn0tqUhucRZe40nFTocRP91R/NkRJHwAe4XxnTV77FXy/vGLiec2" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" integrity="sha384-lPzjPsFQL6te2x+VxmV6q1DpRxpRk0tmnl2cpwAO5y04ESyc752tnEWPKDfl1olr" crossorigin="anonymous"/>
                </Head>
                <div id="mapid" > </div>
            <Inputfield inputs={this.state.inputs} onChange={this.onChange} onClick={this.sendTimeMapRequest}></Inputfield> 
 
            <style jsx>{`
             #mapid { position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              height: 100%;
              width: 100%;
              float: left;
              z-index: 1; }
              
            `}</style>
            </div>
        );
    }
}

export default Map;