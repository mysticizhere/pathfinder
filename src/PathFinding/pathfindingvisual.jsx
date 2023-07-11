import React, { Component } from "react";
import Node from "./Nodes/node";
import { dijkstra } from "../algorithms/dijkstra";
import { bfs } from "../algorithms/bfs";
import { getNodesInShortestPathOrder } from "../algorithms/helper";
import { animatePath, animateWalls, setVisualizationState } from "../animation";
import AppNavbar from "../navbar/nav";
import "./pathfindingvisual.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class Pathfindingvisual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            isPathNotFound: false,
            visitedNodes: 0,
            shortestNodes: 0,
            tooltipOpen: false,
            isVisualizing: false,
            mainIsPressed: "",
            startNode_Pos: [START_NODE_ROW, START_NODE_COL],
            finishNode_Pos: [FINISH_NODE_ROW, FINISH_NODE_COL],
        };
    }

    componentDidMount() {
        const { startNode_Pos, finishNode_Pos } = this.state;
        let grid = getInitialGrid(startNode_Pos, finishNode_Pos);
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

    handleMouseLeave(row, col) {
        const { grid, mainIsPressed } = this.state;
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
        this.setState({ grid: newGrid });
    }

    visualizeDijkstra = () => {
        if (this.state.isVisualizing) return;
        const { grid, startNode_Pos, finishNode_Pos } = this.state;
        const start_X = startNode_Pos[0],
            start_Y = startNode_Pos[1];
        const startNode = grid[start_X][start_Y];
        const finish_X = finishNode_Pos[0],
            finish_Y = finishNode_Pos[1];
        const finishNode = grid[finish_X][finish_Y];
        try {
            const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder =
                getNodesInShortestPathOrder(finishNode);
            if (nodesInShortestPathOrder.length === 1) throw "not possible";
            this.setState({
                shortestNodes: nodesInShortestPathOrder.length,
                visitedNodes: visitedNodesInOrder.length,
            });
            animatePath(
                this,
                visitedNodesInOrder,
                nodesInShortestPathOrder,
                startNode,
                finishNode
            );
        } catch (error) {
            this.setState({ isPathNotFound: true, isVisualizing: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false, isVisualizing: false });
            }, 3000);
        }
    };

    visualizeBFS = () => {
        if (this.state.isVisualizing) return;
        const { grid, startNode_Pos, finishNode_Pos } = this.state;
        const start_X = startNode_Pos[0],
            start_Y = startNode_Pos[1];
        const startNode = grid[start_X][start_Y];
        const finish_X = finishNode_Pos[0],
            finish_Y = finishNode_Pos[1];
        const finishNode = grid[finish_X][finish_Y];
        try {
            const visitedNodesInOrder = bfs(grid, startNode, finishNode);
            const nodesInShortestPathOrder =
                getNodesInShortestPathOrder(finishNode);
            this.setState({
                shortestNodes: nodesInShortestPathOrder.length,
                visitedNodes: visitedNodesInOrder.length,
            });
            animatePath(
                this,
                visitedNodesInOrder,
                nodesInShortestPathOrder,
                startNode,
                finishNode
            );
        } catch (error) {
            this.setState({ isPathNotFound: true, isVisualizing: true });
            setTimeout(() => {
                this.setState({ isPathNotFound: false, isVisualizing: false });
            }, 3000);
        }
    };

    setVisualization = () => {
        this.setState({
            isVisualizing: !this.state.isVisualizing,
        });
    };

    handleClick = () => {
        setVisualizationState(this);
    };

    render() {
        const { grid, mouseIsPressed } = this.state;
        return (
            <>
                <AppNavbar
                    handleDijkstra={this.visualizeDijkstra}
                    handleBFS={this.visualizeBFS}
                    handleVisualization={this.setVisualization}
                />
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx} className="row">
                                {row.map((node, nodeIdx) => {
                                    const {
                                        row,
                                        col,
                                        isStart,
                                        isFinish,
                                        isWall,
                                    } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) =>
                                                this.handleMouseDown(row, col)
                                            }
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={(row, col) =>
                                                this.handleMouseUp(row, col)
                                            }
                                            onMouseLeave={(row, col) =>
                                                this.handleMouseLeave(row, col)
                                            }
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

const getInitialGrid = (startNode_Pos, finishNode_Pos) => {
    let grid = [];
    for (let row = 0; row < 28; row++) {
        const currRow = [];
        for (let col = 0; col < 40; col++) {
            currRow.push(createNode(row, col, startNode_Pos, finishNode_Pos));
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
        distanceToFinishNode:
            Math.abs(finish_x - row) + Math.abs(finish_y - col),
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
