import "../styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "./theme";
import createEmotionCache from "./createEmotionCache";
import {Web3ReactProvider} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers'
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  

  return (
    <CacheProvider value={emotionCache}>
    <Web3ReactProvider getLibrary={(provider: any) => new Web3Provider(provider)} >

        <Component {...pageProps} />
        </ Web3ReactProvider>
    </CacheProvider>
   
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
