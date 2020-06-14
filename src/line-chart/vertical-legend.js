const WIDTH = 40;

function drawTitle(context, color, text) {
    context.save();

    context.font = "10px sans-serif";
    context.fillStyle = color;
    context.textAlight = "center";
    context.textBaseline = "middle";

    const height = context.canvas.height;
    context.translate(WIDTH * 0.25, height * 0.5);
    context.rotate(-0.5 * Math.PI);
    context.fillText(text, 0, 0);

    context.restore();
}

export default class VerticalLegend {
    constructor(context) {
        this.context = context;
        this.color = "grey";
        this.title = "Y Axis";

        this.width = WIDTH;
    }

    draw() {
        drawTitle(this.context, this.color, this.title);
    }
}
