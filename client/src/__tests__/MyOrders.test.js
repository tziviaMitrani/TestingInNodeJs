import { render, act } from "@testing-library/react";
import MyOrders from "../components/pages/privateRoutes/MyOrders";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import GlobalProvider, { GlobalContext } from "../context/GlobalContext";
const orderObject = {
    data: [
        {
            _id: "66e14357f479e403672518ce",
            order_date: "15.9.2024",
            order_products: [
                { id: '1', quentity: 1 },
                { id: '2', quentity: 1 }],
            order_price: "16",
            user_id: "66d982b5f2c2725687d014f5",
        }
    ]
}
const value={
    user: {
        user_name: "johndoe",
        user_email: "Dan@gmail.com",
        _id:"66e14357f479e403672518ce"
    }
}

jest.mock("axios");
describe("test my order component",  () => {
    axios.get.mockResolvedValue({ data: orderObject });
afterEach(()=>{
    jest.clearAllMocks();
})
    test("test that get user orders",async () => {

        await act(async () =>
            render(
                <GlobalContext.Provider value={value}>
                    <MyOrders />
                </GlobalContext.Provider>
            )
        );
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/api/users/orders/66e14357f479e403672518ce");
    })

})
