import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Demographic from './components/Demographic/Demographic'
import './App.css';

const PARTICLES_OPTIONS = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageURL: '',
  results: '',
  box: '',
  route: 'signin',
  isSignedIn: false,
  user: null
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ 
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (response) => {
    const box = response.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      leftCol: box.left_col * 100 + "%",
      topRow: box.top_row * 100 + "%",
      rightCol: (1 - box.right_col) * 100 + "%",
      bottomRow: (1 - box.bottom_row) * 100 + "%"
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  displayResults = (response) => {
    this.setState({ results: response.outputs[0].data.regions[0].data.face });
  }

  onChange = (event) => {
    this.setState({ input: event.target.value })
  }

  fetchApi = (inputUrl) => {
    return fetch('https://arcane-island-38870.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: inputUrl
        })
      })
      .then(response => response.json());
  }

  fetchSubmitImage = (userId) => {
    return fetch('https://arcane-island-38870.herokuapp.com/image', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId
        })
      })
      .then(resp => resp.json());
  }

  onSubmitImage = () => {
    this.setState({ imageURL: this.state.input });
      this.fetchApi(this.state.input)
      .then(response => {
        if(response) {
          this.fetchSubmitImage(this.state.user.id)
          .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
          .catch(console.log);
          this.displayResults(response);
          this.displayFaceBox(this.calculateFaceLocation(response));
        }
      })
      .catch(err => console.err(err.statusText));
  }

  onRouteChange = route => {
    if(route === 'signout') {
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  stateHandler = (state) => {
    switch(state) {
      case 'home':
        return (
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onChange={this.onChange} onSubmit={this.onSubmitImage}/>
            <Demographic results={this.state.results} box={this.state.box} imageURL={this.state.imageURL}/>
          </div>
        );
      case 'signout':
      case 'signin':
        return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
      case 'register':
        return <Register onRouteChange={this.onRouteChange}/>;
      default:
        return <Signin onRouteChange={this.onRouteChange}/>;
    }
  }

  render() {
    const { isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={PARTICLES_OPTIONS} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {this.stateHandler(route)} 
      </div>
    );
  }
}

export default App;
