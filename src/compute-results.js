import {
    globalRemainingBudget,
    globalPastEmissions,
    germanProportions,
    germanPopulation,
} from "./static.js";

function selectBudget(temperatureRise, probability) {
    return globalRemainingBudget
        .find(temperatureBudget => temperatureBudget.temperatureRise === temperatureRise)
        .limits
        .find(probabilityBudget => probabilityBudget.probability === probability)
        .value
}

function computeGermanBudget(globalBudget2020, allowedEmissionMode) {
    const proportion = germanProportions.values
        .find(proportion => proportion.mode === allowedEmissionMode)
        .value;

    return globalBudget2020 * proportion;
}

function computeLocationBudget(locationEmissionMt, germanBudget) {
    const germanEmission = computeGermanEmission();
    const locationEmission = locationEmissionMt * 1e-3;
    const locationEmissionProportion = locationEmission / germanEmission;

    return germanBudget * locationEmissionProportion;
}

function computeGermanEmission() {
    const germanEmissionProportion2017 = germanProportions.values
        .find(proportion => proportion.mode === "emission")
        .value;
    const globalPastEmission2018 = globalPastEmissions
        .find(emission => emission.year === 2018)
        .value;

    // FIXME: years should match, but no proportion available for 2018 or 2019
    return globalPastEmission2018 * germanEmissionProportion2017;
}

export default function computeResults({
    population,
    emissionMt,
    allowedEmissionMode,
    temperatureRise,
    probability,
}) {
    const globalBudget2017 = selectBudget(temperatureRise, probability);
    const globalBudget2010 = globalPastEmissions
        .map(pastEmission => pastEmission.value)
        .reduce((accumulator, emissionValue) => accumulator - emissionValue, globalBudget2017);

    const germanBudget = computeGermanBudget(globalBudget2010, allowedEmissionMode);
    const locationBudget = computeLocationBudget(emissionMt, germanBudget);
    console.log(locationBudget);

    return {
        allowedEmissions: [
            { year: 2020, value: 0.0062 },
            { year: 2021, value: 0.0060 },
            { year: 2022, value: 0.0058 },
            { year: 2023, value: 0.0056 },
            { year: 2024, value: 0.0055 },
            { year: 2025, value: 0.0053 },
            { year: 2026, value: 0.0051 },
            { year: 2027, value: 0.0049 },
            { year: 2028, value: 0.0047 },
            { year: 2029, value: 0.0045 },
            { year: 2030, value: 0.0043 },
            { year: 2050, value: 0.0005 },
        ],
        zeroEmissionYear: 2052.8,
    }
}
