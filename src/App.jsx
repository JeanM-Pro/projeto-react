import React, { useState } from "react";
import "./input.css";
import { Lista } from "./components/Lista";
import { Card } from "./components/Card";

export const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contatos, setContatos] = useState([]);
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };
  const widthScreen = window.innerWidth;

  return (
    <div className="w-full bg-[#1b2327]">
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
        />
        <Card
          selectedContact={selectedContact}
          contatos={contatos}
          setContatos={setContatos}
          setSelectedContact={setSelectedContact}
          widthScreen={widthScreen}
        />
      </div>
    </div>
  );
};
