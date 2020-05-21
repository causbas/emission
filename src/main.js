import computeResults from "./compute-results.js";
import ParameterParser from "./parameter-parser.js";

const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.keys().next().done) {
    const urlParamValues = parseUrlParams(urlParams);
    populateHtml(urlParamValues);

    const results = computeResults(urlParamValues);
    publishResults(results);
    showResults();
}

function parseUrlParams(urlParams) {
    const parameterParser = new ParameterParser(urlParams);

    const population = parameterParser.from("population")
        .asInt()
        .assertPositive()
        .value;
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
        population: population,
        emissionMt: emissionMt,
        allowedEmissionMode: allowedEmissionMode,
        temperatureRise: temperatureRise,
        probability: probability,
    }
}

function populateHtml({
    population,
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

    document.querySelector("#population").value = population;
    document.querySelector("#emission").value = emissionMt;
    document.querySelector(`#allowed-emission-mode-${allowedEmissionMode}`).checked = true;
    document.querySelector(`#${temperatureRiseId}`).checked = true;
    document.querySelector(`#${probabilityId}`).checked = true;
}

function publishResults({ allowedEmissions, zeroEmissionYear }) {
    const years = allowedEmissions.map(pair => pair.year);
    const values = allowedEmissions
        .map(pair => pair.value);

    prependRow("#result-row-titles", years);
    prependRow("#result-row-values", values);

    const zeroEmissionYearElement = document.querySelector("#zero-emission-year");
    zeroEmissionYearElement.innerText = zeroEmissionYear;
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
