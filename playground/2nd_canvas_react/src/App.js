import React, { useState,useEffect } from "react";
import { Provider } from "context-q";

import Canvas from "./layout/canvas/Canvas";
import Hill from "./components/hill/Hill";
import Layout from "./layout/Layout";

function App(props) {
  return (
    <Provider
      defaultState={{
        stageWidth: document.body.clientWidth,
        stageHeight: document.body.clientHeight,
      }}
    >
      <Layout>
        <Canvas>
          <Hill color={"#F25CA2"} speed={0.2} total={5} />
          <Hill color={"#021859"} speed={0.5} total={8} />
          <Hill color={"#0433BF"} speed={1.4} total={6} />
        </Canvas>
      </Layout>
    </Provider>
  );
}

export default App;
