[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Known Vulnerabilities](https://snyk.io/test/github/christinepoydence/usa-state-validator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/christinepoydence/usa-state-validator?targetFile=package.json)
[![Build Status](https://travis-ci.com/christinepoydence/usa-state-validator.svg?branch=main)](https://travis-ci.com/christinepoydence/usa-state-validator)
[![Coverage Status](https://coveralls.io/repos/github/christinepoydence/usa-state-validator/badge.svg?branch=main)](https://coveralls.io/github/christinepoydence/usa-state-validator?branch=main)
[![Maintainability](https://api.codeclimate.com/v1/badges/9a20c5845486a5285fd5/maintainability)](https://codeclimate.com/github/christinepoydence/usa-state-validator/maintainability)

# usa-state-validator

A tool to determine whether a given input is a valid name or abbreviation of a USA state.

## Install

```bash
npm install usa-state-validator
```

## Usage

### isValidStateInput(textInput)

This method accepts an input value and returns true if the input is a valid USA state name or abbreviation. It will:
- return true regardless of case
- return false if the input is not a string
- return true if the input has leading or trailing spaces
- return false if the input is not a state abbreviation or a state name

```javascript
const {isValidStateInput} = require("usa-state-validator")

isValidStateInput('OH') // true
isValidStateInput('oh') // true
isValidStateInput('Ohio') // true
isValidStateInput('ohio') // true
isValidStateInput('  Ohio') // true
isValidStateInput('Oh io') // false
isValidStateInput('notAState') // false
isValidStateInput(undefined) // false
```

### isValidStateName(textInput)

This method accepts an input value and returns true if the input is a valid USA state name. It will:
- return true regardless of case
- return false if the input is not a string
- return true if the input has leading or trailing spaces
- return false if the input is not a state abbreviation

```javascript
const {isValidStateName} = require("usa-state-validator")

isValidStateName('OHIO') // true
isValidStateName('ohio') // true
isValidStateName('Ohio') // true
isValidStateName('  Ohio') // true
isValidStateName('oh') // false
isValidStateName('OH') // false
isValidStateName('Oh io') // false
isValidStateName('notAState') // false
isValidStateName(undefined) // false
```

### isValidStateAbbreviation(textInput)

This method accepts an input value and returns true if the input is a valid USA state abbreviation. It will:
- return true regardless of case
- return false if the input is not a string
- return true if the input has leading or trailing spaces
- return false if the input is not a state abbreviation

```javascript
const {isValidStateAbbreviation} = require("usa-state-validator")

isValidStateAbbreviation('oh') // true
isValidStateAbbreviation('OH') // true
isValidStateAbbreviation(' OH ') // true
isValidStateAbbreviation('OHIO') // false
isValidStateAbbreviation('ohio') // false
isValidStateAbbreviation('Ohio') // false
isValidStateAbbreviation('  Ohio') // false
isValidStateAbbreviation('O H') // false
isValidStateAbbreviation('notAState') // false
isValidStateAbbreviation(undefined) // false
```

### isValidStateCapital(textInput)

This method accepts an input value and returns true if the input is a valid USA state capital. It will:
- return true regardless of case
- return false if the input is not a string
- return true even if the input has leading or trailing spaces
- return false if the input is not a state capital

```javascript
const {isValidStateCapital} = require("usa-state-validator")

isValidStateCapital('columbus') // true
isValidStateCapital('COLUMBUS') // true
isValidStateCapital(' Columbus ') // true
isValidStateCapital('OHIO') // false
isValidStateCapital('ohio') // false
isValidStateCapital('Ohio') // false
isValidStateCapital('Col umbus') // false
isValidStateCapital('notACapital') // false
isValidStateCapital(undefined) // false
```

### retrieveStateInformation(textInput)

This method accepts an input value of a state name, abbreviation, or capital city and returns the formatted state name, capital, and abbreviation as a JSON object if the input is a valid USA state abbreviation or name. It will:
- return the formatted object regardless of the case of the input
- return null if the input is not a string or if the input is not a valid state name or abbreviation
- return the formatted object if the input has leading or trailing spaces

```javascript
const {retrieveStateInformation} = require("usa-state-validator")

retrieveStateInformation('oh') //returns {abbreviation: "OH", name: "Ohio", capital: "Columbus" }
retrieveStateInformation('OH') //returns {abbreviation: "OH", name: "Ohio", capital: "Columbus" }
retrieveStateInformation(' OH ') //returns {abbreviation: "OH", name: "Ohio", capital: "Columbus" }
retrieveStateInformation('OHIO') //returns {abbreviation: "OH", name: "Ohio", capital: "Columbus" }
retrieveStateInformation('ohio') //returns {abbreviation: "OH", name: "Ohio", capital: "Columbus" }
retrieveStateInformation('Ohio') //returns {abbreviation: "OH", name: "Ohio", capital: "Columbus" }
retrieveStateInformation('  Ohio') //returns {abbreviation: "OH", name: "Ohio", capital: "Columbus" }
retrieveStateInformation('O H') //returns null
retrieveStateInformation('notAState') //returns null
retrieveStateInformation(undefined) //returns null
```

### retrieveStateCapitalByName(stateName)

This method accepts an input value of a state name and returns the formatted capital as a String. It will:
- return the formatted object regardless of the case of the input
- return null if the input is not a string or if the input is not a valid state name
- return the formatted capital if the input has leading or trailing spaces

```javascript
const {retrieveStateCapitalByName} = require("usa-state-validator")

retrieveStateCapitalByName('Ohio') //returns "Columbus"
retrieveStateCapitalByName('notAState') //returns null
retrieveStateCapitalByName(undefined) //returns null
```

### retrieveStateNameByCapital(stateName)

This method accepts an input value of a state capital and returns the formatted state name as a String. It will:
- return the formatted object regardless of the case of the input
- return null if the input is not a string or if the input is not a valid state capital
- return the formatted capital if the input has leading or trailing spaces

```javascript
const {retrieveStateNameByCapital} = require("usa-state-validator")

retrieveStateNameByCapital('Columbus') //returns "Ohio"
retrieveStateNameByCapital('notAState') //returns null
retrieveStateNameByCapital(undefined) //returns null
```