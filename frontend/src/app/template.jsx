'use client';
import React from 'react'
import { SnackbarProvider } from 'notistack';
import { AppProvider } from '@/context/AppContext';

const Template = ({ children }) => {
    return (<SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }} >
        <AppProvider>{children}</AppProvider>
    </SnackbarProvider>
    )
}

export default Template;