import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  token = 'pk.eyJ1IjoibG9yZW56b3BhY2hpb2xpIiwiYSI6ImNsMmV2cjZjbjAwMHMzY28zenZucGpsenIifQ.82GjVOTfUBEcg3LJ42gvlw';
  url = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=${this.token}`;
  screenW = window.innerWidth;
  options = {
    layers: [
      leaflet.tileLayer(this.url, { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    zoomControl: false,
    center: leaflet.latLng(this.screenW > 900 ? ([-37.9945824, -57.5969219]) : ([-38.0068100, -57.5656882]))
  };

  constructor() { }

  ngOnInit(): void {
  }

}
