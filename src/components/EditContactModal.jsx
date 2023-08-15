import React, { useState, useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";

export const EditContactModal = ({
  isOpen,
  onClose,
  selectedContact,
  handleUpdateContact,
  user,
}) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [correio, setCorreio] = useState("");
  const [gender, setGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (selectedContact) {
      setNome(selectedContact.nome);
      setTelefone(parseInt(selectedContact.tlf));
      setEndereco(selectedContact.endereco);
      setCorreio(selectedContact.email);
      setGender(selectedContact.gender);
    }
  }, [selectedContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedContact = {
      ...selectedContact,
      nome: nome,
      tlf: parseInt(telefone),
      email: correio,
      endereco: endereco,
      gender: gender,
      uid: user.uid,
    };

    setTimeout(async () => {
      try {
        await handleUpdateContact(updatedContact);
        onClose();
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error al actualizar el contacto", error);
      }
    }, 1000);
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center z-20 bg-black bg-opacity-80`}
    >
      {isSubmitting ? (
        <div className="bg-[#111B21] text-white max-[540px]:p-4 p-8 rounded-lg">
          <RingLoader size={100} color="#ffffff" />
        </div>
      ) : (
        <div className="bg-[#111B21] max-[540px]:w-[90%] text-white max-[540px]:p-4 p-8 rounded-lg">
          <h2 className="text-2xl opacity-70 font-semibold text-center mb-4">
            Editar Contato
          </h2>
          <form className="opacity-70" onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-between">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="ml-2 focus:outline-0 bg-transparent max-[540px]:w-full border-b-[1px]"
                placeholder="Insira o nome"
              />
            </div>
            <div className="mb-4 flex justify-between">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="number"
                pattern="\d*"
                inputMode="numeric"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                className="ml-2 bg-transparent max-[540px]:w-full focus:outline-0 border-b-[1px]"
                placeholder="Insira o telefone"
              />
            </div>
            <div className="mb-4 flex justify-between">
              <label htmlFor="endereco">Endereço:</label>
              <input
                type="text"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="ml-2 bg-transparent max-[540px]:w-full focus:outline-0 border-b-[1px]"
                placeholder="Insira o endereço"
              />
            </div>
            <div className="mb-4 flex justify-between">
              <label htmlFor="correio">Email:</label>
              <input
                type="email"
                id="correio"
                value={correio}
                onChange={(e) => setCorreio(e.target.value)}
                className="ml-2 bg-transparent max-[540px]:w-full focus:outline-0 border-b-[1px]"
                placeholder="Insira o email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block font-semibold">
                Género:
              </label>
              <div className="mt-2">
                <label htmlFor="male" className="mr-4">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  Home
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  Mulher
                </label>
              </div>
            </div>
            <div className="flex mt-8 justify-between">
              <button
                type="button"
                className="border border-gray-500 max-[540px]:border-gray-300 max-[540px]:text-gray-300 hover:border-white px-4 py-2 rounded-md text-gray-500 hover:text-white"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                disabled={isSubmitting}
              >
                Atualizar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
