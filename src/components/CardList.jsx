export const CardList = ({ contato }) => {
  return (
    <div className="w-full h-[66px] flex cursor-pointer items-center pl-4 pr-2 hover:bg-[#202C33]">
      <img
        src={
          contato.img
            ? "https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg"
            : "https://e7.pngegg.com/pngimages/926/34/png-clipart-computer-icons-user-profile-avatar-avatar-face-heroes.png"
        }
        alt="Perfil"
        className="w-[50px] h-[50px] rounded-[50%]"
      />

      <div className="h-full relative flex flex-col justify-center pb-2 w-full ml-4 border-b-[1px] border-[#86897a27] ">
        <p>{contato.nome}</p>
        <p className="text-[#86897A] text-xs">{contato.tlf}</p>
      </div>
    </div>
  );
};
