import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Global from '../../Global'

import museumIcon from './museum.png'
import nationParkIcon from './NationPark.png'
import schoolIcon from './school.png'
import girlIcon from './girl.png'

const iconMapping = {
  'PM' : museumIcon,
  'GM' : museumIcon,
  'MNS' : museumIcon,
  'National_Park' : nationParkIcon,
  'school' : schoolIcon
}

const AnyReactComponent = ({text, img}) => {
   return (
    <div>
     <img src={img} style={{width:'30px'}}></img>
    </div>
  )};

class SimpleMap extends Component {

  constructor(props){
    super(props)

    this.state ={
        lat: Global.pos.latitude,
        lng: Global.pos.longitude
    }

    this.updateUserPosition = this.updateUserPosition.bind(this)

    this.interval = setInterval(this.updateUserPosition,1000)
  }

  updateUserPosition(){

    this.setState({
      lat:Global.pos.latitude,
      lng:Global.pos.longitude
    })
  }

  render() {
    console.log('user.pos', this.state)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCTDAI9Brud2mks7f9_wPUklccstP39M4E' }}
          defaultCenter={this.state.user}
          defaultZoom={17}
          options={{ zoomControl: false,fullscreenControl:false,draggable:false}}
          center ={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
        >
          {
            Global.landmarks.map((d)=>{
              return( 
                <AnyReactComponent
                  key = {d.name}
                  lat={d.lat}
                  lng={d.lng}
                  text={d.name}
                  img={iconMapping[d.type]}
                />
              )
            })
          }

          <AnyReactComponent
            lat={this.state.lat}
            lng={this.state.lng}
            img={girlIcon}
          />

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;