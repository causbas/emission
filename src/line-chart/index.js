import VerticalLegend from "./vertical-legend.js";

function computeLineTransform(axisExtrema, dimensions) {
    const [xRange, yRange] = [axisExtrema.x, axisExtrema.y].map(computeRange);

    const scale = { x: dimensions.x / xRange, y: dimensions.y / yRange };
    const offset = { x: -axisExtrema.x.min * scale.x, y: -axisExtrema.y.min * scale.y };
    return [scale.x, 0, 0, scale.y, offset.x, offset.y];
}

function computeRange({ max, min }) {
    return max - min;
}

function computeExtrema(values) {
    const [minValue, maxValue] = values.reduce(
        ([minValue, maxValue], currentValue) =>
            [Math.min(minValue, currentValue), Math.max(maxValue, currentValue)],
        [Number.MAX_VALUE, Number.MIN_VALUE]
    );

    return { min: minValue, max: maxValue };
}

function drawLines(data, context) {
    data.forEach(([xValue, yValue]) =>
        context.lineTo(xValue, yValue)
    );
}

export default class LineChart {
    constructor(canvasElement) {
        this.context = canvasElement.getContext("2d");
        this.xStart = 0;
        this.data = [[0, 1], [10, 0], [20, 0.5], [30, -1]];

        this.context.lineWidth = 2;
        this.context.strokeStyle = "black";

        this.verticalLegend = new VerticalLegend(this.context);
    }

    draw() {
        const width = this.context.canvas.width;
        const height = this.context.canvas.height;
        const xValues = this.data.map(([xValue, yValue]) => xValue);
        const yValues = this.data.map(([xValue, yValue]) => yValue);

        const [xExtrema, yExtrema] = [xValues, yValues].map(values => computeExtrema(values));
        this.verticalLegend.draw();

        this.context.save();
        const lineTransform = computeLineTransform({ x: xExtrema, y: yExtrema }, { x: width, y: height });
        this.context.transform(...lineTransform);
        this.context.beginPath();
        drawLines(this.data, this.context);

        this.context.restore();
        this.context.stroke();
    }
}
