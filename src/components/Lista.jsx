import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { contatos } from "./data";
import { CardList } from "./CardList";

export const Lista = ({ onContactClick, selectedContact }) => {
  return (
    <div className="col-span-4 flex flex-col text-white h-screen bg-[#111B21] ">
      <div className="w-full pl-4 items-center justify-between flex py-2 ">
        <div className="w-[85%] px-2 flex items-center justify-between bg-[#202C33] h-10 rounded-lg">
          <AiOutlineSearch className="text-2xl text-[#AEBAC1]" />
          <input
            type="text"
            className="focus:outline-0 bg-transparent w-[90%] h-full"
          />
        </div>
        <div className="w-[15%] flex items-center justify-center">
          <AiOutlinePlusCircle className="text-3xl text-[#AEBAC1] cursor-pointer" />
        </div>
      </div>
      <div className="grow box-border">
        <Scrollbars>
          {contatos.map((contato) => {
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
    </div>
  );
};
