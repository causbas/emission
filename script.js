const urlParams = new URLSearchParams(window.location.search);

const population = urlParams.get("population");
const emission = urlParams.get("emission");
const allowedEmissionMode = urlParams.get("allowed-emission-mode");
const temperatureRise = urlParams.get("temperature-rise");
const probability = urlParams.get("probability");

const results = computeResults(
    population, emission, allowedEmissionMode, temperatureRise, probability
);

const resultRowElements = document.querySelector("#results-row").children;
results.allowedEmissions.forEach((allowedEmission, i) =>
    resultRowElements[i].innerText = allowedEmission);

const zeroEmissionYearElement = document.querySelector("#zero-emission-year");
zeroEmissionYearElement.innerText = results.zeroEmissionYear;

const resultBlockElement = document.querySelector("#result-block");
resultBlockElement.className = resultBlockElement.className.replace("hidden", "");

function computeResults(
    population,
    emission,
    allowedEmissionMode,
    temperatureRise,
    probability,
) {
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
