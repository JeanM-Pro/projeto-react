import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CardList } from "./CardList";
import { AddContactModal } from "./AddContactModal";
import { BiLogOut } from "react-icons/bi";
import { auth } from "../firebase/firebase";
import RingLoader from "react-spinners/RingLoader";

export const Lista = ({
  onContactClick,
  selectedContact,
  setContatos,
  contatos,
  user,
  setUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContatos, setFilteredContatos] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    fetch(
      `https://node-project-production-dadb.up.railway.app/api/contacts?uid=${user.uid}`
    )
      .then((response) => response.json())
      .then((data) => setContatos(data))
      .catch((error) => console.error("Error al obtener los usuarios", error));
  }, [setContatos, user.uid]);

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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setTimeout(async () => {
      try {
        await auth.signOut();
        setIsLoggingOut(false);
      } catch (error) {
        console.error("Error al hacer logout", error);
        setIsLoggingOut(false);
      }
    }, 2000);
  };

  return (
    <div
      className={`col-span-4 relative max-[540px]:col-span-12 flex flex-col text-white h-screen bg-[#111B21] border-r-[1px] border-[#3e464b]`}
    >
      {isLoggingOut && (
        <div className="fixed flex items-center justify-center z-30 w-screen h-screen bg-black bg-opacity-80">
          <div className="bg-[#111B21] text-white flex flex-col justify-between items-center p-8 rounded-lg">
            <RingLoader size={100} color="#ffffff" />
            Fechando a sessão
          </div>
        </div>
      )}
      <BiLogOut
        onClick={handleLogout}
        className="absolute z-[10] left-8 max-[540px]:bottom-14 bottom-6 text-3xl text-white cursor-pointer"
      />

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
        user={user}
      />
    </div>
  );
};
