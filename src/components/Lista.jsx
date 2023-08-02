import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CardList } from "./CardList";
import { AddContactModal } from "./AddContactModal";

export const Lista = ({
  onContactClick,
  selectedContact,
  setContatos,
  contatos,
  widthScreen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContatos, setFilteredContatos] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/contatos")
      .then((response) => response.json())
      .then((data) => setContatos(data))
      .catch((error) => console.error("Error al obtener los usuarios", error));
  }, [setContatos]);

  useEffect(() => {
    const filtered = contatos.filter((contato) =>
      contato.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) => a.nome.localeCompare(b.nome));
    setFilteredContatos(filtered);
  }, [searchTerm, contatos]);

  const handleAddContact = (newContact) => {
    setContatos((prevContatos) => [...prevContatos, newContact]);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setShowClearButton(false);
  };

  return (
    <div
      className={`col-span-4 max-[540px]:col-span-12 flex flex-col text-white h-screen bg-[#111B21] border-r-[1px] border-[#3e464b]`}
    >
      <div className="w-full pl-4 items-center justify-between flex py-2 ">
        <div className="w-[85%] px-2 flex items-center justify-between bg-[#202C33] h-10 rounded-lg">
          <AiOutlineSearch className="text-2xl text-[#AEBAC1]" />
          <input
            type="text"
            className={`focus:outline-0 bg-transparent ${
              showClearButton ? "w-[80%]" : "w-[90%]"
            }  h-full`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowClearButton(e.target.value.length > 0);
            }}
            placeholder="Buscar contato..."
          />
          {showClearButton && (
            <AiOutlineCloseCircle
              className="text-2xl text-[#AEBAC1] cursor-pointer"
              onClick={handleClearInput}
            />
          )}
        </div>
        <div className="w-[15%] flex items-center justify-center">
          <AiOutlinePlusCircle
            className="text-3xl text-[#AEBAC1] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <div className="grow box-border">
        <Scrollbars>
          {filteredContatos.map((contato) => {
            return (
              <div
                key={contato.id}
                className={`${
                  selectedContact && selectedContact.id === contato.id
                    ? "bg-[#202C33]"
                    : ""
                }`}
                onClick={() => onContactClick(contato)}
              >
                <CardList contato={contato} />
              </div>
            );
          })}
        </Scrollbars>
      </div>
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddContact={handleAddContact}
        setContatos={setContatos}
        contatos={contatos}
      />
    </div>
  );
};
