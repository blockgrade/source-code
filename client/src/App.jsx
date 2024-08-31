import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './contractJson/GradeRegistry.json';
import './App.css';

import {GatewayProvider, useGateway,IdentityButton} from "@civic/ethereum-gateway-react";

import Register from './components/Register';
import GradeDocuments from './components/GradeDocuments';

function App() {
  const [state, setState] = useState({ provider: null, signer: null, contract: null });
  const [account, setAccount] = useState('Not connected');
  const gatekeeperNetwork = 'ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6';
  const { requestGatewayToken } = useGateway();
  const { gatewayStatus, gatewayToken } = useGateway();

  useEffect(() => {
    const template = async () => {
      const contractAddress = '0xedfCD0Fe13529Bb9093029a409E827eba1b15Bce';
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log('Ethereum object not found, install Metamask.');
          return;
        }

        const account = await ethereum.request({ method: 'eth_requestAccounts' });
        window.ethereum.on('accountsChanged', () => window.location.reload());
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

  // TODO: compreender melhor a forma correta de retornar o objeto dessa função
  const useWallet = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    console.log('resultado final', {address: account, signer: signer});
    return { address: account, signer: signer };
  }

  return (
    <>
      <div className='App'>
      <GatewayProvider
      wallet={useWallet()}
      gatekeeperNetwork={gatekeeperNetwork}>
        <button onclick={requestGatewayToken}>Civic Pass</button>
        <IdentityButton />
        Connected account: {account} 
        <Register state={state}></Register>
        <GradeDocuments state={state}></GradeDocuments>
      </GatewayProvider>
      </div>
    </>
  )
}

export default App
