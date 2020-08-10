const X_AXIS = "x";
const Y_AXIS = "y";

function computeRange({ max, min }) {
    return max - min;
}

function computeInterval(values) {
    const [minValue, maxValue] = values.reduce(
        ([minValue, maxValue], currentValue) =>
            [Math.min(minValue, currentValue), Math.max(maxValue, currentValue)],
        [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
    );

    return { min: minValue, max: maxValue };
}

export default class Transform {
    constructor(scale, offset) {
        this._scale = scale || { x: 1, y: 1 };
        this._offset = offset || { x: 0, y: 0 };
    }

    scaleToData(data) {
        const axesValues = {
            x: data.map(([xValue, yValue]) => xValue),
            y: data.map(([xValue, yValue]) => yValue),
        };

        return Object.keys(axesValues).reduce(
            (transform, axis) => transform.scaleToValues(axesValues[axis], axis),
            this,
        );
    }

    scaleToValues(values, axis) {
        const interval = computeInterval(values);
        return this.scaleToInterval(interval, axis);
    }

    scaleToInterval(interval, axis) {
        const scale = { ...this._scale };
        const offset = { ...this._offset };

        const range = computeRange(interval);
        scale[axis] = scale[axis] / range;
        offset[axis] = -interval.min * scale[axis] + offset[axis];

        return new Transform(scale, offset);
    }

    mirrorHorizontally() {
        const scale = { ...this._scale };
        const offset = { ...this._offset };

        scale.y = -scale.y;
        offset.y = offset.y - scale.y;

        return new Transform(scale, offset);
    }

    toArray() {
        return [this._scale.x, 0, 0, this._scale.y, this._offset.x, this._offset.y];
    }
}
