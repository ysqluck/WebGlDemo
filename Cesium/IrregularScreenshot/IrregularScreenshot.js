// 实现思路
// 在cesium1.9.5之后 可以通过viewer.canvas拿到canvas对象
// 通过操作canvas对象方式截图
let canvasDom = document.createElement("canvas");
canvasDom.width = viewer.canvas.width;
canvasDom.height = viewer.canvas.height;
function canvasDrawLine(arr) {
  let ctx = canvasDom.getContext('2d')
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.moveTo(arr[0][0], arr[0][1]);
  for (let i = 0; i < arr.length; i++) {
    ctx.lineTo(arr[i][0], arr[i][1]);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-out";
  ctx.rect(0, 0, window.innerWidth, window.innerHeight);
  // ctx.fillStyle = "grey";
  // ctx.fill();
  viewer.render();
  ctx.drawImage(viewer.canvas, 0, 0, window.innerWidth, window.innerHeight); //这个时候拿到了当前视口宽度的截图
  ownLoadImgBase64(canvasDom.toDataURL())
}
function ownLoadImgBase64(base64) {
  if (window.navigator.msSaveOrOpenBlob) {
    var bstr = atob(base64.split(",")[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new Blob([u8arr]);
    window.navigator.msSaveOrOpenBlob(blob, "chart-download" + "." + "png");
  } else {
    // 这里就按照chrome等新版浏览器来处理
    const a = document.createElement("a");
    a.href = base64;
    a.setAttribute("download", "chart-download");
    a.click();
  }
}
