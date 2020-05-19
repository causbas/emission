export default class ParameterParser {
    constructor(urlSearchParams) {
        this.urlSearchParams = urlSearchParams;
    }

    from(name) {
        const parameterValue = this.urlSearchParams.get(name);
        return new StringParser(parameterValue);
    }
}

class BaseParser {
    constructor(value) {
        this.value = value;
    }

    assert(conditionFn, messageFn) {
        if (!conditionFn(this.value)) {
            throw new Error(messageFn(this.value));
        }

        return this;
    }

    assertIsEither(values) {
        return this.assert(
            value => values.includes(value),
            value => `Expected value to be one of [${values}], but it is ${value}.`,
        );
    }
}

class StringParser extends BaseParser {
    asFloat() {
        const floatValue = parseFloat(this.value);
        return new NumberParser(floatValue);
    }

    asInt() {
        const intValue = parseInt(this.value);
        return new NumberParser(intValue);
    }
}

class NumberParser extends BaseParser {
    assertPositive() {
        return this.assert(
            value => value > 0,
            value => `Expected value to be positive, but it is ${value}.`,
        );
    }
}
