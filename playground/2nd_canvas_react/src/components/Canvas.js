import React, { useState, useRef, useEffect, createContext } from "react";
import { withContext } from "context-q/dist/ContextQ";

function Canvas(props) {
  const canvasRef = useRef();

  useEffect(() => {
    /* init canvas context, screen size */
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");

    props.context.update({
      canvas: canvas,
      ctx: ctx,
    });

    // resize canvas
    resize(canvas);
    window.addEventListener("resize", () => resize(canvas), false);
    return () => window.removeEventListener("resize", () => resize(canvas));
  }, []);

  const resize = (canvas) => {
    console.info("i. resizing Canvas");
    props.context.update({
      stageWidth: document.body.clientWidth,
      stageHeight: document.body.clientHeight,
    });
    if (!!canvas) {
      canvas.width = document.body.clientWidth * 2;
      canvas.height = document.body.clientHeight * 2;
      canvas.getContext("2d").scale(2, 2); // 고해상도 대비
    }
  };

  return (
    <>
      <canvas ref={canvasRef} />
      {canvasRef.current && props.children}
    </>
  );
}

Canvas = withContext(Canvas);

export default Canvas;
