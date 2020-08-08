function drawTitle(context, dimensions, text) {
    context.save();

    context.font = "10px sans-serif";
    context.fillStyle = "grey";
    context.textAlight = "center";
    context.textBaseline = "middle";

    context.translate(dimensions.x * 0.25, dimensions.y * 0.5);
    context.rotate(-0.5 * Math.PI);
    context.fillText(text, 0, 0);

    context.restore();
}

export default class VerticalLegend {
    constructor(context) {
        this.context = context;
        this.title = "Y Axis";
    }

    draw(dimensions) {
        drawTitle(this.context, dimensions, this.title);
    }
}
