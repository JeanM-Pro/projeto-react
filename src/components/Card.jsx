import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DeleteContactModal } from "./DeleteContactModal";
import { EditContactModal } from "./EditContactModal";
import maleImage from "./images/home.png";
import femaleImage from "./images/mulher.png";

export const Card = ({
  selectedContact,
  contatos,
  setContatos,
  setSelectedContact,
  user,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [spinnerDelete, setspinnerDelete] = useState(false);

  if (!selectedContact) {
    return (
      <div className="bg-[#202C33] max-[540px]:hidden flex flex-col items-center justify-center col-span-8 text-white">
        <img
          src="https://png.pngtree.com/png-vector/20220621/ourlarge/pngtree-male-user-profile-avatar-boy-png-image_5244563.png"
          alt=""
          className="w-[250px] h-[250px] rounded-[50%] opacity-50 "
        />
        <p className="mt-4 select-none text-center font-semibold text-xl opacity-50 ">
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
    fetch(
      `https://node-project-production-dadb.up.railway.app/api/contacts/${selectedContact.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
      }
    )
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
  const handleDeleteContact = async () => {
    setspinnerDelete(true);
    try {
      await fetch(
        `https://node-project-production-dadb.up.railway.app/api/contacts/${selectedContact.id}`,
        {
          method: "DELETE",
        }
      ).then(() => {
        const updatedContatos = contatos.filter(
          (contato) => contato.id !== selectedContact.id
        );
        setContatos(updatedContatos);
        setspinnerDelete(false);
        setSelectedContact(null);
        setIsModalOpen(false);
      });
    } catch (error) {
      console.error("Error al eliminar el contacto", error);
    }
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

  const [firstTwoDigits, restOfString] = splitString(
    selectedContact.tlf.toString()
  );

  return (
    <div className="bg-[#202C33] z-20 max-[540px]:h-full max-[540px]:bg-opacity-90 max-[540px]:w-full max-[540px]:fixed flex items-center justify-center col-span-8 text-white">
      <AiOutlineCloseCircle
        onClick={() => setSelectedContact(null)}
        className="min-[541px]:hidden absolute text-5xl top-4 right-4"
      />
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
        <p className="text-[#86897A] text-center">
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
          spinnerDelete={spinnerDelete}
        />
      )}

      {isEditModalOpen && (
        <EditContactModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          selectedContact={selectedContact}
          handleUpdateContact={handleUpdateContact}
          user={user}
        />
      )}
    </div>
  );
};
