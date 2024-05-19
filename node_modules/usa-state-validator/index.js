'use strict';

const stateInformation = require('./data/usa_states.json');

const retrieveStateInformationConditionally = (textInput, condition= null) => {
    if (typeof textInput === 'string' || textInput instanceof String){
        const formattedInput = textInput.trim().toUpperCase();
        if(condition){
            return stateInformation.find(state => formattedInput === state[condition].toUpperCase());
        }else{
            return stateInformation.find(state => formattedInput === state.name.toUpperCase() || formattedInput === state.abbreviation.toUpperCase() || formattedInput === state.capital.toUpperCase());
        }   
    }
    return undefined;
};

const isValidStateAbbreviation = (stateAbbreviation) => {
    return !!retrieveStateInformationConditionally(stateAbbreviation, 'abbreviation');
};

const isValidStateCapital= (stateCapital) => {
    return !!retrieveStateInformationConditionally(stateCapital, 'capital');
};

const isValidStateName = (stateName) => {
    return !!retrieveStateInformationConditionally(stateName, 'name');
};

const isValidStateInput = (textInput) => {
    return isValidStateAbbreviation(textInput) || isValidStateName(textInput);
};

const retrieveStateInformation = (textInput) => {
    const result = retrieveStateInformationConditionally(textInput);
    return result ? result : null;
};

const retrieveStateCapitalByName = (stateName) => {
    const result = retrieveStateInformationConditionally(stateName, 'name');
    return result ? result.capital : null;
};

const retrieveStateNameByCapital = (stateCapital) => {
    const result = retrieveStateInformationConditionally(stateCapital, 'capital');
    return result ? result.name : null;
};

module.exports = {
    isValidStateAbbreviation,
    isValidStateName,
    isValidStateInput,
    retrieveStateInformation,
    isValidStateCapital,
    retrieveStateCapitalByName,
    retrieveStateNameByCapital
};