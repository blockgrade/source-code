import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './contractJson/GradeRegistry.json';
import './App.css';

import Register from './components/Register';
import GradeDocuments from './components/GradeDocuments';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState('Not connected');

  useEffect(() => {
    const template = async () => {
      const contractAddress = '0x4Acd9fE7306ab717746578c1a85A751827F2c992';
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log('Ethereum object not found, install Metamask.');
          return;
        }

        const account = await ethereum.request({
          method: 'eth_requestAccounts'
        });
        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        });
        setAccount(account);

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setState({ provider, signer, contract });
      } catch(error) {
        if (error.message.includes('User denied transaction')) {
          alert('Transaction was denied by the user.');
        } else {
          console.error('App :: useEffect() :: Error:', error);
          alert('An unexpected error occurred. Please check your connection.');
        }
      }
    };
    template();
  }, []);
  return (
    <>
      <div className='App'>
        Connected account: {account} 
        <Register state={state}></Register>
        <GradeDocuments state={state}></GradeDocuments>
      </div>
    </>
  )
}

export default App
