import React from "react";
import CharacteristicsItem from "./CharacteristicsItem";

const CharacteristicsContainer = ({ label, value, icon }) => {
  return (
    <div className="lg:w-1/4 box-shadow rounded-xl flex lg:flex-col items-center lg:justify-center justify-between lg:p-4 p-3 w-full bg-base-100">
      <CharacteristicsItem icon={icon}>
        <span className={"font-bold"}>{label}</span>
      </CharacteristicsItem>
      <span>{value}</span>
    </div>
  );
};

export default CharacteristicsContainer;
