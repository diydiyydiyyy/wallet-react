
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { weiToEther } from '../utils';
import abi from "../json/abi.json";

function CheckContract() {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<any>();
  const contractAddress = "0x23318730bf3F2B54eACA75b81BD3648f613F0774";

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        setLoading(true);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await web3Provider.listAccounts();
          setAddress(accounts[0]);
          const userBalance = await web3Provider.getBalance(accounts[0]);
          setBalance(weiToEther(userBalance));

        //   const contractABI = abi?.find((item: any) => item.name === 'balanceOf' && item.type === 'function');
        //   const bal = [`${contractABI?.type} ${contractABI?.name}(${contractABI?.inputs?.[0]?.type}) ${contractABI?.stateMutability} returns (${contractABI?.outputs?.[0]?.type})`]
          
        //   console.log("bal", bal);
          

          const signer = await web3Provider.getSigner();
          const newContract = new ethers.Contract(contractAddress, abi, signer);
          setContract(newContract);

          console.log("newContract", newContract);
          

        } catch (error) {
          console.error('Error connecting to Metamask:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('Metamask not detected!');
      }
    };

    initProvider();
  }, []); 

  useEffect(() => {
    const fetchContractBalance = async () => {
      if (contract) {
        const balance = await contract?.balanceOf(address);
        console.log("balance", balance);
        
      }
    };

    fetchContractBalance();
  }, [contract]);
  
  
  
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-900 gap-4'>
      <h1 className='text-yellow-50 text-5xl'>Hi. 🧍‍♀️</h1>
        
    </div>
  )
}

export default CheckContract;
