import React, { useState } from "react";

export const AddContactModal = ({ isOpen, onClose, setContatos, contatos }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [correio, setCorreio] = useState("");
  const [gender, setGender] = useState("male");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      nome: nome,
      tlf: telefone,
      email: correio,
      endereco: endereco,
      gender: gender,
    };

    fetch("http://localhost:5000/contatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContatos([...contatos, data]);
        setNome("");
        setTelefone("");
        setEndereco("");
        setCorreio("");
        setGender("male");
        onClose();
      })
      .catch((error) => console.error("Error al agregar el contacto", error));
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center z-20 bg-black bg-opacity-80`}
    >
      <div className="bg-[#111B21] text-white p-8 rounded-lg">
        <h2 className="text-2xl opacity-70 font-semibold text-center mb-4">
          Novo Contato
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
              className="ml-2 focus:outline-0 bg-transparent border-b-[1px]"
              placeholder="Insira o nome"
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              className="ml-2 bg-transparent focus:outline-0 border-b-[1px]"
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
              className="ml-2 bg-transparent focus:outline-0 border-b-[1px]"
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
              className="ml-2 bg-transparent focus:outline-0 border-b-[1px]"
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
                Hombre
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
                Mujer
              </label>
            </div>
          </div>
          <div className="flex mt-8 justify-between">
            <button
              type="button"
              className="border border-gray-500 hover:border-white px-4 py-2 rounded-md text-gray-500 hover:text-white"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
