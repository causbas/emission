import computeResults from "./compute-results.js";
import ParameterParser from "./parameter-parser.js";

const urlParamValues = getUrlParamValues();
const results = computeResults(urlParamValues);

publishResults(results);
showResults();

function getUrlParamValues() {
    const urlParams = new URLSearchParams(window.location.search);
    const parameterParser = new ParameterParser(urlParams);

    const [population, emission] = ["population", "emission"]
        .map(name => parameterParser.from(name).asInt().assertPositive())
        .map(parser => parser.value);
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
        emission: emission,
        allowedEmissionMode: allowedEmissionMode,
        temperatureRise: temperatureRise,
        probability: probability,
    }
}

function publishResults({ allowedEmissions, zeroEmissionYear }) {
    const resultRowElements = document.querySelector("#results-row").children;
    allowedEmissions.forEach((allowedEmission, i) =>
        resultRowElements[i].innerText = allowedEmission);

    const zeroEmissionYearElement = document.querySelector("#zero-emission-year");
    zeroEmissionYearElement.innerText = zeroEmissionYear;
}

function showResults() {
    const resultBlockElement = document.querySelector("#result-block");
    resultBlockElement.className = resultBlockElement.className.replace("hidden", "");
}
