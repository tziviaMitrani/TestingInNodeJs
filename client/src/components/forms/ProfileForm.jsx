import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { authRequest } from "../../actions";
import axios from "axios";
export default function ProfileForm() {
  const [error, setError] = useState("");
  const { closeProfileModal,user, setUser, setIsAut } = useContext(GlobalContext);

  const initialValues = {
    user_name: "",
    user_email: "",
    user_password: "",
    confirm_password: ""
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  const [values, setValues] = useState(initialValues);
  // console.log("user  ", user)
  // setIsAuth(true)


  async function handleSubmit(e) {
    e.preventDefault();

    const url = `http://localhost:3000/api/users/update/${user._id}`
    console.log("id  ", user._id)
    if (values.confirm_password !== values.user_password) {
      toast.error("Passwords do not match");
      return;
    }
    const updateUser = {
      ...user,
      user_name: values.user_name,
      user_email: values.user_email,
      user_password: values.user_password
    }
    console.log("updateUser", updateUser)
    try {
      // const { result } = await axios.put(url, updateUser);
      const result = await axios.put(url, updateUser);
      // console.log("res.statuse",res.statuse)

      console.log("result", result.status)
      // if (result.success === true) {
      setUser(updateUser)
      toast.success("Profile updated successfully");
      profileModal.close();
      // }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the profile");
    }
  }

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-center text-3xl font-semibold mb-5">Edit Profile</h1>
      <input
        data-testid="inputUpdateUser"
        type="text"
        id="user_name"
        name="user_name"
        className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={values.user_name}
        onChange={handleChange}
      />
      <input
        data-testid="inputUpdateUser"
        type="email"
        id="user_email"
        name="user_email"
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={values.user_email}
        onChange={handleChange}
      />
      <input
        data-testid="inputUpdateUser"
        type="text"
        id="user_password"
        name="user_password"
        className="my-5 bg-gray-100 border border-gray-300
         text-gray-900 text-sm rounded-lg focus:ring-blue-500
          focus:border-blue-500 block w-full p-2.5 
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={values.user_password}
        placeholder="your password"
        onChange={handleChange}
      />
      <input
        data-testid="inputUpdateUser"
        type="text"
        id="confirm_password"
        name="confirm_password"
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={values.confirm_password}
        placeholder="confirm password"
        onChange={handleChange}
      />

      <div className="mt-5 flex justify-center items-center gap-5">
        <button type="submit" className="btn btn-outline btn-primary">
          EDIT
        </button>
        <button
          onClick={closeProfileModal}
          type="button"
          className="btn btn-outline btn-error"
          aria-label="submit"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}
