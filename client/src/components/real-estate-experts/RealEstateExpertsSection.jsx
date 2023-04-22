import * as React from "react";
import TitleSection from "../common/TitleSection";
import RealEstateExpertsItem from "./RealEstateExpertsItem";
export default function RealEstateExpertsSection(props) {
  return (
    <div className="container mx-auto padding-mobile">
      <TitleSection title="Chuyên trang bất động sản" />
      <div className="flex items-center gap-x-5">
        <RealEstateExpertsItem />
        <RealEstateExpertsItem />
        <RealEstateExpertsItem />
      </div>
    </div>
  );
}
