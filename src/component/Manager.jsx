import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [errors, setErrors] = useState({
    site: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const validateForm = () => {
    const newErrors = { site: "", username: "", password: "" };
    let isValid = true;

    if (!form.site.trim()) {
      newErrors.site = "Website URL is required.";
      isValid = false;
    }
    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const savePassword = () => {
    if (validateForm()) {
      const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
      setpasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setform({ site: "", username: "", password: "" });
      setErrors({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        theme: "dark",
      });
    } else {
      toast("Please fill all fields correctly!", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  const deletePassword = (id) => {
    let confirmDelete = window.confirm("Do you really want to delete?");
    if (confirmDelete) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
    toast("Password deleted!", {
      position: "top-right",
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setform(passwordToEdit);
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setpasswordArray(updatedPasswords);
    toast("Password Edited!", {
      position: "top-right",
      theme: "dark",
    });
  };

  const showPassword = () => {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";
    ref.current.src = ref.current.src.includes("view.png")
      ? "hide.png"
      : "view.png";
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to Clipboard!", {
      position: "top-right",
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <div className="mt-14 md:mycontainer">
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
            onChange={handleChange}
            className={`rounded-full border w-full text-black p-4 py-1 placeholder-gray-500 ${
              errors.site ? "border-red-500" : "border-purple-800"
            }`}
          />
          {errors.site && (
            <p className="text-red-500 text-sm mt-1 text-left w-full">
              {errors.site}
            </p>
          )}
          <div className="flex flex-col md:flex-row w-full justify-between gap-4">
            <div className="lg:w-[70%]">
              <input
                value={form.username}
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
                className={`rounded-full border w-full text-black p-4 py-1 placeholder-gray-500 ${
                  errors.username ? "border-red-500" : "border-purple-800"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 text-left w-full">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="relative lg:w-[30%]">
              <input
                ref={passwordRef}
                value={form.password}
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                className={`rounded-full border w-full text-black p-4 py-1 placeholder-gray-500 ${
                  errors.password ? "border-red-500" : "border-purple-800"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 text-left w-full">
                  {errors.password}
                </p>
              )}
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
                  title="Show/Hide Password"
                />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center border border-purple-500 bg-purple-800 rounded-full w-fit px-4 py-1 hover:bg-purple-500 gap-2"
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
          {passwordArray.length !== 0 && (
            <table className="mb-4 table-auto w-full rounded-lg overflow-hidden">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <img
                          src="copy.png"
                          alt="Copy"
                          width={20}
                          className="cursor-pointer"
                          onClick={() => copyText(item.site)}
                          title="Copy Site URL"
                        />
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <img
                          src="copy.png"
                          alt="Copy"
                          width={20}
                          className="cursor-pointer"
                          onClick={() => copyText(item.username)}
                          title="Copy Username"
                        />
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <img
                          src="copy.png"
                          alt="Copy"
                          width={20}
                          className="cursor-pointer"
                          onClick={() => copyText(item.password)}
                          title="Copy Password"
                        />
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => editPassword(item.id)}
                          title="Edit Password"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/oqaajvyl.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#6c16c7"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => deletePassword(item.id)}
                          title="Delete Password"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/vlnvqvew.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#6c16c7"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
