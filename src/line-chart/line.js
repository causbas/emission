import Transform from "./transform.js";

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

    draw(dimensions) {
        this._context.save();

        const lineTransform = new Transform(dimensions)
            .mirrorHorizontally()
            .scaleTo(this._data);
        this._context.transform(...lineTransform.toArray());
        createPaths(this._data, this._context);

        this._context.restore();

        strokePath(this._context);
    }
}
