import "./App.css";
import React, { useRef, useEffect } from "react";
import room from "./images/room.png";
import link from "./images/link.png";
import oldman from "./images/oldman.png";
import fire1 from "./images/fire1.png";
import fire2 from "./images/fire2.png";

let roomImage = new Image();
roomImage.src = room;

let linkImage = new Image();
linkImage.src = link;

let oldmanImage = new Image();
oldmanImage.src = oldman;

let fire1Image = new Image();
fire1Image.src = fire1;

let fire2Image = new Image();
fire2Image.src = fire2;

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
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(roomImage, 0, 0);

    let linkX = 250;
    let linkY = 330 - frameCount;
    if (linkY < 160) {
      linkY = 160;
    }

    let lineOneText = "IT'S DANGEROUS TO GO".split("");
    let lineTwoText = "ALONE! TAKE THIS.".split("");

    ctx.font = "16px NintendoNes";
    ctx.fillStyle = "#FFFFFF";
    
    let textFillRate = frameCount / 8;

    ctx.fillText(lineOneText.slice(0, textFillRate).join(""), 90, 90);
    ctx.fillText(lineTwoText.slice(0, Math.max(textFillRate - lineOneText.length, 0)).join(""), 120, 110);

    ctx.drawImage(oldmanImage, 250, 140);

    let fireToDraw = Math.floor(frameCount / 30) % 2 === 0 ? fire1Image : fire2Image;
    ctx.drawImage(fireToDraw, 200, 140);
    ctx.drawImage(fireToDraw, 300, 140);

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
