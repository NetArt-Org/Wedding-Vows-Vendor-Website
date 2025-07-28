// utils/auth.js or inside your component
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export const loginWithGoogleAndStrapi = async () => {
  try {
    // 🔐 Step 1: Sign in with Google (Firebase)
    const result = await signInWithPopup(auth, provider);

    const idToken = await result.user.getIdToken();

    // 🛠 Step 2: Send token to Strapi
    const res = await fetch("https://admin.weddingvows.com/api/auth/firebase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.error?.message || "Login failed");

    // ✅ Step 3: Use JWT from Strapi for GraphQL/authenticated access
    localStorage.setItem("loginAs", "user");
    localStorage.setItem("token", data.jwt); // assuming `data.jwt` is the token
    localStorage.setItem("user", JSON.stringify({
      name: data?.user?.username || result.user.displayName,
      email: data?.user?.email || result.user.email
    }));

    console.log("Strapi user:", data.user);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
};
