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

    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(ctx, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);
  return <canvas ref={canvasRef} {...rest} />;
};

function App() {
  const draw = (ctx, frameCount) => {
    ctx.drawImage(roomImage, 0, 0);

    let linkX = 240;
    let linkY = 330 - frameCount;
    if (linkY < 64) {
      linkY = 64;
    }

    ctx.drawImage(linkImage, linkX, linkY);
  };

  const handleCanvasClick = (e) => {
    const { x, y } = { x: e.clientX, y: e.clientY };
    if (x >= 100 && x < 116 && y >= 100 && y < 116) {
      console.log("Link Click");
    }
  };

  return (
    <div className="bg-black">
      <h1 className="text-white font-nintendo-nes">
        IT'S DANGEROUS TO GO ALONE! TAKE THIS.
      </h1>
      <Canvas draw={draw} onClick={handleCanvasClick} />
    </div>
  );
}

export default App;
