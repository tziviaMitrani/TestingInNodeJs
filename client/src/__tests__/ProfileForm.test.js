import { render, screen } from "@testing-library/react";
import ProfileForm from "../components/forms/ProfileForm";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import GlobalProvider, { GlobalContext } from "../context/GlobalContext";
import ProfileModal from "../components/modal/ProfileModal";

// const updateUser1 = {
//     user_name: "Dan",
//     user_email: "Dan@gmail.com",
//     user_password: "12345678",
// };

const mockCloseModal=jest.fn();
const value={
    user : {
        user_email: "Dan@gmail.com",
        user_name: "johndoe",
        user_password: "12345678",
        confirm_password: "12345678",
        _id: "66e14357f479e403672518ce",
    },
    closeProfileModal:mockCloseModal
}
 


const url = `http://localhost:3000/api/users/update/${value.user._id}`;
jest.mock("axios");
// describe("Test Profile Form", () => {
describe("Profile Page Tests When user unAuthenticate", () => {
    beforeEach(() => {
        axios.get.mockRejectedValue({ success: false });
    })
    test("test Profile page When form submitted", async () => {
        axios.put.mockResolvedValue({ success: true });
        render(
            <GlobalContext.Provider value={value}>
                <ProfileForm />
            </GlobalContext.Provider >
        );

        //  Btn click
        const btn = screen.getByRole("button", { name: "submit" });
        // console.log(axios.put);
        // const elements = screen.getAllByTestId("inputUpdateUser");
        const elements = screen.getAllByRole("textbox");
        for (let element of elements) {
            await userEvent.type(element,"tzivia@gmail.com");
            // console.log(value.user[element.id]);
            expect(element.value).toBe("tzivia@gmail.com");
        }

        // for (let element of elements) {
        //     await userEvent.type(element, value.user[element.id]);
        //     console.log(value.user[element.id]);
        //     expect(element.value).toBe(value.user[element.id]);
        // }
    
        await userEvent.click(btn);
        // delete value.user.confirm_password;
        // delete value.user._id;
        // expect(axios.put).toHaveBeenCalled;
        expect(axios.put).toHaveBeenCalledWith("http://localhost:3000/api/users/update/66e14357f479e403672518ce", {   user_email: "tzivia@gmail.com",
            user_name: "tzivia@gmail.com",
            user_password: "tzivia@gmail.com"});
    });
    // test("test profile page When form submitted rejected and error show on document", async () => {
    //   const axiosError = {
    //     response: {
    //       data: {
    //         message: "user not exists",
    //       },
    //     },
    //   };

    //   axios.post.mockRejectedValue(axiosError);
    //   const { container } = render(<ProfileForm />, { wrapper : GlobalProvider });

    //   const elements = screen.getAllByTestId("inputAuth");

    //   for (let element of elements) {
    //     await userEvent.type(element, user[element.id]);
    //     expect(element.value).toBe(user[element.id]);
    //   }

    //   //  Btn click
    //   const btn = screen.getByRole("button", { name: "submit" });
    //   await userEvent.click(btn);

    //   delete user.user_name;

    //   expect(axios.post).toHaveBeenCalledWith(profileUrl, user, {withCredentials: true});

    //   const errorElement = container.querySelector("#error_result");

    //   expect(errorElement.innerHTML).toBe("user not exists");
    // });
});


// });

