export default function formatValue(resultValue, precision = 4) {
    const resultValueMt = resultValue * 1e3;
    return resultValueMt.toPrecision(precision);
}
