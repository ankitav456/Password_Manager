import React, { useEffect, useRef, useState } from "react";

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: " ", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    console.log(form);
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };
  const showPassword = () => {
    passwordRef.current.type ="password"
    console.log(ref.current.src);

    if (ref.current.src.includes("view.png")) {
      ref.current.src = "hide.png";
        passwordRef.current.type ="text"
    } else {
      ref.current.src = "view.png";
        passwordRef.current.type ="password"
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <div className=" mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-purple-200 font-bold"> &lt;</span>
          Ankita
          <span className="text-purple-200 font-bold">Password/&gt;</span>
        </h1>
        <p className="text-purple-800 text-lg text-center">
          Your own password manager
        </p>
        <div className="text-black flex flex-col p-4 gap-4 items-center">
          <input
            value={form.site}
            type="text"
            placeholder="Enter Website Url"
            name="site"
            id=""
            onChange={handleChange}
            className="rounded-full border border-purple-800 w-full text-black  p-4 py-1"
          />
          <div className="flex w-full justify-between gap-4">
            <input
              value={form.username}
              type="text"
              placeholder="Enter Username"
              name="username"
              id=""
              onChange={handleChange}
              className="rounded-full border border-purple-800 w-full text-black p-4 py-1"
            />
            <div className="relative">
              <input
              ref={passwordRef}
                value={form.password}
                type="password"
                placeholder="Enter Password"
                name="password"
                id=""
                onChange={handleChange}
                className="rounded-full border border-purple-800 w-full text-black p-4 py-1"
              />
              <span
                className="absolute right-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="hide.png"
                  alt="eye"
                  className="mt-2 mr-4"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center border border-purple-500 bg-purple-800 rounded-full w-fit px-4 py-1 hover:bg-purple-500  gap-2"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/rcgrnzji.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full rounded-lg overflow-hidden">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="py-2">Site </th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border flex items-center justify-center border-white text-center ">
                        <a href={item.site} target="_blank">{item.site}</a>
                        <img src="copy.png" alt="Copy" width={20} className="cursor-pointer"/>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        {item.username}
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        {item.password}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
