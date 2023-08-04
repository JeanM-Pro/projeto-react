import RingLoader from "react-spinners/RingLoader";

export const DeleteContactModal = ({
  setIsModalOpen,
  handleDeleteContact,
  spinnerDelete,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-80">
      {spinnerDelete ? (
        <div className="bg-[#111B21] text-white p-8 rounded-lg">
          <RingLoader size={100} color="#ffffff" />
        </div>
      ) : (
        <div className="bg-[#111B21] max-[540px]:w-[90%] text-white p-8 rounded-lg">
          <h2 className="text-2xl text-center font-semibold mb-4">
            Confirmar Eliminação
          </h2>
          <p className="text-center">
            Tem certeza de que deseja excluir esse contato?
          </p>
          <div className="flex w-full justify-between mt-6">
            <button
              className="mr-4 border max-[540px]:border-gray-300 max-[540px]:text-gray-300 border-gray-500 hover:border-white px-4 py-2 rounded-md text-gray-500 hover:text-white"
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
      )}
    </div>
  );
};
