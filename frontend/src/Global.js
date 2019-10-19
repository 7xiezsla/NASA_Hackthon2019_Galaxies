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
        latitude: 121.5030736,
        longtitude: 25.0292998
      }

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
        {name:'墾丁國家公園',	lat:21.5848, lng:120.4749, type:'National_Park'}
      ]
      
    }
  }
}

let global = new Global()
export default global