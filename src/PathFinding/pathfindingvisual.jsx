import React, { Component } from "react";
import Node from "./Nodes/node";

import "./pathfindingvisual.css";

export default class Pathfindingvisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 25; row++) {
      const currRow = [];
      for (let col = 0; col < 50; col++) {
        const currNode = {
          col,
          row,
          isStart: row === 12 && col === 5,
          isFinish: row === 12 && col === 45,
        };
        currRow.push(currNode);
      }
      nodes.push(currRow);
    }
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;
    console.log(nodes);
    return (
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
    );
  }
}
