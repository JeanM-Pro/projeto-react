import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export const Card = ({ selectedContact }) => {
  return (
    <div className="bg-[#202C33] flex items-center justify-center col-span-8 text-white">
      <div className="flex flex-col items-center">
        <img
          src={
            selectedContact.img
              ? selectedContact.img
              : "https://static.vecteezy.com/ti/vetor-gratis/p1/18765757-icone-de-perfil-de-usuario-em-estilo-simples-ilustracao-em-avatar-membro-no-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana-vetor.jpg"
          }
          alt=""
          className="w-[250px] h-[250px] rounded-[50%] "
        />

        <p className="text-2xl font-semibold mt-4">{selectedContact.nome}</p>
        <p className="text-lg">{selectedContact.tlf}</p>
        <p className="text-[#86897A]">{selectedContact.email}</p>
        <p className="text-[#86897A]">{selectedContact.endereco}</p>
        <div className="flex mt-6 justify-between cursor-pointer w-[150px]">
          <FiEdit className="text-2xl hover:text-blue-400" />
          <BsTrash className="text-2xl hover:text-red-400" />
        </div>
      </div>
    </div>
  );
};
