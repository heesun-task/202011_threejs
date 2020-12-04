import React, { useEffect } from "react";
import styled from "styled-components";
import { Provider } from "context-q";

import Canvas from "./components/Canvas";
import Hill from "./components/Hill";

//components

function App(props) {
  //
  // const init = () => {
  //   resizeCanvas();
  //
  //   hills = [
  //     new Hill({
  //       ...canvasSet.current,
  //       color: "#fd6bea",
  //       speed: 0.2,
  //       total: 6,
  //     }),
  //     new Hill({ ...canvasSet.current, color: "#ff59c2", speed: 1, total: 8 }),
  //     new Hill({
  //       ...canvasSet.current,
  //       color: "#ff4674",
  //       speed: 0.4,
  //       total: 6,
  //     }),
  //   ];
  //
  //   //bind animate event
  //   requestAnimationFrame(animate.bind(this));
  // };

  useEffect(() => {
    // init();
    //
    // window.addEventListener("resize", () => resizeCanvas(canvasSet), false);
    // return () =>
    //   window.removeEventListener("resize", () => resizeCanvas(canvasSet));
  }, []);

  return (
    <Provider
      defaultState={{
        stageWidth: document.body.clientWidth,
        stageHeight: document.body.clientHeight,
      }}
    >
      <Wrapper id={"wrapper"}>
        <Canvas>
          <Hill color={'pink'} speed={0.2} total={5}/>
          <Hill color={'skyblue'} speed={1} total={4}/>
        </Canvas>
      </Wrapper>
    </Provider>
  );
}
//
// const resizeCanvas = (canvasSet) => {
//   canvasSet.current.stageWidth = document.body.clientWidth;
//   canvasSet.current.stageHeight = document.body.clientHeight;
//   const { canvas, stageWidth, stageHeight, ctx } = canvasSet.current;
//
//   canvas.width = stageWidth * 2;
//   canvas.height = stageHeight * 2;
//   ctx.scale(2, 2); // 고해상도 대비
// };
//
// const resizeHills = () => {
//   for (let i = 0; i < hills.length; i++) {
//     hills[i].resize();
//   }
// };

// const animate = (canvasSet) => {
//   console.log(canvasSet, this);
//   const { ctx, stageWidth, stageHeight } = canvasSet.current;
//   requestAnimationFrame(animate.bind(canvasSet));
//
//   const clearCanvas = () => ctx.clearRect(0, 0, stageWidth, stageHeight);
//   clearCanvas();
//
//   let dots;
//   for (let i = 0; i < hills.length; i++) {
//     dots = hills[i].draw();
//   }
// };

const Wrapper = styled.div`
`;

export default App;
