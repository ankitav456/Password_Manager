import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800  text-white fixed top-0 w-full">
      <div className="mycontainer flex items-center justify-between px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-purple-200 font-bold"> &lt;</span>
          Ankita
          <span className="text-purple-200 font-bold">Password/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/">
              About{" "}
            </a>
            <a className="hover:font-bold" href="/">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-white bg-purple-800 my-5 rounded-md flex gap-2 justify-between items-center">
          <img className="invert  w-10 p-1" src="github.png" alt="Github"></img>
          <span className="font-bold px-2">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
