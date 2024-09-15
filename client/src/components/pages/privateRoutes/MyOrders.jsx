import React, { useContext, useEffect, useState } from 'react'
import { getProducts, getProductsById, getUserOrders } from '../../../actions';
import { GlobalContext } from '../../../context/GlobalContext';
import axios from 'axios';

export default function MyOrders() {
  const { user } = useContext(GlobalContext)
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");


  useEffect(()=>{
    getRequest
  },[])
  async function getRequest() {
    try {
      console.log("1")
      // const {result} = await getUserOrders(user._id)
      const response = await getUserOrders(user._id)
      if (response.success === false) throw response.error;
      const userOrders = await Promise.all(response.map(async (obj) => {
        const products = await Promise.all(obj.order_products.map(async (item) => {
          const product = await getProductsById(item.id);
          return { ...product, quantity: item.quantity };
        }));
        return { ...obj, products: products };
      }));
      setOrders(userOrders)
      console.log(Promise.all(userOrders[0].products))


    } catch (error) {
      setError("Orders not exists!")
    }
  }

  useEffect(() => {
    getRequest()
  }, [])
  return (
    <div>
      {orders.map((order) => (
        <div key={order._id} className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
          <div
            className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
            <h5 className="font-manrope font-semibold text-3xl leading-10 text-white sm:text-right mt-3">
              ordered on: {order.order_date}
            </h5>

            {order.products.map((product) => (
              <div key={product.id} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                  <img src={product.thumbnail} alt="Skin Care Kit image" className="w-full rounded-xl" />
                </div>
                <div className="">
                  <h5 className="font-manrope font-semibold text-2xl leading-9 text-white mb-6">{product.title}
                  </h5>
                  <p className="font-normal text-xl leading-8 text-gray-500">Quantity : <span
                    className="text-white font-semibold">{product.quantity}</span></p>
                    <p className="font-normal text-xl leading-8 text-gray-500">Price : <span
                    className="text-white font-semibold">{product.price}</span></p>
                </div>
              </div>
            ))}
          </div>
          <h5 className="font-manrope font-semibold text-3xl leading-10 text-white sm:text-right mt-3">
           Total price: ${order.order_price}
          </h5>
        </div>
      ))}
    </div>

  );
}







