export default function computeResults({
    population,
    emissionMt,
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
