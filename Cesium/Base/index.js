function initCesium(id) {
  Cesium.Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTZkMDI1ZC04OWM1LTQ4YzItYjM2ZC0yNTI3Yzg0NWE5YTAiLCJpZCI6MjQzMjcsImlhdCI6MTY2OTQyNjg3MX0.wC-B0bh_ROteLtIsSQaePrd1ys9fhWAdu93ileTeNYA";
  new Cesium.Viewer(id, {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    scene3DOnly: true,
    shouldAnimate: true,
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true,
    }),
  });
}
