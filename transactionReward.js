class TransactionReward{
    constructor(sender,amount,signature){
        this.sender=sender
        this.signature=signature
        this.amount=amount
        this.bloc=null
    }
}
module.exports=TransactionReward