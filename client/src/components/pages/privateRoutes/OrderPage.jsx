import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { GlobalContext } from '../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function OrderPage() {

    const { isAuth } = useContext(GlobalContext);
    const navigate = useNavigate();
    const { user, cart, totalProduct, totalPrice } =
        useContext(GlobalContext);
    const url = "http://localhost:3000/api/users/orders/addOrder";

    async function handlePurchase() {
        if (!isAuth) {
            toast("you have to Login before Purchase")
            navigate("/login")
        }
        else {
            
            toast("You are transferred to payment")
            const allProduct = cart.map(({ id, quantity }) => ({ id, quantity }))
            const currentOrder = {
                order_date: new Date().toLocaleDateString(),
                order_price: totalPrice,
                order_products: allProduct,
                user_id: user._id
            }
            await axios.post(url, currentOrder)
            navigate("/pay")
        }

    }
    return (
        <section className="py-24 relative">

            <div>
                {cart.map((product) => (
                    <div key={product.id} className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                        <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                            <img src={product.thumbnail} alt="Skin Care Kit image" className="w-full rounded-xl" />
                        </div>
                        <div
                            className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                            <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                                <div className="">
                                    <h5 className="font-manrope font-semibold text-2xl leading-9 text-white mb-6">{product.title}
                                    </h5>
                                    <p className="font-normal text-xl leading-8 text-gray-500">Quantity : <span
                                        className="text-white font-semibold">{product.quantity}</span></p>
                                </div>

                                <h5 className="font-manrope font-semibold text-3xl leading-10 text-white sm:text-right mt-3">
                                    ${product.price}
                                </h5>
                            </div>
                        </div>
                    </div>))}

                <div className="flex items-center justify-center sm:justify-end w-full my-6">
                    <div className=" w-full">

                        <div className="flex items-center justify-between mb-6">
                            <p className="font-normal text-xl leading-8 text-white">Shipping Charge</p>
                            <p className="font-semibold text-xl leading-8 text-indigo-900">$60.00</p>
                        </div>

                        <div className="flex items-center justify-between py-6 border-y border-gray-100">
                            <p className="font-manrope font-semibold text-2xl leading-9 text-white">Total</p>
                            <p className="font-manrope font-bold text-2xl leading-9 text-indigo-600">{totalPrice + 60}</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center mx-auto'>
                    <button aria-label='payButton' onClick={handlePurchase} className="btn btn-wide btn-active btn-secondary">Purchase</button>
                </div>
            </div>
        </section>
    )
}
