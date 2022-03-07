import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import * as React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "./theme";
import createEmotionCache from "./createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  return (
    <CacheProvider value={emotionCache}>
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <Component {...pageProps} />
      </MoralisProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
