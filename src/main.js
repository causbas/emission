import computeResults from "./compute-results.js";
import ParameterParser from "./parameter-parser.js";
import LineChart from "./line-chart/index.js";
import formatValue from "./format-value.js";

const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.keys().next().done) {
    const urlParamValues = parseUrlParams(urlParams);
    populateHtml(urlParamValues);

    const results = computeResults(urlParamValues);
    publishTableResults(results);
    publishChartResults(results);
    showResults();
}

function parseUrlParams(urlParams) {
    const parameterParser = new ParameterParser(urlParams);

    const emissionMt = parameterParser.from("emission")
        .asFloat()
        .assertPositive()
        .value;
    const allowedEmissionMode = parameterParser.from("allowed-emission-mode")
        .assertIsEither(["population", "emission"])
        .value;
    const temperatureRise = parameterParser.from("temperature-rise")
        .asFloat()
        .assertIsEither([1.5, 1.6, 1.75, 1.87, 2])
        .value;
    const probability = parameterParser.from("probability")
        .asFloat()
        .assertIsEither([0.33, 0.5, 0.67])
        .value;

    return {
        emissionMt: emissionMt,
        allowedEmissionMode: allowedEmissionMode,
        temperatureRise: temperatureRise,
        probability: probability,
    }
}

function populateHtml({
    emissionMt,
    allowedEmissionMode,
    temperatureRise,
    probability,
}) {
    const [temperatureRiseId, probabilityId] =
        [
            ["temperature-rise", temperatureRise],
            ["probability", probability]
        ].map(([prefix, value]) => {
            const suffix = value.toString().replace(".", "-");
            return `${prefix}-${suffix}`
        });

    document.querySelector("#emission").value = emissionMt;
    document.querySelector(`#allowed-emission-mode-${allowedEmissionMode}`).checked = true;
    document.querySelector(`#${temperatureRiseId}`).checked = true;
    document.querySelector(`#${probabilityId}`).checked = true;
}

function publishTableResults({ allowedEmissions, allowedEmissions2050, zeroEmissionYear }) {
    const joinedEmissions = [...allowedEmissions, ... allowedEmissions2050];
    const years = joinedEmissions.map(pair => pair.year);
    const values = joinedEmissions
        .map(pair => pair.value)
        .map(value => formatValue(value, 4));

    prependRow("#result-row-titles", years);
    prependRow("#result-row-values", values);

    const zeroEmissionYearElement = document.querySelector("#zero-emission-year");
    zeroEmissionYearElement.innerText = zeroEmissionYear.toPrecision(5);
}

function publishChartResults({ allowedEmissions, zeroEmissionYear }) {
    const chartData = allowedEmissions.map(
        ({ year, value }) => [year, value]
    );
    chartData.push([zeroEmissionYear, 0]);

    const resultCanvasElement = document.querySelector("#result-canvas");
    new LineChart(resultCanvasElement, chartData).draw();
}

function prependRow(parentSelector, innerTexts) {
    const cellElements = innerTexts.map(text => {
        const cellElement = document.createElement("td");
        cellElement.innerText = text;
        return cellElement;
    });

    const parentElement = document.querySelector(parentSelector);
    parentElement.prepend(...cellElements);
}

function showResults() {
    const resultBlockElement = document.querySelector("#result-block");
    resultBlockElement.className = resultBlockElement.className.replace("hidden", "");
}
