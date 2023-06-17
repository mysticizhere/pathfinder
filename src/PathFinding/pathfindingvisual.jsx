import React, { Component } from "react";
import Node from "./Nodes/node";
import {
    dijkstra,
    getNodesInShortestPathOrder,
} from "../algorithms/dijkstra.js";

import "./pathfindingvisual.css";

const startNodeCol = 5;
const startNodeRow = 12;
const endNodeCol = 45;
const endNodeRow = 12;

export default class Pathfindingvisual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
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

    animateDijkstra() {}

    visualizeDijkstra() {}

    render() {
        const { nodes } = this.state;
        console.log(nodes);
        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize
                </button>
                <div className="grid">
                    {nodes.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="row">
                                {row.map((node, nodeIdx) => {
                                    const { isStart, isFinish } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            isStart={isStart}
                                            isFinish={isFinish}
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
