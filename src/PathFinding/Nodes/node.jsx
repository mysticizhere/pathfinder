import React, { Component } from "react";
import "./node.css";

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            col,
            isFinish,
            isStart,
            isVisited,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
        } = this.props;
        const extraClassName = isFinish
            ? "node-finish"
            : isStart
            ? "node-start"
            : isWall
            ? "node-wall"
            : isVisited
            ? "node-visited"
            : "";
        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        );
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};
