'use client';
import React from 'react'
import { SnackbarProvider } from 'notistack';
import { AppProvider } from '@/context/AppContext';
// import { MetaMaskProvider } from '@metamask/sdk-react';

const Template = ({ children }) => {
    return (<SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }} >
        {/* <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "NFT Marketplace",
          url: window.location.href,
        },
        infuraAPIKey: '2939b91e8f9143a9b6a2f4fe349cc94a',
        // Other options.
      }}
    > */}
        <AppProvider>{children}</AppProvider>
    {/* </MetaMaskProvider> */}
    </SnackbarProvider>
    )
}

export default Template;