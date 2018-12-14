import React, { Component } from 'react';
import PinSection from './components/pinSection';
import Rides from './components/rides';
import Reservation from './components/reservation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const API = "http://fast-rider.herokuapp.com/api/v1/";
const DEFAULT_QUERY = "rides";
const TICKETS_QUERY = "tickets";
const TOKEN_BIT = "?token=";
const TOKEN = "2313ffa865947d1909fe39933259051c29a9ef0740";
const PIN_REGEX = /^JN-([0-9]{4})-([0-9]{4})-([A-Z]{2})$/;
const LETTERS_IN_ALPHABET = 26;
const OFFSET_TO_ASCII = 65;

class JungleTicketApp extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      isBooked: false,
      error: null,
      selection: -1,
      pin: "",
      reservation: {},
      userReservations: {},
      data: []
    };
  }

  getData = async () => {
    try {
      const url = API + DEFAULT_QUERY + TOKEN_BIT + TOKEN;
      const response = await axios.get(url);
      this.setState({
        data: response.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  };

  storeReservations = (rides, userReservations, pin, selection) => {
    if (!userReservations){
      userReservations = {};
    }
    const chosenRide = rides.filter(ride => ride.id === selection);
    userReservations[pin] = chosenRide[0].return_time;
    this.setState({
      userReservations: userReservations
    });
    localStorage.setItem("userReservations", JSON.stringify(userReservations));
  };

  loadReservations = () => {
    try {
      const userReservations = JSON.parse(localStorage.getItem("userReservations"));
      this.setState({
        userReservations: userReservations
      });
    } catch (error) {
      console.log(error);
    }
  };

  bookRide = async (pin, ride_id, token) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('pin', pin);
      bodyFormData.set('ride_id', ride_id);
      bodyFormData.set('token', token);

      const url = API + TICKETS_QUERY;
      const response = await axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      });
      this.setState({
        reservation: response.data,
        isLoading: false,
        isBooked: true
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadPin();
    this.getData();
    this.loadReservations();
  }

  storePin = (pin) => {
    localStorage.setItem("pin", pin);
  };

  loadPin = () => {
    const pin = localStorage.getItem("pin");
    this.setState({ pin: pin });
  };

  calculateSum = (total, num) => {
    return parseInt(total) + parseInt(num);
  };

  reduceToSingleDigit = (longNumber) => {
    const numberString = longNumber + "";
    const numberArray = numberString.split("");
    let sumOfDigits = numberArray.reduce(this.calculateSum);
    if (sumOfDigits > 9){
      sumOfDigits = this.reduceToSingleDigit(sumOfDigits);
    }
    return sumOfDigits;
  };

  calculateLetterCode = (numericalSequence) => {
    const weightedValues = [
      this.reduceToSingleDigit(numericalSequence[0] * 1),
      this.reduceToSingleDigit(numericalSequence[1] * 2),
      this.reduceToSingleDigit(numericalSequence[2] * 1),
      this.reduceToSingleDigit(numericalSequence[3] * 2),
    ];
    const sum = weightedValues.reduce(this.calculateSum);
    return sum % LETTERS_IN_ALPHABET + OFFSET_TO_ASCII;
  };

  calculateLetterFromSequence = (numericalSequence) => {
    const letterCode = this.calculateLetterCode(numericalSequence);
    return String.fromCharCode(letterCode);
  };

  isPinFormatValid = (pin) => {
    const isNotEmpty = pin.trim() !== "";
    const regexMatches = pin.match(PIN_REGEX);
    const isMatchingRegex = regexMatches !== null;
    const numbersAsCharacters = this.calculateLetterFromSequence(regexMatches[1]) + this.calculateLetterFromSequence(regexMatches[2]);
    const isSuffixValid = numbersAsCharacters === regexMatches[3];
    return isNotEmpty && isMatchingRegex && isSuffixValid;
  };

  isTimeValid = () => {
    const now = new Date();
    const hoursNow = now.getHours();
    return hoursNow > 9 && hoursNow < 19;
  };

  isTicketAvailable = () => {
    const rideId = this.state.selection;
    const chosenRide = this.state.data.filter(ride => ride.id === rideId);
    return chosenRide[0].remaining_tickets > 0;
  };

  isInputValid = () => {
    const pin = this.state.pin;
    const isPinValid = (typeof pin === "string") && this.isPinFormatValid(pin);
    const rideId = this.state.selection;
    const isSelectionValid = Number.isInteger(rideId) && rideId > -1;
    return isPinValid && isSelectionValid && this.isTimeValid() && this.isTicketAvailable();
  };

  selectionCallback = (newSelection) => {
    this.setState({
      selection: newSelection,
      timestamp: Date.now()
    });
  };

  pinChangeCallback = (newPin) => {
    this.setState({
      pin: newPin,
      timestamp: Date.now()
    });
  };

  submissionCallback = () => {
    if (!this.isInputValid()){
      return;
    }
    this.storePin(this.state.pin);
    this.storeReservations(this.state.data, this.state.userReservations, this.state.pin, this.state.selection);
    this.bookRide(this.state.pin, this.state.selection, TOKEN)
      .catch(error => console.log(error));
  };

  render() {
    if (!this.state.isLoading && (typeof this.state.data === "object") && (this.state.data.length > 0)) {
      if (!this.state.isBooked){
        return (
          <div>
            <h1>The Jungle Fast Rider Service</h1>
            <div>Instructions</div>
            <PinSection
              data={this.state.data}
              pin={this.state.pin}
              onChange={this.pinChangeCallback}
              submissionHandler={this.submissionCallback}
              timestamp={this.state.timestamp}
            />
            <Rides
              data={this.state.data}
              selection={this.state.selection}
              onChange={this.selectionCallback}
            />
          </div>
        )
      } else {
        return (
            <Reservation
              reservation={this.state.reservation}
            />
        )
      }

    } else {
      return null;
    }
  }

}

export default function App() {
  return (
    <div id="wrapper">
      <JungleTicketApp/>
    </div>
  )
}
