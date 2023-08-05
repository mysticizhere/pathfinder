export const animatePath = (
    setIsVisualizing,
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    startNode,
    finishNode
  ) => {
    setIsVisualizing(true);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder, startNode, finishNode);
          setIsVisualizing(false);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };
  
  const animateShortestPath = (nodesInShortestPathOrder, startNode, finishNode) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };
  
