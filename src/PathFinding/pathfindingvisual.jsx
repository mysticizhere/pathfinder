import React, { useState, useEffect } from "react";
import Node from "./Nodes/node";
import { dijkstra } from "../algorithms/dijkstra";
import { bfs } from "../algorithms/bfs";
import { getNodesInShortestPathOrder } from "../algorithms/helper";
import { animatePath } from "../animation/algovisualise";
import Navbar from "../navbar/nav";
import "./pathfindingvisual.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisual = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [mainIsPressed, setMainIsPressed] = useState("");
  const [startNodePos, setStartNodePos] = useState([START_NODE_ROW, START_NODE_COL]);
  const [finishNodePos, setFinishNodePos] = useState([FINISH_NODE_ROW, FINISH_NODE_COL]);

  useEffect(() => {
    const grid = getInitialGrid(startNodePos, finishNodePos);
    setGrid(grid);
  }, [startNodePos, finishNodePos]);

  const handleMouseDown = (row, col) => {
    const node = grid[row][col];
    if (node.isStart === true && node.isFinish === false) {
      setMainIsPressed("start");
      node.isStart = false;
    }
    if (node.isFinish === true && node.isStart === false) {
      setMainIsPressed("finish");
      node.isFinish = false;
    }
    if (mainIsPressed === "") {
      const newGrid = gridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (mainIsPressed === "start") {
      const newGrid = gridDynamicNodes(grid, row, col, "start");
      setGrid(newGrid);
    }
    if (mainIsPressed === "finish") {
      const newGrid = gridDynamicNodes(grid, row, col, "finish");
      setGrid(newGrid);
    }
    if (mouseIsPressed && mainIsPressed === "") {
      const newGrid = gridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseUp = (row, col) => {
    if (mainIsPressed === "start") {
      setMainIsPressed("");
      setStartNodePos([row, col]);
      const newGrid = gridDynamicNodes(grid, row, col, "start");
      setGrid(newGrid);
    }
    if (mainIsPressed === "finish") {
      setFinishNodePos([row, col]);
      const newGrid = gridDynamicNodes(grid, row, col, "finish");
      setGrid(newGrid);
      setMainIsPressed("");
    }
    setMouseIsPressed(false);
  };

  const handleMouseLeave = (row, col) => {
    if (mainIsPressed === "") return;
    let newGrid = grid.slice();
    const node = newGrid[row][col];
    if (mainIsPressed === "start") {
      const newNode = {
        ...node,
        isStart: false,
        isWall: false,
      };
      newGrid[row][col] = newNode;
    }
    if (mainIsPressed === "finish") {
      const newNode = {
        ...node,
        isFinish: false,
        isWall: false,
      };
      newGrid[row][col] = newNode;
    }
    setGrid(newGrid);
  };

  const visualizeDijkstra = () => {
    if (isVisualizing) return;
    const start_X = startNodePos[0];
    const start_Y = startNodePos[1];
    const startNode = grid[start_X][start_Y];
    const finish_X = finishNodePos[0];
    const finish_Y = finishNodePos[1];
    const finishNode = grid[finish_X][finish_Y];
    try {
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      if (nodesInShortestPathOrder.length === 1) throw "not possible";
      animatePath(
        setIsVisualizing,
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        startNode,
        finishNode
      );
    } catch (error) {
      setIsVisualizing(true);
      setTimeout(() => {
        setIsVisualizing(false);
      }, 3000);
    }
  };

  const visualizeBFS = () => {
    if (isVisualizing) return;
    const start_X = startNodePos[0];
    const start_Y = startNodePos[1];
    const startNode = grid[start_X][start_Y];
    const finish_X = finishNodePos[0];
    const finish_Y = finishNodePos[1];
    const finishNode = grid[finish_X][finish_Y];
    try {
      const visitedNodesInOrder = bfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animatePath(
        setIsVisualizing,
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        startNode,
        finishNode
      );
    } catch (error) {
      setIsVisualizing(true);
      setTimeout(() => {
        setIsVisualizing(false);
      }, 3000);
    }
  };

  const setVisualization = () => {
    setIsVisualizing((prevState) => !prevState);
  };

  return (
    <>
      <Navbar
        handleDijkstra={visualizeDijkstra}
        handleBFS={visualizeBFS}
        handleVisualization={setVisualization}
      />
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((node, nodeIdx) => {
                const { row, col, isStart, isFinish, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={() => handleMouseDown(row, col)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp(row, col)}
                    onMouseLeave={() => handleMouseLeave(row, col)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

const getInitialGrid = (startNodePos, finishNodePos) => {
  let grid = [];
  for (let row = 0; row < 28; row++) {
    const currRow = [];
    for (let col = 0; col < 40; col++) {
      currRow.push(createNode(row, col, startNodePos, finishNodePos));
    }
    grid.push(currRow);
  }
  return grid;
};

const createNode = (row, col, startNode, finishNode) => {
  let start_x = startNode[0];
  let start_y = startNode[1];
  let finish_x = finishNode[0];
  let finish_y = finishNode[1];

  return {
    row,
    col,
    isStart: row === start_x && col === start_y,
    isFinish: row === finish_x && col === finish_y,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    distanceToFinishNode: Math.abs(finish_x - row) + Math.abs(finish_y - col),
  };
};

const gridWithWallToggled = (grid, row, col) => {
  let newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const gridDynamicNodes = (grid, row, col, pos) => {
  console.log(`start node is currently at: row: ${row} col: ${col}`);
  let newGrid = grid.slice();
  const node = newGrid[row][col];
  if (pos === "start") {
    const newNode = {
      ...node,
      isStart: true,
    };
    newGrid[row][col] = newNode;
  }
  if (pos === "finish") {
    const newNode = {
      ...node,
      isFinish: true,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

export default PathfindingVisual;
