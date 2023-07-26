import React, { useState } from "react";
import "./input.css";
import { Lista } from "./components/Lista";
import { Card } from "./components/Card";

export const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };
  return (
    <div className="grid grid-cols-12">
      <Lista
        onContactClick={handleContactClick}
        selectedContact={selectedContact}
      />
      <Card selectedContact={selectedContact} />
    </div>
  );
};
