import React, { Component } from 'react';
import PinSection from './components/pinSection';
import Rides from './components/rides';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const API = "http://fast-rider.herokuapp.com/api/v1/";
const DEFAULT_QUERY = "rides";
const TOKEN_BIT = "?token=";
const TOKEN = "2313ffa865947d1909fe39933259051c29a9ef0740";

class MovieSlider extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: null,
      position: 0,
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

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getData();
  }

  positionCallback = (newPosition) => {
    this.setState({
      position: newPosition,
      timestamp: Date.now()
    });
  };

  render() {
    if (!this.state.isLoading && (typeof this.state.data === "object") && (this.state.data.length > 0)) {
      return (
        <div>
          <h1>The Jungle Fast Rider Service</h1>
          <div>Instructions</div>
          <PinSection
            data={this.state.data}
            index={this.state.position}
            onChange={this.positionCallback}
            timestamp={this.state.timestamp}
          />
          <Rides
            data={this.state.data}
            index={this.state.position}
            onChange={this.positionCallback}
          />
        </div>
      )
    } else {
      return null;
    }
  }

}

export default function App() {
  return (
    <div id="wrapper">
      <MovieSlider/>
    </div>
  )
}
