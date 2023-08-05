import React from "react";
const Navbar = (props) => {
    return (
        <div>
            <button
                onClick={() => {
                    props.handleDijkstra();
                    props.handleVisualization();
                }}
            >
                Dijkstra
            </button>
    
            <button
                onClick={() => {
                    props.handleBFS();
                    props.handleVisualization();
                }}
            >
                BFS
            </button>
        
            <button
                onClick={() => {
                    props.handleAstar();
                    props.handleVisualization();
                }}
            >
                A*
            </button>
        </div>
    );
};

export default Navbar;
