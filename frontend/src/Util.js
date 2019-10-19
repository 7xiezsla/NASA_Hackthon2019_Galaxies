class Util{
  static getUserPostion(){
    return new Promise((resolve, reject)=>{
      try{      
        navigator.geolocation.getCurrentPosition((pos)=>{
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          })
        })
      }
      catch(e){
        reject({
          latitude:25.0256561,
          longitude: 121.5265531
        })
      }
    })
  }
}

export default Util