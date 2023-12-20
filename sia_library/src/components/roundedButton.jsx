import React from "react";

function roundedButton({ buttonSVG }) {
  return (
    <div className=" h-[120px] bg-white w-[120px] rounded-full">
      {buttonSVG}
    </div>
  );
}

export default roundedButton;
