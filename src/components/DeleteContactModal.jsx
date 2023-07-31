import React from "react";

export const DeleteContactModal = ({ setIsModalOpen, handleDeleteContact }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-80">
      <div className="bg-[#111B21] text-white p-8 rounded-lg">
        <h2 className="text-2xl text-center font-semibold mb-4">
          Confirmar Eliminação
        </h2>
        <p>Tem certeza de que deseja excluir esse contato?</p>
        <div className="flex justify-end mt-6">
          <button
            className="mr-4 border border-gray-500 hover:border-white px-4 py-2 rounded-md text-gray-500 hover:text-white"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDeleteContact}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
