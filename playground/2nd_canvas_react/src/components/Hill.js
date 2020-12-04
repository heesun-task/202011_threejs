import React, { useState, useRef, useEffect, useContext } from "react";
import { withContext } from "context-q/dist/ContextQ";

function Hill(props) {
  console.log(props);
  /*let points = [];
  let gap;

  this.init = (stageWidth, stageHeight) => {
    points = [];
    gap = Math.ceil(stageWidth / (total - 2)); //  실제보다 스테이지를 크게 그려서 화면 밖에서 오는 양을 자연스럽도록
    console.log('gap',stageWidth,gap)

    for (let i = 0; i < total; i++) {
      points[i] = {
        x: i * gap,
        y: this.getY(stageHeight),
      };
    }
  };

  this.resize = (stageWidth, stageHeight) => {
    points = [];
    gap = Math.ceil(stageWidth / (total - 2)); //  실제보다 스테이지를 크게 그려서 화면 밖에서 오는 양을 자연스럽도록
    console.log('gap',stageWidth,gap)

    for (let i = 0; i < total; i++) {
      points[i] = {
        x: i * gap,
        y: this.getY(stageHeight),
      };
    }
  };

  this.getY = (stageHeight) => {
    const min = stageHeight / 8;
    const max = stageHeight - min;
    return min + Math.random() * max;
  };

  this.draw = (ctx,stageWidth,stageHeight) => {
    ctx.fillStyle = color;
    ctx.beginPath();

    console.log('points',points)
    let cur = points[0];
    let prev = cur;

    let dots = [];

    // cur.x += speed;
    //
    // if (cur.x > -this.gap) {
    //   points.unshift({
    //     x: -(gap * 2),
    //     y: this.getY()
    //   })
    // } else if (cur.x > stageWidth + gap) {
    //   points.splice(-1)
    // }
    //
    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    for (let i = 1; i < points.length; i++) {
      cur = points[i];
    //   cur.x += speed;
      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      console.log(cx,cy,dots)
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(stageWidth, stageHeight);
    ctx.lineTo(points[0].x, stageHeight);
    ctx.fill();

    return dots;
  };*/
  return null;
}
Hill = withContext(Hill);

export const resize = Hill.resize;
export default Hill;
