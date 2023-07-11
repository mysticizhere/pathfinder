import { animatePath } from "./algovisualise";
import { animateWalls } from "./wallvisualise";

export { animatePath, animateWalls };

export const setVisualizationState = (klass) => {
    klass.setState({ isVisualizing: false });
};
