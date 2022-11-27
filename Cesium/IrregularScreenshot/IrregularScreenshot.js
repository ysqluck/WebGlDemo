// 实现思路
// 在cesium1.9.5之后 可以通过viewer.canvas拿到canvas对象
// 通过操作canvas对象方式截图
function getCanvas(viewer) {
  viewer.render();
  // 重新生成一个canvas的节点，用来复制cesium的canvas
  let canvasDom = document.createElement("canvas");
  canvasDom.width = viewer.canvas.width;
  canvasDom.height = viewer.canvas.height;
  return canvasDom.getContext("2d");
}
function canvasDrawLine(ctx, arr) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.moveTo(arr[0][0], arr[0][1]);
  for (let i = 0; i < arr.length; i++) {
    ctx.lineTo(arr[i][0], arr[i][1]);
  }
  ctx.closePath();
}
