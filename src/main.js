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

function computeResults({
    population,
    emission,
    allowedEmissionMode,
    temperatureRise,
    probability,
}) {
    return {
        allowedEmissions: [
            0.0062,
            0.0060,
            0.0058,
            0.0056,
            0.0055,
            0.0053,
            0.0051,
            0.0049,
            0.0047,
            0.0045,
            0.0043,
            0.0005,
        ],
        zeroEmissionYear: 2052.8,
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
