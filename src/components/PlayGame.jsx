import { Slider, Switch } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useInterval from "../utils/util";

function PlayGame() {
  // setting constants
  const [speedx, setSpeedx] = useState(50);
  const [speed, setSpeed] = useState();
  const [score, setScore] = useState(0);
  const [autoSize, setAutoSize] = useState(false);
  const [easy, setEasy] = useState(true);
  const canvas = useRef(null);
  const [scale, setScale] = useState(20);
  const [size, setSize] = useState({
    x: scale * scale,
    y: scale * scale,
  });
  const [snake, setSnake] = useState([
    { x: 0, y: 1 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState({
    x: Math.round((size.x / scale - 1) * Math.random()),
    y: Math.round((size.y / scale - 1) * Math.random()),
  });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [gameOver, setGameOver] = useState(false);

  // a function which resets everything
  const start = () => {
    console.log("starting");
    setScore(0);
    setSnake([
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ]);
    setFood({
      x: Math.round((size.x / scale - 1) * Math.random()),
      y: Math.round((size.y / scale - 1) * Math.random()),
    });
    setDirection({ x: 0, y: 1 });
    setSpeed();
    setGameOver(false);
  };

  // a function which ends everyhting
  const end = () => {
    setSpeed(null);
    setGameOver(true);
  };

  // a function which generates random foods
  const getFood = () => {
    return {
      x: Math.round((size.x / scale - 1) * Math.random()),
      y: Math.round((size.y / scale - 1) * Math.random()),
    };
  };

  // a function which detects the direction
  const move = (key) => {
    switch (key) {
      case "w":
        setDirection({ x: 0, y: -1 });
        break;
      case "d":
        setDirection({ x: 1, y: 0 });
        break;
      case "a":
        setDirection({ x: -1, y: 0 });
        break;
      case "s":
        setDirection({ x: 0, y: 1 });
        break;
    }
  };

  // a function which detects collison
  const collison = (head, snk = snake) => {
    if (
      head.x * scale >= size.x ||
      head.x < 0 ||
      head.y * scale >= size.y ||
      head.y < 0
    ) {
      console.log("collison");
      return true;
    }

    if (!easy) {
      for (const body of snk) {
        if (head.x === body.x && head.y === body.y) {
          console.log("body collison");
          return true;
        }
      }
    }
    return false;
  };

  // a function which detects eating
  const eatFood = (snake) => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      let newFood = getFood();
      setScore(score + 1);
      while (collison(newFood, snake)) {
        newFood = getFood();
      }
      setFood(newFood);
      return true;
    }
    return false;
  };

  // a function which makes the snake move
  const loop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const head = {
      x: snakeCopy[0].x + direction.x,
      y: snakeCopy[0].y + direction.y,
    };
    snakeCopy.unshift(head);
    if (collison(head)) {
      end();
    }
    if (eatFood(snakeCopy)) {
      snakeCopy.unshift(head);
    }
    snakeCopy.pop();
    setSnake(snakeCopy);
  };

  // a function which generate the snake
  useEffect(() => {
    const cancon = canvas.current.getContext("2d");
    cancon.setTransform(scale, 0, 0, scale, 0, 0);
    cancon.clearRect(0, 0, size.x, size.y);
    snake.forEach((element, index) => {
      if (index === 0) {
        cancon.fillStyle = "yellow";
        cancon.strokeStyle = "pink";
        cancon.fillRect(element.x, element.y, 1, 1);
      } else {
        cancon.fillStyle = "green";
        cancon.fillRect(element.x, element.y, 1, 1);
      }
    });
    cancon.fillStyle = "red";
    cancon.fillRect(food.x, food.y, 1, 1);
  }, [snake, food, gameOver, scale, size]);

  // a function which loops everything
  useInterval(() => loop(), speed);

  return (
    // main div
    <div
      className="outline-none bg-slate-900"
      onKeyDown={(e) => {
        console.log(e.key);
        move(e.key);
      }}
      tabIndex="0"
    >
      <div className="mx-4 text-white">
        {/* canvas div */}
        <div className="flex justify-center">
          <canvas
            className="bg-pink border-zinc-400 border-8 border-double m-8 p-1"
            id="canvas"
            ref={canvas}
            width={size.x}
            height={size.y}
          ></canvas>
        </div>
        {/* start - status - reset */}
        <div className="flex justify-around items-center">
          <button
            className="uppercase font-mono rounded px-4 py-1 outline-none hover:bg-green-800 hover:text-black"
            onClick={() => {
              setSpeed(speedx * 10);
            }}
          >
            start
          </button>
          {gameOver ? (
            <h1 className="font-mono uppercase">{`${score} [busted]`}</h1>
          ) : (
            <h1 className="font-mono text-xl">{score}</h1>
          )}

          <button
            className="uppercase font-mono rounded px-4 py-1 outline-none hover:bg-green-800 hover:text-black"
            onClick={() => {
              start();
            }}
          >
            reset
          </button>
        </div>
        {/* speed slider div with label */}
        <div className="flex flex-col justify-center">
          {/* speed slider div */}
          <div className=" bg-whit px-4 flex flex-col">
            <Slider
              aria-label="Temperature"
              defaultValue={speedx}
              onChangeCommitted={(e, v) => {
                console.log(speedx);
                setSpeedx(v);
              }}
              min={1}
              max={100}
              key={Math.random()}
              sx={{
                color: "green",
              }}
            />
          </div>
          <div className="uppercase font-mono">{`speed - ${speedx} (higher is slower!)`}</div>
        </div>
        {/* scale slider div with label */}
        <div className="flex flex-col justify-center">
          {/* scale slider div */}
          <div className=" bg-whit px-4 flex flex-col">
            <Slider
              aria-label="Temperature"
              defaultValue={scale}
              onChangeCommitted={(e, v) => {
                console.log(scale);
                setScale(v);
                if (autoSize) {
                  setSize({ x: v * v, y: v * v });
                }
              }}
              min={1}
              max={50}
              key={Math.random()}
              sx={{
                color: "green",
              }}
            />
          </div>
          <div className="uppercase font-mono">{`scale - ${scale} (higher is bigger!)`}</div>
        </div>
        {/* switches */}
        <div className="flex justify-around py-1">
          {/* auto size switch */}
          <div className="flex items-center">
            <h1 className="font-mono uppercase">auto size</h1>
            <Switch
              checked={autoSize}
              onChange={() => {
                setAutoSize(!autoSize);
                setSize({ x: scale * scale, y: scale * scale });
                setFood(getFood());
              }}
              color="success"
            />
          </div>
          <div className="flex items-center">
            <h1 className="font-mono uppercase">easy mode</h1>
            <Switch
              
              checked={easy}
              onChange={() => {
                setEasy(!easy);
              }}
              color="success"
            />
          </div>
        </div>
        {/* checking auto size status for size - x */}
        {autoSize ? (
          //  [DISABLED] size - x - slider div with label
          <div className="flex flex-col justify-center">
            {/* [DISABLED] size - x - slider div */}
            <div className=" bg-whit px-4 flex flex-col">
              <Slider
                disabled
                aria-label="Temperature"
                defaultValue={size.x}
                onChangeCommitted={(e, v) => {
                  console.log(size);
                  setSize({ x: v, y: size.y });
                }}
                min={1}
                max={2000}
                key={Math.random()}
                sx={{
                  color: "green",
                }}
              />
            </div>
            <div className="uppercase font-mono">{`size - x - ${size.x} (higher is thicker!)`}</div>
          </div>
        ) : (
          // size - x - slider div with label
          <div className="flex flex-col justify-center">
            {/* size - x - slider div */}
            <div className=" bg-whit px-4 flex flex-col">
              <Slider
                aria-label="Temperature"
                defaultValue={size.x}
                onChangeCommitted={(e, v) => {
                  console.log(size);
                  setSize({ x: v, y: size.y });
                }}
                min={1}
                max={2000}
                key={Math.random()}
                sx={{
                  color: "green",
                }}
              />
            </div>
            <div className="uppercase font-mono">{`size - x - ${size.x} (higher is thicker!)`}</div>
          </div>
        )}
        {/* checking auto size staus for size - y */}
        {autoSize ? (
          //   [DISABLED] size - x - slider div with label
          <div className="flex flex-col justify-center">
            {/* [DISABLED] size - x - slider div */}
            <div className=" bg-whit px-4 flex flex-col">
              <Slider
                disabled
                aria-label="Temperature"
                defaultValue={size.y}
                onChangeCommitted={(e, v) => {
                  console.log(size);
                  setSize({ x: size.x, y: v });
                }}
                min={1}
                max={2000}
                key={Math.random()}
                sx={{
                  color: "green",
                }}
              />
            </div>
            <div className="uppercase font-mono">{`size - y - ${size.y} (higher is longer!)`}</div>
          </div>
        ) : (
          //  size - y - slider div with label
          <div className="flex flex-col justify-center">
            {/* size - y - slider div */}
            <div className=" bg-whit px-4 flex flex-col">
              <Slider
                aria-label="Temperature"
                defaultValue={size.y}
                onChangeCommitted={(e, v) => {
                  console.log(size);
                  setSize({ x: size.x, y: v });
                }}
                min={1}
                max={2000}
                key={Math.random()}
                sx={{
                  color: "green",
                }}
              />
            </div>
            <div className="uppercase font-mono">{`size - y - ${size.y} (higher is longer!)`}</div>
          </div>
        )}
        {size.x < scale * scale || size.y < scale * scale ? (
          <div className="flex justify-center m-2">
            <h1 className="font-mono text-red-500 uppercase">
              [warning] - boundary limit reached
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default PlayGame;
