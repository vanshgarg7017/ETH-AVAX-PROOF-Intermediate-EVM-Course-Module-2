# ETH-AVAX-PROOF-Intermediate-EVM-Course-Module-2
This is a smart Contract in which I will connect our contract with frontend code.
# Description
In this function we create a functions increment, decrement and tansfer tokens one to another. we also connect our wallet with our frontend code.
We also create hardhat network using chain id for metamask and also import some accounts using the private keys.
after the code compile we will run url of this website and use buttons for deposit, withdraw, create, burn, tranfer tokens. 

```javascript
// Increment 
 function Tokenincrement() public {
        Token++;
    }
// Decrement
    function Tokendecrement() public {
        Token--;
    
    // transfer Tokens
      function transferTokens(address _to, uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(Token >= _amount, "Insufficient tokens");

        Token -= _amount;
        emit Transfer(msg.sender, _to, _amount);
    }

```
# ERC20 ATM
Our Atm provides many funtionalities:
1. Connect to MetaMask Wallet
2. Show Account Address
3. Deposit
4. withdraw
5. Increment tokens
6. Decrement
7. Transter tokens to other address

## Vs Code Setup
1. npm i - install node modules
2. npm hardhat node - this commands shows account address and private keys
3. npx hardhat run --network localhost scripts/deploy.js - For deploy the code
4. npm run dev - Launch the front-end
After this, the project will be running on your localhost. Typically at http://localhost:3000
  
## Technologies Used
- React - JavaScript library for building user interfaces
- Ethereum - Blockchain network for decentralized applications
- MetaMask - Wallet and gateway to Ethereum blockchain
- ethers.js - Library for interacting with Ethereum smart contracts

# Licence
This project is licensed under the MIT License - see the LICENSE.md file for details
# Video Walkthrough

https://www.loom.com/share/b72431124b96476bbfbeb3a183647b2b?sid=fe567c50-03b4-4f0a-ba1e-c7f4e164dcea
