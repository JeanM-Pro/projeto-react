import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import RingLoader from "react-spinners/RingLoader";

export const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      setIsSubmitting(true);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#1b2327] h-screen flex items-center justify-center">
      {isSubmitting ? (
        <div className="bg-[#111B21] flex items-center justify-center text-white max-[540px]:p-4 p-8 rounded-lg">
          <RingLoader size={100} color="#ffffff" />
        </div>
      ) : (
        <button
          onClick={handleLoginWithGoogle}
          className="bg-blue-500 flex items-center text-white py-2 px-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          <FcGoogle className="text-4xl mr-4 bg-white rounded-lg" />
          Entrar com o Google
        </button>
      )}
    </div>
  );
};
