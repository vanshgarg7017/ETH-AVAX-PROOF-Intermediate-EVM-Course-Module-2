import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [Token, setToken] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transactionSuccess, setTransactionSuccess] = useState(false);

 
  const increment = async () => {
    if (atm && account) {
      try {
        const tx = await atm.increment();
        await tx.wait();
        getToken();
      } catch (error) {
        console.error("Error incrementing:", error);
      }
    }
  };

  const decrement = async () => {
    if (atm && account) {
      try {
        const tx = await atm.decrement();
        await tx.wait();
        getToken();
      } catch (error) {
        console.error("Error decrementing:", error);
      }
    }
  };
  const transferTokens = async () => {
    if (atm && account && recipientAddress && transferAmount) {
      try {
        const tx = await atm.transferTokens(recipientAddress, parseInt(transferAmount));
        await tx.wait();
        getToken();
        setTransactionSuccess(true); 
      } catch (error) {
        console.error("Error transferring tokens:", error);
      }
    }
  };
  const getToken = async () => {
    if (atm && account) {
      const TokenValue = await atm.Token();
      setToken(TokenValue.toNumber());
    }
  };

  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccount(accounts);
      });
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({method: "eth_accounts"});
      handleAccount(accounts);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  
  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }


    return (
      <>
        <div className="account-info">
        <p>Your Account: {account}</p>
      <p>Your Balance: {balance}</p>
  
          <button style={{ backgroundColor: "#cyan" }} onClick={deposit}>
            Deposit 1 ETH
          </button>
          <button  onClick={withdraw}>
            Withdraw 1 ETH
          </button>
        </div>

        {/* Buttons to increment and decrement the Token */}
      <div className="token-buttons">
        <h1>ERC20 ATM</h1>
        <p style={{ fontFamily: "Sans-serif" }}>Your Total Token: {Token}</p>
        <button  className="create-token" onClick={increment}>
          Create Token
        </button>
        <button className="burn-token" onClick={decrement}>
          Burn Token
        </button>
      </div>
      <div>
        <h2>Token Transfer</h2>
        <input
          type="text"
          placeholder="Recipient's Ethereum address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Transfer amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button onClick={transferTokens}>Transfer Tokens</button>
        {transactionSuccess && (
  <p style={{ color: "green", fontWeight: "bold" }}>Your transaction is successful!</p>
)}
      </div>
      </>
    );
    
  }

  useEffect(() => {
    getWallet();
    getToken(); 
  }, []);

  return (
    <main className="container">
    <header className="header">
      <h1>Welcome to the MetaCrafter ATM</h1>
    </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
        
      `}
      </style>
    </main>
  )
}