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

export default class Transform {
    constructor(scale, offset) {
        this._scale = scale || { x: 1, y: 1 };
        this._offset = offset || { x: 0, y: 0 };
    }

    scaleTo(data) {
        const [xValues, yValues] = [
            data.map(([xValue, yValue]) => xValue),
            data.map(([xValue, yValue]) => yValue),
        ];

        const [xExtrema, yExtrema] = [xValues, yValues].map(
            values => computeExtrema(values)
        );
        const [xRange, yRange] = [xExtrema, yExtrema].map(computeRange);

        const scale = { x: this._scale.x / xRange, y: this._scale.y / yRange };
        const offset = {
            x: -xExtrema.min * scale.x + this._offset.x,
            y: -yExtrema.min * scale.y + this._offset.y,
        };

        return new Transform(scale, offset);
    }

    toArray() {
        return [this._scale.x, 0, 0, this._scale.y, this._offset.x, this._offset.y];
    }
}
