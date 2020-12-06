class CanvasController {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  resize(stageWidth, stageHeight) {
    if (!!this.canvas) {
      this.canvas.width = stageWidth * 2;
      this.canvas.height = stageHeight * 2;
      this.canvas.getContext("2d").scale(2, 2); // 고해상도 대비
    }
  }

  clear(stageWidth, stageHeight) {
    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
  }
}

export default CanvasController;
