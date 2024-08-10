import React from "react";

function Footer() {
  return (
    <div className= "bg-slate-800 text-white w-full fixed bottom-0 flex flex-col justify-center items-center">
      <div className="logo font-bold text-2xl">
        <span className="text-purple-200 font-bold"> &lt;</span>
        Ankita
        <span className="text-purple-200 font-bold">Password/&gt;</span>
      </div>
      <div className="flex">
        Created with <img src="heart.png" width={24} alt="Heart" /> Ankita
        Vishwakarma
      </div>
    </div>
  );
}

export default Footer;
