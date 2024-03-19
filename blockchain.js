class Blockchain{
    constructor(name,blockReward,difficulty,cryptoFunction,prooftyle){
        this.name=name
        this.blockReward=blockReward
        this.difficulty=difficulty
        this.cryptoFunction=cryptoFunction
        this.prooftyle=prooftyle
        this.lastBlock=null//relation entre blockchain et block
    }
}
module.exports=Blockchain