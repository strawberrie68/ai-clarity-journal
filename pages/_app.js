import React from "react";
import "../styles/global.css";
import { JournalProvider } from "./JournalContext.js";
import { AuthProvider } from "./AuthContext.js";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <JournalProvider>
        <Component {...pageProps} />
      </JournalProvider>
    </AuthProvider>
  );
}

export default MyApp;
