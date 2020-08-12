import Transform from "./transform.js";

function extractTextCoordinates(axis, valueCoordinates) {
    return {
        x: axis === "x" ? valueCoordinates.x : 0,
        y: axis === "y" ? valueCoordinates.y : 0,
    };
}

export default class AbstractAxisLabels {
    constructor(context, data = [], title = "") {
        this._context = context;
        this._data = data;
        this._title = title;
    }

    draw(dimensions) {
        this._context.save();
        this._context.fillStyle = "grey";
        this._context.textBaseline = "middle";

        this._drawTitle(dimensions);
        this._drawValues(dimensions);

        this._context.restore();
    }

    _drawTitle(dimensions) {
        this._context.save();

        this._context.textAlign = "center";
        this._applyTitleTransform(dimensions);
        this._context.fillText(this._title, 0, 0);

        this._context.restore();
    }

    _drawValues(dimensions) {
        this._context.save();

        this._applyValuesTransform(dimensions);
        const transform = new Transform(dimensions)
            .mirrorHorizontally()
            .scaleToData(this._data);

        this._data
            .map(([x, y]) => ({ x: x, y: y }))
            .forEach(coordinates => this._drawValue(coordinates, transform));

        this._context.restore();
    }

    _drawValue(coordinates, transform) {
        const axis = this._getAxis();
        const formattedValue = this._formatValue(coordinates[axis]);
        const textCoordinates = [
            coordinates => transform.applyOn(coordinates),
            coordinates => extractTextCoordinates(axis, coordinates),
        ].reduce((coordinates, operation) => operation(coordinates), coordinates);
        this._context.fillText(formattedValue, textCoordinates.x, textCoordinates.y);
    }

    _applyTitleTransform(dimensions) {
        throw new Error("must be implemented in subclass");
    }

    _applyValuesTransform(dimensions) {
        throw new Error("must be implemented in subclass");
    }

    _formatValue(value) {
        throw new Error("must be implemented in subclass");
    }

    _getAxis() {
        throw new Error("must be implemented in subclass");
    }
}
