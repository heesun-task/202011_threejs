import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { withContext } from "context-q/dist/ContextQ";
import CanvasController from "./controller";

function Canvas(props) {
  const canvasRef = useRef();
  const controllerRef = useRef();

  if (controllerRef.current) {
    const { stageWidth, stageHeight } = props.context;
    const { clear } = controllerRef.current;
    console.log("dd");
    clear.bind(controllerRef.current)(stageWidth, stageHeight);
  }

  // resize global context : canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");

    updateContextCanvas(canvas, ctx);
    controllerRef.current = new CanvasController(canvas, ctx);
  }, []);

  const updateContextCanvas = (canvas, ctx) => {
    props.context.update({
      canvas: canvas,
      ctx: ctx,
    });
  };

  // resize canvas when global context changes
  useEffect(() => {
    const { resize } = controllerRef.current;
    const { stageWidth, stageHeight } = props.context;

    resize.bind(controllerRef.current)(stageWidth, stageHeight);
  }, [props.context.stageWidth, props.context.stageHeight]);

  return (
    <>
      <CanvasBase ref={canvasRef} />
      {props.context.canvas && props.children}
    </>
  );
}
const CanvasBase = styled.canvas`
  position:fixed;
  z-index: -1;
  left: 0;right: 0;top: 0;bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
`;

Canvas = withContext(Canvas);

export default Canvas;
