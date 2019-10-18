const Coordinate = require('./coordinate')
class User {
    constructor() {
        this.account = ''
        this.password = ''
        this.name = ''
        this.sex = ''
        this.age = ''
        this.relation = []
        this.score = 0
        this.coordinate = new Coordinate()
    }
}

module.exports = User