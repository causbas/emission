const globalRemainingBudget = [
    {
        temperatureRise: 1.5,
        limits: [
            { probability: 0.33, value: 840 },
            { probability: 0.5, value: 580 },
            { probability: 0.67, value: 420 },
        ],
    },
    {
        temperatureRise: 1.6,
        limits: [
            { probability: 0.33, value: 1080 },
            { probability: 0.5, value: 770 },
            { probability: 0.67, value: 570 },
        ],
    },
    {
        temperatureRise: 1.75,
        limits: [
            { probability: 0.33, value: 1440 },
            { probability: 0.5, value: 1040 },
            { probability: 0.67, value: 800 },
        ],
    },
    {
        temperatureRise: 1.87,
        limits: [
            { probability: 0.33, value: 1720 },
            { probability: 0.5, value: 1260 },
            { probability: 0.67, value: 980 },
        ],
    },
    {
        temperatureRise: 2,
        limits: [
            { probability: 0.33, value: 2030 },
            { probability: 0.5, value: 1500 },
            { probability: 0.67, value: 1170 },
        ],
    },
];

const globalPastEmissions = [
    { year: 2018, value: 42.3 },
    { year: 2019, value: 43 },
];

const germanProportions = { year: 2017, values: [
    { mode: "emission", value: 0.0217 },
    { mode: "population", value: 0.011714285714286 },
]};
const germanPopulation = { year: 2017, value: 82_792_400 };

export {
    globalRemainingBudget,
    globalPastEmissions,
    germanProportions,
    germanPopulation,
};
