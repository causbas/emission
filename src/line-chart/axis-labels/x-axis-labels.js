import AbstractAxisLabels from "./abstract-axis-labels.js";

const TITLE_OFFSET = 0.8;
const DATA_OFFSET = 0.35;
const HORIZONTAL_MARGIN_EX = 2.5;

export default class XAxisLabels extends AbstractAxisLabels {
    computeMargin() {
        const oneEx = this._context.measureText("x").width;
        const horizontalMargin = oneEx * HORIZONTAL_MARGIN_EX;
        return { top: 0, right: horizontalMargin, bottom: 0, left: horizontalMargin };
    }

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
