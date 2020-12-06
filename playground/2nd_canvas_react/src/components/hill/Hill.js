import React, { useRef,useEffect } from "react";
import { withContext } from "context-q/dist/ContextQ";
import { HillController } from "./controller";

function Hill(props) {
  console.log('Hill',props)
  const controllerRef = useRef();
  const { ctx,canvas, stageWidth, stageHeight,frame } = props.context;

  if(controllerRef.current) {
    const { draw } = controllerRef.current;
    draw.bind(controllerRef.current)(ctx)
  }

  useEffect(() => {
    const { color, speed, total } = props;
    controllerRef.current = new HillController(color, speed, total);
  }, []);

  useEffect(() => {
    const { resize } = controllerRef.current;

    resize.bind(controllerRef.current)(stageWidth, stageHeight);
  }, [stageWidth, stageHeight]);

  return null;
}

Hill = withContext(Hill);

export default Hill;
