import AbstractAxisLabels from "./abstract-axis-labels.js";
import formatValue from "/src/format-value.js";

const TITLE_OFFSET = 0.25;
const DATA_OFFSET = 0.5;
const VERTICAL_MARGIN_EM = 1;

export default class YAxisLabels extends AbstractAxisLabels {
    computeMargin() {
        const zeroMeasure = this._context.measureText("0");
        const verticalMargin = (
            zeroMeasure.actualBoundingBoxAscent + zeroMeasure.actualBoundingBoxDescent
        ) * VERTICAL_MARGIN_EM;
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
