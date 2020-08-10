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

class AbstractTransformComponent {
    constructor(coordinates) {
        this.x = coordinates.x;
        this.y = coordinates.y;
    }

    applyOn(coordinates) {
        return this._processCoordinates(coordinates, this._apply);
    }

    inverseApplyOn(coordinates) {
        return this._processCoordinates(coordinates, this._inverseApply);
    }

    _processCoordinates(coordinates, callback) {
        const transformedEntries = Object.entries(coordinates).map(([axis, value]) =>
            [axis, callback(value, this[axis])]
        );

        return Object.fromEntries(transformedEntries);
    }

    _apply(value, operand) {
        throw new Error("must be implemented in subclass");
    }

    _inverseApply(value, operand) {
        throw new Error("must be implemented in subclass");
    }
}

class Scale extends AbstractTransformComponent {
    _apply(value, operand) {
        return value * operand;
    }

    _inverseApply(value, operand) {
        return value / operand;
    }
}

class Offset extends AbstractTransformComponent {
    _apply(value, operand) {
        return value + operand;
    }

    _inverseApply(value, operand) {
        return value - operand;
    }
}

export default class Transform {
    constructor(scale = { x: 1, y: 1 }, offset = { x: 0, y: 0 }) {
        this._scale = new Scale(scale);
        this._offset = new Offset(offset);
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

    applyOn(coordinates) {
        return [this._scale, this._offset].reduce(
            (transformingCoordinates, transformComponent) =>
                transformComponent.applyOn(transformingCoordinates),
            coordinates,
        );
    }

    toArray() {
        return [this._scale.x, 0, 0, this._scale.y, this._offset.x, this._offset.y];
    }
}
