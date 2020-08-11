import Transform from "./transform.js";
import formatValue from "/src/format-value.js";

const TITLE_OFFSET = 0.25;
const DATA_OFFSET = 0.5;

function drawTitle(context, dimensions, text) {
    context.save();
    context.textAlign = "center";

    context.translate(dimensions.x * TITLE_OFFSET, dimensions.y * 0.5);
    context.rotate(-0.5 * Math.PI);
    context.fillText(text, 0, 0);

    context.restore();
}

function drawValues(context, dimensions, data) {
    context.save();

    context.translate(dimensions.x * DATA_OFFSET, 0);
    const transform = new Transform(dimensions)
        .mirrorHorizontally()
        .scaleToData(data);
    data.forEach(([x, y]) => {
        const transformed = transform.applyOn({ x: x, y: y });
        const formattedValue = formatValue(y, 2);
        context.fillText(formattedValue, 0, transformed.y);
    });

    context.restore();
}

export default class VerticalLegend {
    constructor(context, data = [], title = "Y Axis") {
        this._context = context;
        this._data = data;
        this._title = title;
    }

    draw(dimensions) {
        this._context.save();
        this._context.fillStyle = "grey";
        this._context.textBaseline = "middle";

        drawTitle(this._context, dimensions, this._title);
        drawValues(this._context, dimensions, this._data);

        this._context.restore();
    }
}
