class Bloc{
    constructor(previousHash,nonce,height,hash,transactionReward,transactions,previous){//zedna TransactionReward hit endena relt 1 1 meaha w zedna transactions hit endena relt 1 plusieurs mea transaction(zedna s het endena bzaf d transactions(20) hadi convention)
        //previous c'est le pointeur d'un bloc sur l'autre
        this.previousHash=previousHash
        this.nonce=nonce
        this.height=height
        this.hash=hash
        this.transactionReward=transactionReward
        this.transactions=transactions
        this.previous=previous
}
}
module.exports=Bloc;