import VerticalLegend from "./vertical-legend.js";
import Line from "./line.js";

const LABELS_SIZE = 40;

export default class LineChart {
    constructor(canvasElement, data = [[0, 1], [10, 0], [20, 0.5], [30, -1]]) {
        this.context = canvasElement.getContext("2d");
        this.verticalLegend = new VerticalLegend(this.context);
        this.line = new Line(this.context, data);
    }

    draw() {
        const lineDimensions = {
            x: this.context.canvas.width - LABELS_SIZE,
            y: this.context.canvas.height - LABELS_SIZE,
        };

        this.verticalLegend.draw({ x: LABELS_SIZE, y: lineDimensions.y });

        this.context.save();
        this.context.translate(LABELS_SIZE, 0);
        this.line.draw(lineDimensions);
        this.context.restore();
    }
}
