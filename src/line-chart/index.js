import VerticalLegend from "./vertical-legend.js";
import Line from "./line.js";

export default class LineChart {
    constructor(canvasElement, data = [[0, 1], [10, 0], [20, 0.5], [30, -1]]) {
        this.context = canvasElement.getContext("2d");
        this.verticalLegend = new VerticalLegend(this.context);
        this.line = new Line(this.context, data);
    }

    draw() {
        this.line.draw();
        this.verticalLegend.draw();
    }
}
