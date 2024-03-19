const fs = require("fs")
const BlockChain = require("../models/blockchain")
const Bloc = require("../models/bloc")
const Transaction = require("../models/transaction")
const TransactionReward = require("../models/transactionReward")
const load = async (path) => {
    //returns blockchain
    let data = await fs.promises.readFile(path)

    data = JSON.parse(data).blockchain

    const blockchain = new BlockChain(data.name, data.blockReward, data.difficuly,
        data.cyrptoFunction, data.proofStyle)

    data.blocs.forEach(element => {
        const transactionReward = new TransactionReward(element.transactionReward.sender,
            element.transactionReward.amount, element.transactionReward.signture)
        const transactions = element.transactions.map(tx => {
            return new Transaction(tx.sender, tx.receipient, tx.amount, tx.fees, tx.signture)
        })
        const bloc = new Bloc(element.peviousHash, element.nonce, element.height,
            element.hash, transactionReward, transactions)
        transactionReward.bloc = bloc
        transactions.forEach(tx => tx.bloc = bloc)

        bloc.previous = blockchain.lastBlock
        blockchain.lastBlock = bloc
    })
    return blockchain


}
load("../bd/blockchain_v1.json").then(res=>console.log(res));


/*
executing load function in terminal
cd services
node services.js
{
  blockchain: {
    name: 'eDH blockchain',
    blockReward: 50,
    difficuly: 8,
    cyrptoFunction: 'SHA-256',
    proofStyle: 'Proof Of Work',
    blocs: [ [Object], [Object] ]
  }
}
*/



const save = (blockchain, path) => {
    //blockcahin li baghe tsaver w lpath dyalha
    const data = {
        blockchain: {
            name: blockchain.name,
            blockReward: blockchain.blockReward,
            difficuly: blockchain.difficuly,
            cyrptoFunction: blockchain.cyrptoFunction,
            proofStyle: blockchain.proofStyle,
            blocs: []
        }
    }
    const tmpBlocs = []
    let tete = blockchain.lastBlock
    while (tete != null) {
        const bloc = {
            peviousHash: tete.previous,
            nonce: tete.nonce,
            height: tete.height,
            hash: tete.hash,
            transactionReward: {
                sender: tete.transactionReward.sender,
                amount: tete.transactionReward.amount,
                signature: tete.transactionReward.signature
            },
            transactions: tete.transactions.map(ele => {
                return {
                    sender: ele.sender,
                    receipient: ele.receipient,
                    amount: ele.amount,
                    fees: ele.fees,
                    signature: ele.signature
                }
            })
        }
        tmpBlocs.push(bloc)
        tete = tete.previous
    }
    data.blockchain.blocs = tmpBlocs.reverse()
    fs.writeFile(path, JSON.stringify(data), (err) => {// data ??
        if (err)
            console.log("eerreur ecriture du fichier")
    });
}
const getSolde =async (address) => {
    //returns amount of coins (float)
    let solde = 0;
    let loadBlockchain=load('../bd/blockcchain_V1.json')
    let teteBlock=blockchain.lastBlock
    while(teteBlock!=null){
        let isMiner=teteBlock.transactionReward.sender
        if(address=isMiner)//if tete= minner
        {
            solde+=teteBlock.transactionReward.amount
            //kena n9edrou ndirou ssolde+=blocchain.blocReard nishan kun kan blockreward ghaykun fixe mais hna khdamin dynamique kula 4 ans kaytbedel blockreward kima bitcoin
            teteBlock.transactions.forEach(tx=>{
                if(isMiner) //minner
                solde+=parseFloattx.fees
                if(tx.receipient==address)//receipient
                solde+=tx.amount
                if(tx.sender==address)
                solde-=(tx.amount+tx.fees)
            })
            teteBlock=teteBlock.previous
        }
        return solde

    }
}
const verifierTransaction =async (transaction) => {
    //returs true or flase
    //we should verify:
    //formalite+signature+solde

    //forme:ex:sender=>not null et represenete une clef public

    if (transaction.sender=="" || transaction.receipient=="" ||transaction.amount<0 || transaction.fees<=0 || transaction.signature==""){
        return {
            valid:false,
            error:'format incorrecte'
        }
    }
    //signature
    let data=transaction.sender+transaction.amount+transaction.receipient+transaction.fees
    let validSignature=verifyCustom(data,transaction.sender,transaction.signature)
    if(!validSignature){
        return {
                valid:false,
                error:'invalid signature'
            }
    }
    //solde
    let solde =await getSolde(transaction.sender)
    if(solde<transaction.amount+transaction.fees){
        return {
            valid:false,
            error:'Pas de solde'
        }
    }
    return  {
        valid:true
    }

}
const verifierBloc = (bloc) => {
    //returs true or flase
}
const ajouterBloc = (blockchain, bloc) => {
    //returs true or flase
}
const verifierBlockchain = (blockchain) => {
    //returs true or flase
}
module.exports = {
    load,
    save,
    solde,
    verifierBloc,
    verifierBlockchain,
    verifierTransaction,
    ajouterBloc
}
