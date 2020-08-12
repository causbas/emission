import { YAxisLabels } from "./axis-labels/index.js";
import { Grid, Line } from "./path-shapes/index.js";

const TOP_OFFSET = 20;
const LABELS_SIZE = 40;

export default class LineChart {
    constructor(canvasElement, data = [[0, 1], [10, 0], [20, 0.5], [30, -1]]) {
        this._context = canvasElement.getContext("2d");
        this._yAxisLabels = new YAxisLabels(this._context, data, "Mt CO₂");
        this._grid = new Grid(this._context, data);
        this._line = new Line(this._context, data);
    }

    draw() {
        const graphDimensions = {
            x: this._context.canvas.width - LABELS_SIZE,
            y: this._context.canvas.height - LABELS_SIZE - TOP_OFFSET,
        };

        this._context.save();
        this._context.translate(0, TOP_OFFSET);
        this._yAxisLabels.draw({ x: LABELS_SIZE, y: graphDimensions.y });
        this._context.restore();

        this._context.save();
        this._context.translate(LABELS_SIZE, TOP_OFFSET);
        this._grid.draw(graphDimensions);
        this._line.draw(graphDimensions);
        this._context.restore();
    }
}
