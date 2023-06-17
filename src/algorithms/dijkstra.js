function dijkstraAlgo(nodes, start, end, nodesToAnimate, boardArray, name, heuristic) {
  if (!start || !end || start === end) {
    return false;
  }
  nodes[start].distance = 0;
  nodes[start].direction = "right";
  let unvisitedNodes = Object.keys(nodes);
  while (unvisitedNodes.length) {
    let currentNode = getClosestNode(nodes, unvisitedNodes);
    while(currentNode.status === "wall" && unvisitedNodes.length){
        currentNode = getClosestNode(nodes, unvisitedNodes);
    }
    if(currentNode.distance === Infinity){
        return false;
    }
    currentNode.status = "visited";
    if(currentNode.id === end){
        return "sucess!";
    }
    updateNeighbours(nodes, currentNode, boardArray)
  }
}

function getClosestNode(nodes, unvisitedNodes) {
  let currClosest, index;
  for(int i=0;i<unvisitedNodes.length;i++){
    if(!currClosest || currClosest.distance > nodes[unvisitedNodes[i]].distance){
        currClosest = nodes[unvisitedNodes[i]];
        index = i;
    }
  }
  unvisitedNodes.splice(index, 1);
  return currClosest;
}

function updateNeighbours(nodes, node, boardArray, end, name, start, heuristic){
    let neighbours = getNeighbours(node.id, nodes, boardArray);
    for(let neighbour of neighbours){
        if(end){
            updateNode();
        } else{
            updateNode();
        }
    }
}


