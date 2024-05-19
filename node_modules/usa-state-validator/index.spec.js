const {
    isValidStateAbbreviation,
    isValidStateName,
    isValidStateInput,
    retrieveStateInformation,
    isValidStateCapital,
    retrieveStateCapitalByName,
    retrieveStateNameByCapital
} = require('./index');

describe('isValidStateAbbreviation, isValidStateInput, isValidStateName, isValidStateCapital', () => {

    const stateData = [
        {
            input: {
                abbr: 'TX',
                name: 'Texas',
                capital: 'Austin'
            },
            expectedResult: true
        },
        {
            input: {
                abbr: 'InvalidAbbr',
                name: 'InvalidState',
                capital: 'InvalidCapital'
            },
            expectedResult: false
        },
        {
            input: {
                abbr: 123,
                name: 123,
                capital: 123
            },
            expectedResult: false
        },
        {
            input: {
                abbr: undefined,
                name: undefined,
                capital: undefined
            },
            expectedResult: false
        },
        {
            input: {
                abbr: '  TX  ',
                name: '  Texas  ',
                capital: ' Austin '
            },
            expectedResult: true
        },
        {
            input: {
                abbr: 'tx',
                name: 'texas',
                capital: 'austin'
            },
            expectedResult: true
        }
    ];
  
    test.each(stateData)('isValidStateInput, isValidStateAbbreviation, isValidStateCapital and isValidStateName successfully determine if the state abbreviation is valid',(data) =>{
        expect(isValidStateAbbreviation(data.input.abbr)).toEqual(data.expectedResult);
        expect(isValidStateName(data.input.name)).toEqual(data.expectedResult);
        expect(isValidStateInput(data.input.abbr)).toEqual(data.expectedResult);
        expect(isValidStateInput(data.input.name)).toEqual(data.expectedResult);
        expect(isValidStateCapital(data.input.capital)).toEqual(data.expectedResult);
    });
});

describe('retrieveStateInformation', () => {

    const stateInformationData = [
        {
            input: "Ohio",
            expectedResult: { info: {
                abbreviation: "OH",
                name: "Ohio",
                capital: "Columbus"
            },
            state: null,
            capital: "Columbus"
            }
        },
        {
            input: "ME",
            expectedResult:  {
                info: {
                    abbreviation: "ME",
                    name: "Maine",
                    capital: "Augusta"
                },
                state: null,
                capital: null
            }
        },
        {
            input: "Augusta",
            expectedResult:  {
                info: {
                    abbreviation: "ME",
                    name: "Maine",
                    capital: "Augusta"
                },
                state: "Maine",
                capital: null
            }
        },
        {
            input: "turtle",
            expectedResult:  {info: null, state: null, capital: null}
        },
        {
            input: undefined,
            expectedResult:  {info: null, state: null, capital: null}
        }
    ];
    test.each(stateInformationData)('isValidStateInput, isValidStateAbbreviation and isValidStateName successfully determine if the state abbreviation is valid',(data) =>{
        expect(retrieveStateInformation(data.input)).toEqual(data.expectedResult.info);
        expect(retrieveStateCapitalByName(data.input)).toEqual(data.expectedResult.capital);
        expect(retrieveStateNameByCapital(data.input)).toEqual(data.expectedResult.state);
    });
    
});