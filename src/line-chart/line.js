import AbstractPathShape from "./abstract-path-shape.js";

function createPaths(data, context) {
    context.beginPath();

    data.forEach(([xValue, yValue]) =>
        context.lineTo(xValue, yValue)
    );
}

export default class Line extends AbstractPathShape {
    constructor(context, data) {
        super(context, data);
    }

    draw(dimensions) {
        super.draw(dimensions);
    }

    _drawWithinContext() {
        createPaths(this._data, this._context);
    }

    _applyStrokeSettings() {
        this._context.lineWidth = 2;
        this._context.strokeStyle = "black";
    }
}
