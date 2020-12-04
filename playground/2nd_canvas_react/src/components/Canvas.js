import React, { useState, useRef, useEffect, createContext } from "react";

const SharingContext = createContext(null);

function Canvas(props) {
  const canvasRef = useRef();
  const [renderingContext, setRenderingContext] = useState(null);

  useEffect(() => {
    /* init canvas context, screen size */
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");

    setRenderingContext({
      canvas: canvas,
      ctx: ctx,
    });

    // resize canvas
    resize(canvas);
    window.addEventListener("resize", () => resize(canvas), false);
    return () => window.removeEventListener("resize", () => resize(canvas));
  }, []);

  const resize = (canvas) => {
    if (!!canvas) {
      canvas.width = document.body.clientWidth * 2;
      canvas.height = document.body.clientHeight * 2;
      canvas.getContext("2d").scale(2, 2); // 고해상도 대비
    }
  };

  return (
    <SharingContext.Provider value={renderingContext}>
      <canvas ref={canvasRef} />
      {props.children}
    </SharingContext.Provider>
  );
}

export default Canvas;
