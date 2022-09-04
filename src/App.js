import "./App.css";
import React, { useRef, useEffect } from "react";
import room from "./room.png";
import link from "./link.png";

let roomImage = new Image();
roomImage.src = room;

let linkImage = new Image();
linkImage.src = link;

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    draw(ctx);
  });

  return canvasRef;
};

const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);
  return <canvas ref={canvasRef} {...rest} />;
};

function App() {
  const draw = (ctx) => {
    ctx.drawImage(roomImage, 0, 0);
    ctx.drawImage(linkImage, 100, 100);
  };

  const handleCanvasClick= e =>{
    const {x, y} = { x: e.clientX, y: e.clientY };
    if (x >= 100 && x < 116 && y >= 100 && y < 116) {
      console.log("Link Click");
    }
  };

  return <Canvas draw={draw} onClick={handleCanvasClick}/>;
}

export default App;
