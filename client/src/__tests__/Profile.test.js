import { render, screen } from "@testing-library/react";
import Profile from "../components/pages/privateRoutes/Profile";
import { GlobalContext } from "../context/GlobalContext";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const mokeOpenModoal=jest.fn();
const value = {
  user: {
    _id:"66e14357f479e403672518ce",
    user_email: "johndoe@gmail.com",
    user_name: "johndoe",
    premission: "Regular",
    verified: true,
  },
  openProfileModal:mokeOpenModoal
}

const url = `http://localhost:3000/api/users/delete/66e14357f479e403672518ce`
jest.mock("axios");

describe("TEST PROFILE PAGE", () => {

  beforeEach(() => {
    render(
      <GlobalContext.Provider value={value}>
        <Profile />
      </GlobalContext.Provider>
    );
  });
  test("test user Details apper in document", () => {
    const elementName = screen.getByTestId("user_name");
    expect(elementName).toBeInTheDocument()
  });

  test("test delete user from the website", async () => {
    axios.delete.mockResolvedValue({ success: true });
    const btn = screen.getByRole("button", { name: "deleteUser" })
    await userEvent.click(btn);
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/api/users/delete/66e14357f479e403672518ce")
  })

  test("test button that edit user Profile ", async () => {
    const btn = screen.getByRole("button", { name: "editProfile" })
    await userEvent.click(btn);
    expect(mokeOpenModoal).toHaveBeenCalled();
  })
});
