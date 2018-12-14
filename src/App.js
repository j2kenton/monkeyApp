import React, { Component } from 'react';
import PinSection from './components/pinSection';
import Rides from './components/rides';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const API = "http://fast-rider.herokuapp.com/api/v1/";
const DEFAULT_QUERY = "rides";
const TICKETS_QUERY = "tickets";
const TOKEN_BIT = "?token=";
const TOKEN = "2313ffa865947d1909fe39933259051c29a9ef0740";

class JungleTicketApp extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      isBooked: false,
      error: null,
      selection: 0,
      pin: "JN-0000-1111-AG",
      code: "",
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
        code: response.data,
        isLoading: false,
        isBooked: true
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
      this.setState({
        code: "",
        isLoading: false,
        isBooked: true
      });
    }
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getData();
  }

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
    this.bookRide(this.state.pin, this.state.selection, TOKEN);
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
          <div>
            <h1>The Jungle Fast Rider Service</h1>
            <div>Instructions</div>
            <div>{this.state.code}</div>
            {/*<Rides*/}
              {/*data={this.state.data}*/}
              {/*index={this.state.selection}*/}
              {/*onChange={this.selectionCallback}*/}
            {/*/>*/}
          </div>
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
