import maleImage from "./images/home.png";
import femaleImage from "./images/mulher.png";

export const CardList = ({ contato }) => {
  const splitString = (str) => {
    if (str.length >= 2) {
      const firstTwoDigits = str.substring(0, 2);
      const restOfString = str.substring(2);
      return [firstTwoDigits, restOfString];
    } else {
      return [str, ""];
    }
  };

  const [firstTwoDigits, restOfString] = splitString(contato.tlf);
  return (
    <div className="w-full h-[66px] flex cursor-pointer items-center pl-4 pr-2 hover:bg-[#202C33]">
      <img
        src={`${contato.gender === "male" ? maleImage : femaleImage}`}
        alt="Perfil"
        className="w-[50px] h-[50px] rounded-[50%]"
      />

      <div className="h-full relative flex flex-col justify-center pb-2 w-full ml-4 border-b-[1px] border-[#86897a27] ">
        <p>{contato.nome.replace(/\b\w/g, (match) => match.toUpperCase())}</p>
        <p className="text-[#86897A] text-xs">{`(${firstTwoDigits}) ${restOfString}`}</p>
      </div>
    </div>
  );
};
