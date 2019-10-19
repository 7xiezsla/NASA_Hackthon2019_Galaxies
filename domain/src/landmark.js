const Coordinate = require('./coordinate')

// library, coordinate
class Landmark {
    constructor() {
        this.name = ''
        this.coordinate = new Coordinate()

        this.type = ''

        // 看要不要給這個地標一個照片
        this.photo = ''

        // 解鎖這個地點的獎勵
        this.reward = ''
    }
}

module.exports = Landmark