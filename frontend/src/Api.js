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

  static detect(source){
    let url = 'https://us-central1-ezchair-a4bc4.cloudfunctions.net/fireServer/detect'
    // let url = 'http://localhost:4000/detect'
    return Axios.post(url, {source})
  }
}

export default Api

