import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';


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
    if(form.site.length > 3 && form.password.length>3 && form.username.length>3){

      setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
      console.log([...passwordArray, form]);
      setform({ site: " ", username: "", password: "" })
      toast("Password saved!", {
        position: "top-right",
        theme:"dark"
      });
    }else{
      toast("Password not saved!", {
        position: "top-right",
        theme:"dark"
      });
    }
  };
  
  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete?");
    if(c){

      setpasswordArray(passwordArray.filter(item=>item.id!==id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      console.log([...passwordArray, form]);
    }
    toast("Password deleted!", {
      position: "top-right",
      theme:"dark"
    });
  };
  const editPassword = (id) => {
    console.log("Edit id ", id);
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
    toast("Password Edited!", {
      position: "top-right",
      theme:"dark"
    });
  };
  const showPassword = () => {
    passwordRef.current.type = "password";
    console.log(ref.current.src);

    if (ref.current.src.includes("view.png")) {
      ref.current.src = "hide.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "view.png";
      passwordRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };
  const notify = () => {
    toast("Copied to Clipboard!", {
      position: "top-right",
      theme:"dark"
    });
  };
  return (
    <>
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <div className=" mt-7 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-purple-800 font-bold"> &lt;</span>
          Ankita
          <span className="text-purple-800 font-bold">Password/&gt;</span>
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
          <div className="flex flex-col md:flex-row w-full justify-between gap-4">
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
            <table class="mb-4 table-auto w-full rounded-lg overflow-hidden">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="py-2">Site </th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border  border-white text-center ">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            src="copy.png"
                            alt="Copy"
                            width={20}
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                              notify();
                            }}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <img
                            src="copy.png"
                            alt="Copy"
                            width={20}
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                              notify();
                            }}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span> {item.password}</span>
                          <img
                            src="copy.png"
                            alt="Copy"
                            width={20}
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                              notify();
                            }}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span className="cursor-pointer mx-1" onClick={()=> editPassword(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/oqaajvyl.json"
                              trigger="hover"
                              colors="primary:#000000,secondary:#6c16c7"
                            ></lord-icon>{" "}
                          </span>
                          <span className="cursor-pointer mx-1" onClick={()=>deletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/vlnvqvew.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#6c16c7"
                          ></lord-icon>
                          </span>
                        </div>
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
