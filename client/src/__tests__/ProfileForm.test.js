import { render, screen } from "@testing-library/react";
import ProfileForm from "../components/forms/ProfileForm";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import GlobalProvider, { GlobalContext } from "../context/GlobalContext";
import ProfileModal from "../components/modal/ProfileModal";

const mockCloseModal = jest.fn();
const value = {
    user: {
        user_name: "johndoe",
        user_email: "Dan@gmail.com",
        user_password: "12345678",
        confirm_password: "12345678",
        _id: "66e14357f479e403672518ce",
    },
    closeProfileModal: mockCloseModal
}

const url = `http://localhost:3000/api/users/update/${value.user._id}`;
jest.mock("axios");

describe("Profile Page Tests ", () => {

 beforeEach(()=>{
    render(
        <GlobalContext.Provider value={value}>
            <ProfileForm />
        </GlobalContext.Provider >
    );
 })
    test("test button that close Profile Modal",async () => {
        const btn = screen.getByTestId("cancelBtn");
        await userEvent.click(btn);
        expect(mockCloseModal).toHaveBeenCalled();
    });


    test("test Profile page When form submitted", async () => {
        axios.put.mockResolvedValue({ success: true });
        //  Btn click
        const btn = screen.getByRole("button", { name: "editBtn" });
        const elements = screen.getAllByRole("textbox");
        for (let element of elements) {
            await userEvent.type(element, value.user[element.id]);
            console.log(value.user[element.id]);
            expect(element.value).toBe(value.user[element.id]);
        }

        await userEvent.click(btn);
        // expect(axios.put).toHaveBeenCalled;
        expect(axios.put).toHaveBeenCalledWith("http://localhost:3000/api/users/update/66e14357f479e403672518ce", {
            user_name: "johndoe",
            user_email: "Dan@gmail.com",
            user_password: "12345678",
        });
    });
})


