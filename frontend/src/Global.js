import reward1 from './components/reward/reward1.jpg'
import reward2 from './components/reward/reward2.jpg'
import reward3 from './components/reward/reward3.jpg'
import reward4 from './components/reward/reward4.jpg'
import reward5 from './components/reward/reward5.jpg'
import reward6 from './components/reward/reward6.jpg'
import reward7 from './components/reward/reward7.jpg'
import reward8 from './components/reward/reward8.jpg'
import reward9 from './components/reward/reward9.jpg'

import userPhoto from './components/source/userPic.png'
import person1 from './components/source/p1.png'
import person2 from './components/source/p2.png'

class Global{
  constructor(){
    if(Global.instance){
      return Global.instance
    }
    else{
      this.game = {}
      this.w = 377
      this.h = 672
      this.pos = {
        latitude: 25.0292998,
        longitude: 121.5030736
      }
      this.userRewards = []
      this.userScore = 0

      this.user = {
        name : '地方媽媽',
        photo : userPhoto,
        score : 0,
        rewards: [],
        friends:[
          {
            name: '地方媽媽的媽媽',
            photo: person1,
            score: 310
          },
          {
            name: '張家睿',
            photo: person2,
            score: 120
          }
        ]
      }

      this.rewards = [
        reward1, reward2, reward3, reward4, reward5, reward6, reward7, reward8, reward9
      ]

      this.landmarks = [
        {name:'私立育才國小',	lat:25.0070989,	lng:121.5217335,	type:'school'},
        {name:'私立聖心國小',	lat:25.1344344,	lng:121.4504758,	type:'school'},
        {name:'私立及人國小',	lat:25.0156474,	lng:121.5120048,	type:'school'},
        {name:'私立竹林國小',	lat:25.0144112,	lng:121.5173613,	type:'school'},
        {name:'私立信賢種籽親子實小',	lat:24.838942, lng:121.52862,	type:'school'},
        {name:'市立北大國小',	lat:24.9394654,	lng:121.3735299,	type:'school'},
        {name:'市立新林國小',	lat:25.0696631,	lng:121.3595654,	type:'school'},
        {name:'小門地質館',	lat:23.6538831, lng:119.51725, type:'GM'},
        {name:'國立臺灣科學教育館',	lat:25.0961275, lng:121.5166874, type:'MNS'},
        {name:'國立自然科學博物館',	lat:24.1572335, lng:120.6660606, type:'MNS'},
        {name:'太魯閣國家公園',	lat:24.1938752, lng:121.4907536, type:'National_Park'},
        {name:'雪霸國家公園',	lat:24.5631665, lng:120.8185385, type:'National_Park'},
        {name:'金門國家公園',	lat:24.4441231, lng:118.3520516, type:'National_Park'},
        {name:'墾丁國家公園',	lat:21.5848, lng:120.4749, type:'National_Park'},
        {name:'國立臺灣師範大學',	lat:25.0259126, lng:121.5283135,	type:'school'}
      ]
      
    }
  }
}

let global = new Global()
export default global