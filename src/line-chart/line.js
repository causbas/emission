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

function createTransform(dimensions, data) {
    const values = {
        x: data.map(([xValue, yValue]) => xValue),
        y: data.map(([xValue, yValue]) => yValue),
    };

    const [xExtrema, yExtrema] = [values.x, values.y].map(values => computeExtrema(values));
    const [xRange, yRange] = [xExtrema, yExtrema].map(computeRange);

    const scale = { x: dimensions.x / xRange, y: dimensions.y / yRange };
    const offset = { x: -xExtrema.min * scale.x, y: -yExtrema.min * scale.y };

    return [scale.x, 0, 0, scale.y, offset.x, offset.y];
}

function createPaths(data, context) {
    context.beginPath();

    data.forEach(([xValue, yValue]) =>
        context.lineTo(xValue, yValue)
    );
}

function strokePath(context) {
    context.save();

    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();

    context.restore();
}

export default class Line {
    constructor(context, data) {
        this._context = context;
        this._data = data;
    }

    draw() {
        this._context.save();

        const width = this._context.canvas.width;
        const height = this._context.canvas.height;
        const lineTransform = createTransform({ x: width, y: height }, this._data);
        this._context.transform(...lineTransform);

        createPaths(this._data, this._context);

        this._context.restore();

        strokePath(this._context);
    }
}
