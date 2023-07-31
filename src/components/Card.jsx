import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { DeleteContactModal } from "./DeleteContactModal";
import { EditContactModal } from "./EditContactModal";
import maleImage from "./images/home.png";
import femaleImage from "./images/mulher.png";

export const Card = ({
  selectedContact,
  contatos,
  setContatos,
  setSelectedContact,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!selectedContact) {
    return (
      <div className="bg-[#202C33] flex flex-col items-center justify-center col-span-8 text-white">
        <img
          src="https://png.pngtree.com/png-vector/20220621/ourlarge/pngtree-male-user-profile-avatar-boy-png-image_5244563.png"
          alt=""
          className="w-[250px] h-[250px] rounded-[50%] opacity-50 "
        />
        <p className="mt-4 select-none font-semibold text-xl opacity-50 ">
          Selecione um contato para ver suas informações.
        </p>
      </div>
    );
  }

  const handleTrashIconClick = () => {
    setIsModalOpen(true);
  };

  const handleEditIconClick = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateContact = (updatedContact) => {
    fetch(`http://localhost:5000/contatos/${selectedContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedContatos = contatos.map((contato) =>
          contato.id === selectedContact.id ? data : contato
        );
        setContatos(updatedContatos);

        setSelectedContact(data);
        setIsEditModalOpen(false);
      })
      .catch((error) =>
        console.error("Error al actualizar el contacto", error)
      );
  };
  const handleDeleteContact = () => {
    fetch(`http://localhost:5000/contatos/${selectedContact.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedContatos = contatos.filter(
          (contato) => contato.id !== selectedContact.id
        );
        setContatos(updatedContatos);
        setSelectedContact(null);
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error al eliminar el contacto", error));
  };

  const splitString = (str) => {
    if (str.length >= 2) {
      const firstTwoDigits = str.substring(0, 2);
      const restOfString = str.substring(2);
      return [firstTwoDigits, restOfString];
    } else {
      return [str, ""];
    }
  };

  const [firstTwoDigits, restOfString] = splitString(selectedContact.tlf);

  return (
    <div className="bg-[#202C33] flex items-center justify-center col-span-8 text-white">
      <div className="flex flex-col items-center">
        <img
          src={selectedContact.gender === "male" ? maleImage : femaleImage}
          alt=""
          className="w-[250px] h-[250px] rounded-[50%] "
        />

        <p className="text-2xl font-semibold mt-4">
          {selectedContact.nome.replace(/\b\w/g, (match) =>
            match.toUpperCase()
          )}
        </p>
        <p className="text-lg">{`(${firstTwoDigits}) ${restOfString}`}</p>
        <p className="text-[#86897A]">{selectedContact.email}</p>
        <p className="text-[#86897A]">
          {selectedContact.endereco.replace(/\b\w/g, (match) =>
            match.toUpperCase()
          )}
        </p>
        <div className="flex mt-6 justify-between cursor-pointer w-[150px]">
          <FiEdit
            onClick={handleEditIconClick}
            className="text-2xl hover:text-blue-400"
          />
          <BsTrash
            className="text-2xl hover:text-red-400"
            onClick={handleTrashIconClick}
          />
        </div>
      </div>
      {isModalOpen && (
        <DeleteContactModal
          setIsModalOpen={setIsModalOpen}
          handleDeleteContact={handleDeleteContact}
        />
      )}

      {isEditModalOpen && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={setIsEditModalOpen}
          selectedContact={selectedContact}
          handleUpdateContact={handleUpdateContact}
        />
      )}
    </div>
  );
};
