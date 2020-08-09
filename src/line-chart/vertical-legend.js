const TITLE_FACTOR = 0.25;

function drawTitle(context, dimensions, text) {
    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.translate(dimensions.x * TITLE_FACTOR, dimensions.y * 0.5);
    context.rotate(-0.5 * Math.PI);
    context.fillText(text, 0, 0);

    context.restore();
}

export default class VerticalLegend {
    constructor(context, title = "Y Axis") {
        this._context = context;
        this._title = title;
    }

    draw(dimensions) {
        this._context.save();
        this._context.fillStyle = "grey";

        drawTitle(this._context, dimensions, this._title);

        this._context.restore();
    }
}
