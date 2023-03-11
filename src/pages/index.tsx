import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { useAccount, useSigner } from "wagmi";
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

export default function Home() {

  const defaultSnapOrigin = `npm:aa-snap37`;

  const connectSnap = async (
    snapId: string = defaultSnapOrigin,
    params: Record<"version" | string, unknown> = {}
  ) => {
    await window.ethereum?.request({
      method: "wallet_requestSnaps",
      params: {
        [snapId]: params,
      },
    });
  };

  const callSnap = async()=>{
    await window.ethereum?.request({
      method:"wallet_invokeSnap",
      params:{
        snapId : defaultSnapOrigin,
        request:{
          method:"init_aa",
        },
      },
    });
  }

  const deposit = async()=>{
    await window.ethereum?.request({
      method:"wallet_invokeSnap",
      params:{
        snapId : defaultSnapOrigin,
        request:{
          method:"deposit_aa",
        },
      },
    });
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col w-screen h-screen items-center justify-center bg-black' >
        <p className='text-white text-5xl font-bold'>aa-snap37</p>
        <p className='text-white text-2xl font-thin'>Redefining wallet experience - Native AA support for MetaMask</p>
        <br/>
        <br/>
        <p className='text-white text-2xl mb-2 font-thin'>Integrate in your Dapp</p>
        <div className='flex flex-col px-4 py-2 bg-gray-600 items-center justify-center rounded-xl' >
          <p className='text-white text-1xl '>npm i @aa-snap37</p>
        </div>
        <br/>
        <div className='flex flex-row' >
          <Link href='https://github.com/Arch0125/snap4337'><p className='text-white text-2xl p-3 font-thin'>GitHub</p></Link>
          <Link href='https://www.npmjs.com/package/aa-snap37'><p className='text-white text-2xl p-3 font-thin'>npm</p></Link>
        </div>
        <br/>
        <br/>
        <p className='text-white text-3xl mb-2 font-bold'>Try it out now! without connecting MetaMask to the Site</p>
        <div className='flex flex-row' >
          <button className='bg-blue-600 font-semibold text-white px-4 py-2 m-4 rounded-xl' onClick={()=>connectSnap()}>Install Snap</button>
          <button className='bg-blue-600 font-semibold text-white px-4 py-2 m-4 rounded-xl' onClick={()=>callSnap()}>Connect SCW</button>
          <button className='bg-blue-600 font-semibold text-white px-4 py-2 m-4 rounded-xl' onClick={()=>deposit()}>Deposit Funds</button>
        </div>
      </div>
    </>
  )
}
