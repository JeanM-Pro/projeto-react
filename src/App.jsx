import React, { useEffect, useState } from "react";
import "./input.css";
import { Lista } from "./components/Lista";
import { Card } from "./components/Card";
import { auth } from "./firebase/firebase";
import { LoginPage } from "./pages/LoginPage";

export const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contatos, setContatos] = useState([]);
  const [user, setUser] = useState(null);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const widthScreen = window.innerWidth;

  return (
    <>
      {user ? (
        <div className="w-full bg-[#1b2327] relative">
          <div
            className={`grid grid-cols-12 max-w-[1400px] mx-auto ${
              widthScreen > 1400 ? "border-x-[1px] border-[#86897a57]" : ""
            } `}
          >
            <Lista
              onContactClick={handleContactClick}
              selectedContact={selectedContact}
              contatos={contatos}
              setContatos={setContatos}
              widthScreen={widthScreen}
              user={user}
              setUser={setUser}
            />
            <Card
              selectedContact={selectedContact}
              contatos={contatos}
              setContatos={setContatos}
              setSelectedContact={setSelectedContact}
              widthScreen={widthScreen}
              user={user}
            />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
