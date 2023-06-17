const node = {
  row,
  col,
  isVisited,
  distance,
};

function dijkstraAlgo(grid, startNode, endNode) {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  nodes[startNode].distance = 0;
  const unvisitedNodes = nodes.slice();
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // while(closestNode.status === "wall" && unvisitedNodes.length){
    //     closestNode = getClosestNode(nodes, unvisitedNodes);
    // }
    // if(closestNode.distance === Infinity){
    //     return false;
    // }
    closestNode.isVisited = true;
    if (closestNode === endNode) {
      return "sucess!";
    }
    updateNeighbours(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbours(node, grid) {
  const neighbours = getNeighbours(node, grid);
  for (const neighbour of neighbours) {
    neighbour.distance = node.distance + 1;
  }
}

function getNeighbours(node, grid) {
  const neighbours = [];
  const { col, row } = node;
  if (row > 0) neighbours.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col > 0) neighbours.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours;
}
