import computeResults from "./compute-results.js";

const urlParamValues = getUrlParamValues();
const results = computeResults(urlParamValues);

publishResults(results);
showResults();

function getUrlParamValues() {
    const urlParams = new URLSearchParams(window.location.search);

    return {
        population: urlParams.get("population"),
        emission: urlParams.get("emission"),
        allowedEmissionMode: urlParams.get("allowed-emission-mode"),
        temperatureRise: urlParams.get("temperature-rise"),
        probability: urlParams.get("probability"),
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
