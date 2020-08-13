import { XAxisLabels, YAxisLabels } from "./axis-labels/index.js";
import { Grid, Line } from "./path-shapes/index.js";

const LABELS_SIZE = 40;

function mergeMargins(margins) {
    return margins.reduce(
        (mergedMargin, margin) => {
            ["top", "right", "bottom", "left"].forEach(side =>
                mergedMargin[side] = Math.max(mergedMargin[side], margin[side])
            )
            return mergedMargin;
        },
        { top: 0, right: 0, bottom: 0, left: 0 },
    );
}

function computeGraphDimensions(canvas, margin) {
    return {
        x: canvas.width - LABELS_SIZE - margin.right,
        y: canvas.height - LABELS_SIZE - margin.top,
    };
}

export default class LineChart {
    constructor(canvasElement, data = [[0, 1], [10, 0], [20, 0.5], [30, -1]]) {
        this._context = canvasElement.getContext("2d");
        this._xAxisLabels = new XAxisLabels(this._context, data, "Years");
        this._yAxisLabels = new YAxisLabels(this._context, data, "Mt CO₂");
        this._grid = new Grid(this._context, data);
        this._line = new Line(this._context, data);
    }

    draw() {
        const mergedMargin = mergeMargins(
            [this._xAxisLabels, this._yAxisLabels].map(labels => labels.computeMargin())
        );
        const graphDimensions = computeGraphDimensions(
            this._context.canvas, mergedMargin
        );

        this._context.save();
        this._context.translate(LABELS_SIZE, mergedMargin.top + graphDimensions.y);
        this._xAxisLabels.draw({ x: graphDimensions.x, y: LABELS_SIZE });
        this._context.restore();

        this._context.save();
        this._context.translate(0, mergedMargin.top);
        this._yAxisLabels.draw({ x: LABELS_SIZE, y: graphDimensions.y });
        this._context.restore();

        this._context.save();
        this._context.translate(LABELS_SIZE, mergedMargin.top);
        this._grid.draw(graphDimensions);
        this._line.draw(graphDimensions);
        this._context.restore();
    }
}
