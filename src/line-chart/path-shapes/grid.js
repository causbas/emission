import AbstractPathShape from "./abstract-path-shape.js";

const OVERSHOOT_PX = { x: 3, y: 3 };

function createBoundingBox(data) {
    const first = data[0];
    const last = data[data.length - 1];

    return {
        left: first[0],
        right: last[0],
        top: first[1],
        bottom: last[1],
    }
}

export default class Grid extends AbstractPathShape {
    constructor(context, data) {
        super(context, data);
    }

    _drawWithinContext(transform) {
        const boundingBox = createBoundingBox(this._data);
        const overshoot = transform.scale.inverseApplyOn(OVERSHOOT_PX);

        this._context.beginPath();
        this._data.forEach(([x, y]) => {
            this._context.moveTo(boundingBox.left - overshoot.x, y);
            this._context.lineTo(x, y);
            this._context.lineTo(x, boundingBox.bottom + overshoot.y);
        });
    }

    _applyStrokeSettings() {
        this._context.lineWidth = 1;
        this._context.strokeStyle = "grey";
    }
}
