import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { GlobalContext } from "../../../context/GlobalContext";

export default function Profile() {
  const { openProfileModal, user, setIsAuth, setUser } = useContext(GlobalContext);
  // const url = `http://localhost:3000/api/users/delete/${user._id}`

  async function deleteUser() {
    // console.log(user)
    try {
      const url = `http://localhost:3000/api/users/delete/${user._id}`
      const result = await axios.delete(url)
      if (result != null) {
        console.log("result2", result)
        toast.success("Profile deleted successfully");
        // setIsAuth(false);
        // setUser(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while delete the user");
    }
  }

  return (
    <div className="h-screen w-full ">
      <div className="h-[80%] w-full flex justify-center items-center">
        <div className="bg-gray-300 p-2 overflow-hidden shadow rounded-lg border w-1/3 mx-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd
                  data-testid="user_name"
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                >
                  {user?.user_name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.user_email}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-center items-center gap-5">
            <button aria-label="editProfile" className="btn btn-primary" onClick={openProfileModal}>Edit</button>
            <button aria-label="deleteUser" className="btn btn-error" onClick={deleteUser}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
