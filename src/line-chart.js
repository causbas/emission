export default class LineChart {
    constructor(canvasElement) {
        this.context = canvasElement.getContext("2d");
        this.line = { color: "black", width: "2" };
        this.xStart = 0;
        this.yValues = [1, 0, 0.5, -1];
    }

    draw() {
        this.context.lineWidth = this.line.width;
        this.context.strokeStyle = this.line.color;

        this.context.save();
        const lineTransform = this.computeLineTransform();
        this.context.transform(...lineTransform);
        this.context.beginPath();
        this.drawLine(this.yValues);

        this.context.restore();
        this.context.stroke();
    }

    computeLineTransform(width = this.context.canvas.width, height = this.context.canvas.height) {
        const [minValue, maxValue] = this.yValues.reduce(
            ([minValue, maxValue], value) =>
                [Math.min(minValue, value), Math.max(maxValue, value)],
            [Number.MAX_VALUE, Number.MIN_VALUE]
        );
        const valueRange = maxValue - minValue;
        const scale = { x: width / (this.yValues.length - 1), y: height / valueRange };
        const offset = { x: 0, y: (0 - minValue) * scale.y };

        return [scale.x, 0, 0, scale.y, offset.x, offset.y];
    }

    drawLine() {
        this.context.moveTo(0, this.yValues[0]);

        this.yValues.forEach((value, index) =>
            this.context.lineTo(index, value)
        );
    }
}
