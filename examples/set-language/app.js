import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

export default class App extends Component {

  state = {
    viewport: {
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }
  };

  _onLoad(event) {
    const map = event.target;
    map.setLayoutProperty('country-label-lg', 'text-field', ['get', 'name_zh'])
  }

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={viewport => this.setState({viewport})}
        onLoad={this._onLoad} />
    );
  }

}

render(<App/>, document.getElementById('map'));
