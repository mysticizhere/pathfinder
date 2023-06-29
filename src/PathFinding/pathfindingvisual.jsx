import React, { Component } from "react";
import Node from "./Nodes/node";
import dijkstraAlgo from "../algorithms/dijkstra.js";

import "./pathfindingvisual.css";

const startNodeCol = 5;
const startNodeRow = 12;
const endNodeCol = 45;
const endNodeRow = 12;

export default class Pathfindingvisual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            animationSpeed: 50,
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWalls(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWalls(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    handleSpeedChange = (e) => {
        const speedValue = parseInt(e.target.value);
        this.setState({ animationSpeed: speedValue });
    };

    animateDijkstra(visitedNodesInOrder) {
        const { reset, animationSpeed } = this.state;
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                if (i < visitedNodesInOrder.length && !reset) {
                    const node = visitedNodesInOrder[i];
                    const newGrid = this.state.grid.slice();
                    const newNode = {
                        ...node,
                        isVisited: true,
                    };
                    newGrid[newNode.row][newNode.col] = newNode;
                    this.setState({ grid: newGrid });
                }
            }, (115 - animationSpeed) * i);
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[startNodeRow][startNodeCol];
        const endNode = grid[endNodeRow][endNodeCol];
        const visitedNodesInOrder = dijkstraAlgo(grid, startNode, endNode);
        this.animateDijkstra(visitedNodesInOrder);
    }

    render() {
        const { grid, animationSpeed, mouseIsPressed } = this.state;
        return (
            <>
                <div>
                    <label htmlFor="speed-slider">Animation Speed:</label>
                    <input
                        type="range"
                        id="speed-slider"
                        min="15"
                        max="100"
                        value={animationSpeed}
                        onChange={this.handleSpeedChange}
                    />
                </div>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize
                </button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="row">
                                {row.map((node, nodeIdx) => {
                                    const {
                                        col,
                                        isStart,
                                        isFinish,
                                        isVisited,
                                        isWall,
                                        row,
                                    } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isVisited={isVisited}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) =>
                                                this.handleMouseDown(row, col)
                                            }
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() =>
                                                this.handleMouseUp()
                                            }
                                            row={row}
                                        ></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 25; row++) {
        const currRow = [];
        for (let col = 0; col < 50; col++) {
            currRow.push(createNode(col, row));
        }
        grid.push(currRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === startNodeRow && col === startNodeCol,
        isFinish: row === endNodeRow && col === endNodeCol,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWalls = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
