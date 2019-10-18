class Global{
  constructor(){
    if(Global.instance){
      return Global.instance
    }
    else{
      this.game = {}
      this.w = 377
      this.h = 672
    }
  }
}

let global = new Global()
export default global