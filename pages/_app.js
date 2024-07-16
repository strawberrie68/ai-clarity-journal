import React from "react";
import "../styles/global.css";
import { JournalProvider } from "./JournalContext.js";

function MyApp({ Component, pageProps }) {
  return (
    <JournalProvider>
      <Component {...pageProps} />
    </JournalProvider>
  );
}

export default MyApp;
