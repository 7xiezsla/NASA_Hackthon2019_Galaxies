import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Global from '../../Global'
import Api from '../../Api'

import fetchGarbageIcon from './fetchGarbage.png'
import rectangleIcon from './rectangle.png'
import friendRankIcon from './friendRank.png'
import profileIcon from './profile.png'

import museumIcon from './museum.png'
import nationParkIcon from './NationPark.png'
import schoolIcon from './school.png'
import girlIcon from './girl.png'
import trashIcon from './trash.png'
// import greenCircleIcon from './greenCircle.png'
// import redCircleIcon from './redCircle.png'

// import  measureData from './data.json'

const iconMapping = {
  'PM' : museumIcon,
  'GM' : museumIcon,
  'MNS' : museumIcon,
  'National_Park' : nationParkIcon,
  'school' : schoolIcon
}

const AnyReactComponent = ({text, img, env}) => {
    let style ={width:'30px'}
    if(env){
      style.width = '1000px'
    }
   return (
    <div>
     <img src={img} style={style}></img>
    </div>
  )};

class SimpleMap extends Component {

  constructor(props){
    super(props)

    this.state ={
        lat: Global.pos.latitude,
        lng: Global.pos.longitude
    }

    this.updateEnv = this.updateEnv.bind(this)
    this.updateUserPosition = this.updateUserPosition.bind(this)

    this.interval = setInterval(this.updateUserPosition,1000)
    this.interval2 = setInterval(this.updateEnv, 60000)
  }

  async updateEnv(){
    // console.log('update ENV')
    let data = await Api.fetchEnvironment(Global.pos.latitude, Global.pos.longitude)

    this.setState({
      TEMP: data.TEMP,
      WDSD: data.WDSD,
      H_UVI: data.H_UVI,
      HUMD: data.HUMD,
      PRES: data.PRES,
      GIS: data.GIS,
      GIS_Level: data.GIS_Level
    })
    
  }



  updateUserPosition(){

    this.setState({
      lat:Global.pos.latitude,
      lng:Global.pos.longitude
    })
  }

  render() {

    var circleStyle = {
      padding:10,
      margin:20,
      display:"inline-block",
      backgroundColor: 'red',
      borderRadius: "50%",
      width:100,
      height:100,
    };

    // console.log('user.pos', this.state)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCTDAI9Brud2mks7f9_wPUklccstP39M4E' }}
          defaultCenter={this.state.user}
          defaultZoom={17} //17
          options={{ zoomControl: false,fullscreenControl:false,draggable:false}}
          center ={{
            lat: this.state.lat - 0.0008,
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

          {
            Global.user.garbageTags.map((d, index)=>{     
              return( 
                <AnyReactComponent
                  key = {`trash${index}`}
                  lat={d.lat}
                  lng={d.lng}
                  img={trashIcon}
                />
              )
            })
          }
          {/* {
            measureData.map((data, index)=>{
              return (
                <AnyReactComponent 
                  key={`measure${index}`}
                  lat={parseFloat(data.latitude) + 0.0031 }
                  lng={parseFloat(data.longitude) - 0.001 }
                  img={data.dangerous ? redCircleIcon : greenCircleIcon}
                  env={true}
                />
              )
            })
          } */}
          <AnyReactComponent
            lat={this.state.lat}
            lng={this.state.lng}
            img={girlIcon}
          />

          <AnyReactComponent
            style={circleStyle}
            lat={this.state.lat}
            lng={this.state.lng}
          />

        </GoogleMapReact>

        <div style={{
          position:'absolute',
          top:'0',
          left:'1%',
          fontSize: '1.5vh'
        }}>
          溫度: {this.state.TEMP}       <br />
          濕度: {this.state.HUMD}       <br />
          風速: {this.state.WDSD}       <br />
          空氣品質指標: {this.state.GIS}  <br />
          紫外線指數: {this.state.H_UVI}  <br />
        </div>
        <div style={{
          position:'absolute',
          top:'80%',
          width:'100%',
          height:'20%',
          backgroundColor:'#DCDCDC'
        }}>
        </div>

        <img style={{
          position:'absolute',
          top:'67%',
          left:'35%',
          width:'110px'
        }}
          src={fetchGarbageIcon} 
          onClick={()=>{
            this.props.actions('showCamera', true)
            this.props.actions('showMap', false)
          }}
        />

        <img style={{
          position:'absolute',
          top:'87%',
          left:'68%',
          zIndex:0.8
        }}
          src={rectangleIcon}
        />

        <img style={{
          position:'absolute',
          top:'88%',
          left:'73%',
          width:'40px',
          zIndex:1
        }} 
          src={friendRankIcon}
          onClick={()=>this.props.actions('showFriendRank', true)}
        />

        <img style={{
          position:'absolute',
          top:'88%',
          left:'86%',
          width:'40px',
          zIndex:1,
        }}
          src={profileIcon}
          onClick={()=>this.props.actions('showCollection', true)}
        />

        <img style={{
          position:'absolute',
          top:'83%',
          left:'5%',
          width:'50px'
        }}
          src={Global.user.photo}
        />


        <div style={{
          position:'absolute',
          left:'22%',
          top:'85%'
        }}>
          {Global.user.name}
        </div>

        <div style={{
          position:'absolute',
          left:'8%',
          top:'93%'
        }}>
          {`積分值：${Global.user.score}`}
        </div>

      </div>
    );
  }
}

export default SimpleMap;