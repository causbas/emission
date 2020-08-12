import Transform from "/src/line-chart/transform.js";

export default class AbstractPathShape {
    constructor(context, data) {
        this._context = context;
        this._data = data;
    }

    draw(dimensions) {
        this._drawPath(dimensions);
        this._strokePath();
    }

    _drawPath(dimensions) {
        this._context.save();

        const transform = new Transform(dimensions)
            .mirrorHorizontally()
            .scaleToData(this._data);
        this._context.transform(...transform.toArray());
        this._drawWithinContext(transform);

        this._context.restore();
    }

    _strokePath() {
        this._context.save();
        this._applyStrokeSettings();
        this._context.stroke();
        this._context.restore();
    }

    _drawWithinContext(dimensions) {
        throw new Error("Must be implemented in child class");
    }

    _applyStrokeSettings() {
    }
}
