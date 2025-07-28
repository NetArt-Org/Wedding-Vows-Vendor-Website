import React from "react";
import { useRouter } from "next/router";
import { loginWithGoogleAndStrapi } from "../utils/auth";

const LoginButton = () => {
    const router = useRouter();

    const handleLogin = async () => {
        const data = await loginWithGoogleAndStrapi();
        if (data?.jwt) {
            router.replace(router.asPath); // redirect to same page
        }
    };

    return (
        <button
            onClick={handleLogin}
            style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #dadce0",
                borderRadius: "6px",
                padding: "10px 15px",
                background: "#fff",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 500,
                color: "#3c4043",
            }}
        >
            <img
                src="https://img.plasmic.app/img-optimizer/v1/img?src=https%3A%2F%2Fimg.plasmic.app%2Fimg-optimizer%2Fv1%2Fimg%2F6b8fd1a894b05cf98e49378e2949593f.png&w=32&q=75&f=webp"
                alt="Google"
                style={{
                    width: "18px",
                    height: "18px",
                    marginRight: "8px",
                }}
            />
            Sign In
        </button>
    );
};

export default LoginButton;
