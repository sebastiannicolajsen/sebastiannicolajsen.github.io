import logo from "./logo.svg";
import "./App.css";
import Sketch from "react-p5";

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(window.innerWidth, window.innerHeight).parent(
    canvasParentRef
  );
  p5.frameRate(30);
};

const mapSize = 100;
const zoomFactor = -1;
const area = 50;


const draw = (p5) => {
  const from = p5.color(180, 180, 180);
  const to = p5.color(255, 255, 255);

  const size = window.innerWidth / mapSize;
  p5.background(255);

  p5.noStroke();

  for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
      const close =
        i * size > p5.mouseX - area &&
        i * size < p5.mouseX + area &&
        j * size > p5.mouseY - area &&
        j * size < p5.mouseY + area;
      const distx = (i * size) / p5.mouseX;
      const disty = (j * size) / p5.mouseY;
      let color = p5.lerpColor(from, to, p5.noise(i * 0.1, j * 0.1));
      if (close ) {

        // const r = Math.random();
        color = p5.lerpColor(
          from,
          to,
          p5.noise(i * 0.1 * zoomFactor * distx, j * 0.1 * zoomFactor * disty)
        );
      }
      p5.fill(color);

      p5.square(size * i - 1, size * j - 1, size + 1);
    }
  }
};

const windowResized = (p5) => {
  p5.resizeCanvas(window.innerWidth, window.innerHeight);
};

function App() {
  return (
    <>
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      <div className="App"></div>
    </>
  );
}

export default App;
