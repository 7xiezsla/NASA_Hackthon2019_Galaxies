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
      user:{
        lat: Global.pos.latitude,
        lng: Global.pos.longtitude
      }
    }

    this.updateUserPosition = this.updateUserPosition.bind(this)

    // this.interval = setInterval(this.updateUserPosition,1000)
  }

  updateUserPosition(){
    let user = {
      lat: Global.pos.latitude,
      lng: Global.pos.longtitude
    }
    this.setState(user)
  }

  static defaultProps = {
    center: {
      lat: 25.0169638,
      lng: 121.2261784
    },
    zoom: 11
  };

  render() {
    console.log(this.state.user)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCTDAI9Brud2mks7f9_wPUklccstP39M4E' }}
          defaultCenter={this.state.user}
          defaultZoom={8}
          options={{ zoomControl: false,fullscreenControl:false,draggable:false}}
          center ={{
            lat: 25.0070989,
            lng: 121.5217335
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

          {/* <AnyReactComponent 
            // lat={this.state.user.lat}
            // lng={this.state.user.lng}
            lat={124}
            lng={25}
            text={123}
            img={girlIcon}
          /> */}

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;