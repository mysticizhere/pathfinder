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
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown() {}

    handleMouseEnter() {}

    handleMouseUp() {}

    animateDijkstra(visitedNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const newGrid = this.state.grid.slice();
                const newNode = {
                    ...node,
                    isVisited: true,
                };
                newGrid[newNode.row][newNode.col] = newNode;
                this.setState({ grid: newGrid });
            }, 100 * i);
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
        const { grid } = this.state;
        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize
                </button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="row">
                                {row.map((node, nodeIdx) => {
                                    const { isStart, isFinish, isVisited } =
                                        node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isVisited={isVisited}
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
