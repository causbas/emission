import AbstractAxisLabels from "./abstract-axis-labels.js";
import formatValue from "../../format-value.js";

const TITLE_OFFSET = 0.25;
const DATA_OFFSET = 0.5;
const VERTICAL_MARGIN_EX = 1.5;

export default class YAxisLabels extends AbstractAxisLabels {
    computeMargin() {
        const oneEx = this._context.measureText("x").width;
        const verticalMargin = oneEx * VERTICAL_MARGIN_EX;
        return { top: verticalMargin , right: 0, bottom: verticalMargin, left: 0 };
    }

    _applyTitleTransform(dimensions) {
        this._context.translate(dimensions.x * TITLE_OFFSET, dimensions.y * 0.5);
        this._context.rotate(-0.5 * Math.PI);
    }

    _applyValuesTransform(dimensions) {
        this._context.translate(dimensions.x * DATA_OFFSET, 0);
    }

    _formatValue(value) {
        return formatValue(value, 2);
    }

    _getAxis() {
        return "y";
    }
}
