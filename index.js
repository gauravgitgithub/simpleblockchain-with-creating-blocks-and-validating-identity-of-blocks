//Idea of creating basic blocks and how blocks can't be changed
const SHA256 = require('crypto-js/sha256'); //SHA256 Algo for encryption

class Block{
    constructor(index, timestamp, value, previousHash = '' ){
        this.index = index,
        this.timestamp =timestamp,
        this.value = value,
        this.previousHash = previousHash, //storing values for previous Hash to link them with one another
        this.currentHash = this.calculateHash() //Current hash value to link them to another new block as their previousHash
    }


    calculateHash(){ //Calculating Hash
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.value)).toString();
    }
}


class InitializeBlockchain{ //Initialize our chain
    constructor(){
        this.chain = [this.createGenesisBlock()]; //list of blocks
    }

    createGenesisBlock(){
        return new Block(0, '24/1/2019', '24', '0000'); //the first block is called Genesis block , add some initial data
    }

    returnLatestBlock(){
        return this.chain[this.chain.length-1]; //this method will return the last block added
    }

    addBlock(newBlock){ //add a new block to chain
        newBlock.previousHash = this.returnLatestBlock().currentHash; //getting hash of previous block from above function
        newBlock.currentHash = newBlock.calculateHash(); //calling calculateHash() function to calculate Hash
        this.chain.push(newBlock); //this will add the block to chain list

    }

    checkIdentity(){
        for(let i=1; i < this.chain.length; i++){
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if(currBlock.currentHash !== currBlock.calculateHash()){ //checks whether currentHash matches ?
                return 'No';
            }

            if(currBlock.previousHash !== prevBlock.currentHash){ //checks with the hash of previous one
                return 'No';
            }

        }
        return 'Yes';
    }
}

let sample =new InitializeBlockchain(); //Initializing our Blockchain
sample.addBlock(new Block(1, '24/2/2019', {amount : 34}));  //adding block
sample.addBlock(new Block(2, '26/2/2019', {amount : 3}));   //adding block
sample.addBlock(new Block(3, '27/2/2019', {amount : 3}));   //adding block
sample.addBlock(new Block(4, '28/2/2019', {amount : 3}));   //adding block


console.log(JSON.stringify(sample, null , 4)); //getting result in console
console.log('Is Chain Identical ? = '+sample.checkIdentity());  //Checking whether our chain is identical or not
sample.chain[1].value = { amount : 100 }; //updating value field
console.log(JSON.stringify(sample, null , 4)); //getting result in console

console.log('Is Chain Identical ? = '+sample.checkIdentity());  //Checking whether our chain is identical or not
//return No because we are trying to change the value field and it will lead to create a new currentHash for that block and the
// hence, the block link will be broken