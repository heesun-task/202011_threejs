import { useState, useEffect } from "react";

import styled from "styled-components";
import { withContext } from "context-q/dist/ContextQ";

let Layout = (props) => {
  // 1. update global context - stage size
  useEffect(() => {
    updateContextStage();
    window.addEventListener("resize", updateContextStage, false);
    return () => window.addEventListener("resize", updateContextStage, false);
  }, []);

  const updateContextStage = () => {
    props.context.update({
      stageWidth: getWindowWidth(),
      stageHeight: getWindowHeight(),
    });
  };

  // 2. update global context - frame
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setFrameCount(frameCount + 1);
    });

    props.context.update({
      frame: frameCount,
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [frameCount, setFrameCount]);

  return (
    <Wrapper id={"wrapper"}>
      <p>{props.context.stageWidth}</p>
      <p>{props.context.stageHeight}</p>
      <p>{props.context.frame}</p>
      {props.children}
    </Wrapper>
  );
};

function getWindowWidth() {
  return window.screen.width;
}

function getWindowHeight() {
  return window.screen.height;
}

const Wrapper = styled.div`
  height: 100%;
`;
Layout = withContext(Layout);

export default Layout;
