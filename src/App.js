import React, { Component } from 'react';
import PinSection from './components/pinSection';
import ErrorSection from './components/errorSection';
import Rides from './components/rides';
import Reservation from './components/reservation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import InfoItem from "./components/infoItem";

const API = "http://fast-rider.herokuapp.com/api/v1/";
const DEFAULT_QUERY = "rides";
const TICKETS_QUERY = "tickets";
const TOKEN_BIT = "?token=";
const TOKEN = "2313ffa865947d1909fe39933259051c29a9ef0740";
const PIN_REGEX = /^JN-([0-9]{4})-([0-9]{4})-([A-Z]{2})$/;
const LETTERS_IN_ALPHABET = 26;
const OFFSET_TO_ASCII = 65;

const INVALID_TIME_MSG = "Tickets only available between 9 a.m. and 7 p.m. Please come back later.";
const HAS_TICKET_MSG = "Sorry. You already hold a valid ticket. You'll have to wait.";
const INVALID_PIN_MSG = "Please check the pin and try again.";
const INVALID_SELECTION_MSG = "Please select a ride.";

class JungleTicketApp extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      isBooked: false,
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
    const returnTime = chosenRide[0].return_time;
    const timestamp = new Date(returnTime).getTime();
    userReservations[pin] = timestamp;
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
    if (!regexMatches){
      return false;
    }
    const numbersAsCharacters = this.calculateLetterFromSequence(regexMatches[1]) + this.calculateLetterFromSequence(regexMatches[2]);
    const isSuffixValid = numbersAsCharacters === regexMatches[3];
    return isNotEmpty && isSuffixValid;
  };

  isTimeValid = () => {
    const now = new Date();
    const hoursNow = now.getHours();
    return hoursNow >= 9 && hoursNow < 19;
  };

  isTicketAvailable = (selection) => {
    const rideId = selection;
    const chosenRide = this.state.data.filter(ride => ride.id === rideId);
    return chosenRide[0].remaining_tickets > 0;
  };

  isUserWithoutTicket = (pin) => {
    const userLastTicketTime = this.state.userReservations[pin];
    if (typeof userLastTicketTime == "undefined"){ // eslint-disable-line
      return true;
    }
    const now = new Date();
    const timestampNow = now.getTime();
    return timestampNow > userLastTicketTime;
  };

  isPinValid = (pin) => {
    return (typeof pin === "string") && this.isPinFormatValid(pin);
  };

  isSelectionValid = (rideId) => {
    return Number.isInteger(rideId) && (rideId > -1) && this.isTicketAvailable(rideId);
  };

  checkInputValid = () => {
    let isInputValid = true;
    let errorMsg = "";
    if (!this.isTimeValid()){
      isInputValid = false;
      errorMsg = INVALID_TIME_MSG;
    } else if (!this.isUserWithoutTicket(this.state.pin)){
      isInputValid = false;
      errorMsg = HAS_TICKET_MSG;
    } else if (!this.isPinValid(this.state.pin)){
      isInputValid = false;
      errorMsg = INVALID_PIN_MSG;
    } else if (!this.isSelectionValid(this.state.selection)){
      isInputValid = false;
      errorMsg = INVALID_SELECTION_MSG;
    }
    return {isInputValid, errorMsg};
  };

  selectionCallback = (newSelection) => {
    if (this.isTicketAvailable(newSelection)){
      this.setState({
        selection: newSelection,
        timestamp: Date.now()
      });
    }
  };

  pinChangeCallback = (newPin) => {
    this.setState({
      pin: newPin,
      timestamp: Date.now()
    });
  };

  submissionCallback = () => {
    const inputStatus = this.checkInputValid();
    if (!inputStatus.isInputValid){
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
        const inputStatus = this.checkInputValid();
        const infoMsg = "asf";
        const info = [
          {
            msg: "Enter your park ticket #PIN number, then select the desired ride while noting the stated return time",
            icon: "ico-01.png"
          },
          {
            msg: "Press 'submit' to confirm and retrieve your access code",
            icon: "ico-02.png"
          },
          {
            msg: "When the time comes, use the special FastRider line to cut out a considerable wait time",
            icon: "ico-03.png"
          }
        ];
        return (
          <div className="container">
              <h1>The Jungle&trade; FastRider Service</h1>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <InfoItem
                  infoMsg={info[0].msg}
                  infoIcon={info[0].icon}
                />
              </div>
              <div className="col-sm-12 col-md-4">
                <InfoItem
                  infoMsg={info[1].msg}
                  infoIcon={info[1].icon}
                />
              </div>
              <div className="col-sm-12 col-md-4">
                <InfoItem
                  infoMsg={info[2].msg}
                  infoIcon={info[2].icon}
                />
              </div>
            </div>
            <PinSection
              data={this.state.data}
              pin={this.state.pin}
                onChange={this.pinChangeCallback}
                submissionHandler={this.submissionCallback}
                timestamp={this.state.timestamp}
                isInputValid={inputStatus.isInputValid}
              />
              <ErrorSection
                errorMsg={inputStatus.errorMsg}
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
