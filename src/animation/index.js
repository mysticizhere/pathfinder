import { animatePath } from "./algovisualise";

export { animatePath };

export const setVisualizationState = (klass) => {
    klass.setState({ isVisualizing: false });
};
