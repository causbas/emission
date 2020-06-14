const WIDTH = 40;

export default class VerticalLegend {
    constructor(context) {
        this.context = context;
        this.color = "grey";
        this.title = "Y Axis";

        this.width = WIDTH;
    }

    draw() {
        this.context.save();

        this.context.font = "10px sans-serif";
        this.context.fillStyle = this.color;
        this.context.textAlight = "center";
        this.context.textBaseline = "middle";

        const height = this.context.canvas.height;
        this.context.translate(WIDTH * 0.25, height * 0.5);
        this.context.rotate(-0.5 * Math.PI);
        this.context.fillText(this.title, 0, 0);

        this.context.restore();
    }
}
