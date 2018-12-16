import React from 'react';

const LETTERS_IN_ALPHABET = 26;
const OFFSET_TO_ASCII = 65;
const PIN_REGEX = /^JN-([0-9]{4})-([0-9]{4})-([A-Z]{2})$/;

export default {

  calculateSum (total, num) {
    return parseInt(total) + parseInt(num);
  },

  reduceToSingleDigit(longNumber){
    const numberString = longNumber + "";
    const numberArray = numberString.split("");
    let sumOfDigits = numberArray.reduce(this.calculateSum);
    if (sumOfDigits > 9){
      sumOfDigits = this.reduceToSingleDigit(sumOfDigits);
    }
    return sumOfDigits;
  },

  calculateLetterCode(numericalSequence){
    const weightedValues = [
      this.reduceToSingleDigit(numericalSequence[0] * 1),
      this.reduceToSingleDigit(numericalSequence[1] * 2),
      this.reduceToSingleDigit(numericalSequence[2] * 1),
      this.reduceToSingleDigit(numericalSequence[3] * 2),
    ];
    const sum = weightedValues.reduce(this.calculateSum);
    return sum % LETTERS_IN_ALPHABET + OFFSET_TO_ASCII;
  },

  calculateLetterFromSequence(numericalSequence){
    const letterCode = this.calculateLetterCode(numericalSequence);
    return String.fromCharCode(letterCode);
  },

  isPinFormatValid(pin){
    const isNotEmpty = pin.trim() !== "";
    const regexMatches = pin.match(PIN_REGEX);
    if (!regexMatches){
      return false;
    }
    const numbersAsCharacters = this.calculateLetterFromSequence(regexMatches[1]) + this.calculateLetterFromSequence(regexMatches[2]);
    const isSuffixValid = numbersAsCharacters === regexMatches[3];
    return isNotEmpty && isSuffixValid;
  },

  isTimeValid(){
    const now = new Date();
    const hoursNow = now.getHours();
    return hoursNow >= 9 && hoursNow < 19;
  },

  isTicketAvailable(selection, data){
    const rideId = selection;
    const chosenRide = data.filter(ride => ride.id === rideId);
    return chosenRide[0].remaining_tickets > 0;
  },

  isPinValid(pin){
    return (typeof pin === "string") && this.isPinFormatValid(pin);
  },

  isSelectionValid(rideId, data){
    return Number.isInteger(rideId) && (rideId > -1) && this.isTicketAvailable(rideId, data);
  },

}