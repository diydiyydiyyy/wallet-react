
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { weiToEther } from '../utils';
import { Link } from 'react-router-dom';

function Home() {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [chainId, setChainId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        setLoading(true);
        try {
          // Request untuk mengaktifkan akun Metamask
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Menginisialisasi provider menggunakan Metamask
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

          // Mendapatkan alamat pengguna
          const accounts = await web3Provider.listAccounts();
          setAddress(accounts[0]);

          // Mendapatkan saldo Ether pengguna
          const userBalance = await web3Provider.getBalance(accounts[0]);
          setBalance(weiToEther(userBalance));

          const network = await web3Provider.getNetwork();
          setChainId(network?.chainId)
          
          const coba = await web3Provider.getGasPrice();
          console.log("coba", weiToEther(coba));
          

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
  
  
  
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-900 gap-4'>
      <h1 className='text-yellow-50 text-5xl'>Hi. 🧍‍♀️</h1>
        {loading ? <><p className='text-yellow-50 text-lg'>Loading wallet..</p></> : 
          <>
            <p className='text-yellow-50 text-lg'>Chain Id : {chainId}</p>
            <p className='text-yellow-50 text-lg'>Address : {address}</p>
            <p className='text-yellow-50 text-lg'>Balance : {balance}</p>

            <div className='flex flex-col gap-2'>
                <Link to='/contract'>
                    <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Check Balance Contract</button>
                </Link>

                <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Send Transaction</button>
            </div>
          </>
        }
    </div>
  )
}

export default Home;
