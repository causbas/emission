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

function computeLocationBudget(locationEmission, germanBudget) {
    const germanEmission = computeGermanEmission();
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

export function computeAllowedEmissions(emission, budget) {
    const factor = 0.5;
    const yearZero = 2019;
    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2050];

    const scaledEmission = emission * factor;
    const emissionProportion = scaledEmission / budget;

    const allowedEmissions = years.map(year => {
        const position = (year - yearZero);
        const value = emission * (1 - emissionProportion * position);

        return { year: year, value: Math.max(0, value) };
    });
    const zeroEmissionYear = yearZero + budget / scaledEmission;

    return {
        allowedEmissions: allowedEmissions,
        zeroEmissionYear: zeroEmissionYear,
    };
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
    const locationEmission = emissionMt * 1e-3;
    const locationBudget = computeLocationBudget(locationEmission, germanBudget);

    return computeAllowedEmissions(locationEmission, locationBudget);
}
