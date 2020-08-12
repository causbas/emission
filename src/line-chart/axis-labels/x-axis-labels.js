import AbstractAxisLabels from "./abstract-axis-labels.js";

const TITLE_OFFSET = 0.75;
const DATA_OFFSET = 0.25;

export default class XAxisLabels extends AbstractAxisLabels {
    _applyTitleTransform(dimensions) {
        this._context.translate(dimensions.x * 0.5, dimensions.y * TITLE_OFFSET);
    }

    _applyValuesTransform(dimensions) {
        this._context.translate(0, dimensions.y * DATA_OFFSET);
        this._context.textAlign = "center";
    }

    _formatValue(value) {
        return value.toPrecision(4);
    }

    _getAxis() {
        return "x";
    }
}
