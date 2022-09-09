const express = require('express');
const bodyParser = require('body-parser');
// file in root with credentials { username, password, apiKey }
const credentials = require('./credentials.js');

const basicRoutes = require('./routes/basic-routes.js');

// ensures fetch is available as a global
require('cross-fetch/polyfill');
require('isomorphic-form-data');

const { request } = require('@esri/arcgis-rest-request');
const { ApiKeyManager } = require('@esri/arcgis-rest-request');
const { queryFeatures } = require("@esri/arcgis-rest-feature-service");

const authentication = ApiKeyManager.fromKey(credentials.apiKey);


const app = express();

  const queryGeometry = {
    x: -118.807,
    y: 34.002,
    spatialReference: {
      wkid: 4326
    }
  };

  console.log(authentication.key);
  
//template query features
  queryFeatures({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    geometry: queryGeometry,
    geometryType: "esriGeometryPoint",
    spatialRel: "esriSpatialRelIntersects",
    authentication
  }).then((response) => {
    console.log(response);
  });


request("https://www.arcgis.com/sharing/rest/info")
  .then(response => console.log(response));

app.use(basicRoutes);

// console.log(credentials.username);
// console.log(credentials.apiKey);

app.listen(5000);