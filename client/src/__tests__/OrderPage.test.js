import { render, screen } from "@testing-library/react";
import OrderPage from "../components/pages/privateRoutes/OrderPage";
import { GlobalContext } from "../context/GlobalContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import *as router from "react-router";
import { useContext } from "react";
import axios from "axios";

let value = {
    isAuth:true,
    cart: [{
        id: 1,
        title: "Essence Mascara Lash Princess",
        price: 9.99,
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
    }],
    totalPrice: 9.99,
    user: {

        user_email: "johndoe@gmail.com",
        user_name: "johndoe",
        user_password: "$2b$10$mLrSCpej7tikhXiIYi2b0eLSWOdeUSGpwn.SynLpCqOl5IdME0c4q"
    }
}

const currentOrder = {
    order_date: new Date().toLocaleDateString(),
    order_price: 9.99,
    order_products: [{
        id: 1,
        quantity:1
    }],
    user_id: "66e14357f479e403672518ce"
}

const mockedNavigation = jest.fn();

jest.spyOn(router, "useNavigate").mockImplementation(() => mockedNavigation);

jest.mock("axios");

describe("test orderpage componnent", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    test("test a situation that an offline user clicks to pay", async () => {
        value = { ...value, isAuth: false }
        render(
            <GlobalContext.Provider value={value}>
                <MemoryRouter>
                    <OrderPage />
                </MemoryRouter>
            </GlobalContext.Provider>
        );
        const btn = screen.getByRole("button", { name: "payButton" });
        // const btn = screen.getByTestId("payButton");
        await userEvent.click(btn)

        expect(mockedNavigation).toHaveBeenCalled();
        expect(mockedNavigation).toHaveBeenCalledWith("/login");

    })
    test("test click button when user  auth", async () => {
        value = { ...value, isAuth: true }

        render(
            <GlobalContext.Provider value={value}>
                <MemoryRouter>
                    <OrderPage />
                </MemoryRouter>
            </GlobalContext.Provider>
        );
        const btn = screen.getByRole("button", { name: "payButton" });
        await userEvent.click(btn)
        expect(mockedNavigation).toHaveBeenCalled();
        expect(mockedNavigation).toHaveBeenCalledWith("/pay");

    })

    test("test click button when user is auth and send post reqest", async () => {

        axios.post.mockResolvedValue({
            data: { message: "the request send succeesfully" },
          });

        render(
            <GlobalContext.Provider value={value}>
                <MemoryRouter>
                    <OrderPage />
                </MemoryRouter>
            </GlobalContext.Provider>
        );
   
        const btn = screen.getByRole("button", { name: "payButton" });
        await userEvent.click(btn)

        expect(axios.post).toHaveBeenCalled;
    })
});
