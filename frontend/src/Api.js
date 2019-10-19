import Axios from 'axios'

class Api{
  static register(user){

  }

  static login(user){

  }

  static fetchEnvironment(lat, lng){
    return Axios.get(`http://sealchang.asia/nasa/environment?longitude=${lng}&latitude=${lat}`)
    .then((res)=> res.data)
  }
}

export default Api

