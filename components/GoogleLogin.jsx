import React, { useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";

const GoogleLogin = ({ onSuccess, onError, className }) => {
  const uiRef = useRef(null);
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let firebaseui = null;
    let ui = null;

    const initializeFirebaseUI = async () => {
      firebaseui = await import("firebaseui");
      await import("firebaseui/dist/firebaseui.css");

      ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

      const uiConfig = {
        signInOptions: [
          {
            provider: "google.com",
          }
        ],
        callbacks: {
          signInSuccessWithAuthResult: async (authResult) => {
            const user = authResult.user;
            const token = await user.getIdToken();
            localStorage.setItem("loginAs", "user");
            localStorage.setItem("token", token);
            localStorage.setItem(
              "user",
              JSON.stringify({
                name: user.displayName,
                email: user.email,
              })
            );
            if (onSuccess) onSuccess(authResult);
            return false; // Prevent redirect
          },
          signInFailure: (error) => {
            if (onError) onError(error);
          }
        },
        signInFlow: "popup"
      };

      ui.start(containerRef.current, uiConfig);
      uiRef.current = ui;
    };

    initializeFirebaseUI();

    return () => {
      if (uiRef.current) {
        uiRef.current.reset();
      }
    };
  }, [isClient, onSuccess, onError]);

  return <div ref={containerRef} className={className} />;
};

export default GoogleLogin;
