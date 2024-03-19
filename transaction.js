class transaction{
    constructor(sender,receipient,amount,fees,signature){
        this.bloc=null //bloc kayji 9bel transaction w endou 3qla9a meaha ha elash dernahhna les relts bin les class haka kayt9adou ya kayji elt haka meaha f constructor wla class t heriter men loukhra...
        this.sender=sender
        this.receipient=receipient
        this.amount=amount
        this.fees=fees
        this.signature=signature
    }
}
module.exports=transaction