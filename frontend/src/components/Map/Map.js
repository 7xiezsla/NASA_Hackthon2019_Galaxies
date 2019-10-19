import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const data = [
  {name:'私立育才國小',	lat:25.0070989,	lng:121.5217335,	type:'school'},
  {name:'私立聖心國小',	lat:25.1344344,	lng:121.4504758,	type:'school'},
  {name:'私立及人國小',	lat:25.0156474,	lng:121.5120048,	type:'school'},
  {name:'私立竹林國小',	lat:25.0144112,	lng:121.5173613,	type:'school'},
  {name:'私立信賢種籽親子實小',	lat:24.838942, lng:121.52862,	type:'school'},
  {name:'市立北大國小',	lat:24.9394654,	lng:121.3735299,	type:'school'},
  {name:'市立新林國小',	lat:25.0696631,	lng:121.3595654,	type:'school'}
]

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.0169638,
      lng: 121.2261784
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCTDAI9Brud2mks7f9_wPUklccstP39M4E' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center ={{
            lat: 25.0070989,
            lng: 121.5217335
          }}
        >
          {
            data.map((d)=>{
              return( 
                <AnyReactComponent
                  key = {d.name}
                  lat={d.lat}
                  lng={d.lng}
                  text={d.name}
                />

                // <div lat={d.lat} lng={d.lng} key={d.text}>
                //   {d.text}
                // </div>
              )
            })
          }

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;