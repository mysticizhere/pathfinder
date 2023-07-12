import {
    getAllNodes,
    sortNodesByDistance,
    getUnvisitedNeighbours,
} from "./helper";

export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (!closestNode.isWall) {
            if (closestNode.distance === Infinity) return visitedNodesInOrder;

            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);
            if (closestNode === finishNode) return visitedNodesInOrder;

            updateUnvisitedNeighbours(closestNode, grid);
        }
    }
}

function updateUnvisitedNeighbours(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbours(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1 + neighbor.distanceToFinishNode;
        neighbor.previousNode = node;
    }
}
