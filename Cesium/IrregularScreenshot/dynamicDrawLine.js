let activeShapePoints = [];
let activeShape, floatingPoint;
//绘制点
function createPoint(position, viewer) {
  return viewer.entities.add({
    position: position,
    name: "point",
    point: {
      color: Cesium.Color.GREEN,
      pixelSize: 15,
      // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    },
  });
}
//绘制线
function drawShape(positionData, viewer, type) {
  let shape;
  if (type === "line") {
    shape = viewer.entities.add({
      name: "polyline",
      clampToGround: true,
      polyline: {
        positions: positionData,
        width: 7,
        clampToGround: true,
      },
    });
  }
  return shape;
}
// Redraw the shape so it's not dynamic and remove the dynamic shape.
function terminateShape(viewer, type) {
  activeShapePoints.pop(); //去除最后一个动态点
  if (activeShapePoints.length) {
    let entity = drawShape(activeShapePoints, viewer, type); //绘制最终图
    viewer.entities.remove(floatingPoint); //去除动态点图形（当前鼠标点）
    viewer.entities.remove(activeShape); //去除动态图形
    floatingPoint = undefined;
    activeShape = undefined;
    activeShapePoints = [];
    return entity;
  }
}

function mouseDown(e, viewer, type) {
  var pick = viewer.camera.getPickRay(e.position);
  var position = viewer.scene.globe.pick(pick, viewer.scene);
  if (!position) {
    const ellipsoid = viewer.scene.globe.ellipsoid;
    position = viewer.scene.camera.pickEllipsoid(e.position, ellipsoid);
  }
  if (Cesium.defined(position)) {
    if (activeShapePoints.length === 0) {
      floatingPoint = createPoint(position, viewer);
      activeShapePoints.push(position);
      let dynamicPositions = new Cesium.CallbackProperty(() => {
        return activeShapePoints;
      }, false);
      activeShape = drawShape(dynamicPositions, viewer, type); //绘制动态图
    }
    activeShapePoints.push(position);
  }
}
function mouseMove(e, viewer) {
  if (Cesium.defined(floatingPoint)) {
    let position = viewer.scene.pick(e.endPosition);
    if (!position) {
      position = viewer.scene.camera.pickEllipsoid(
        e.startPosition,
        viewer.scene.globe.ellipsoid
      );
    }
    if (!position) return;
    if (Cesium.defined(position)) {
      floatingPoint.position.setValue(position);
      activeShapePoints.pop();
      activeShapePoints.push(position);
    }
  }
}
