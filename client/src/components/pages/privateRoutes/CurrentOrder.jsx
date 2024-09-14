import React, { useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalContext';

export default function CurrentOrder() {
    const { cart, totalProduct, totalPrice, removeFromCart } =
        useContext(GlobalContext);
    return (
        <div>
            {cart.map((product) => (
                <div key={product.id} className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                    <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                        <img   src={product.thumbnail} alt="Skin Care Kit image" className="w-full rounded-xl" />
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
                
        </div>)




}

//     cart.map((product) => (
//         <div key={product.id} className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center">
//             <img
//               src={product.thumbnail}
//               className="w-16 h-16 p-2 shrink-0 bg-gray-200 rounded-md"
//             />
//             <div className="ml-4">
//               <p className="text-sm text-gray-800">{product.title}</p>
//               <div className="flex gap-2 mt-2">
//                 <button
//                 onClick={() => addToCart(product)}
//                   type="button"
//                   className="w-5 h-5 text-sm focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//                 >
//                   +
//                 </button>

//                 <p className="text-gray-500 text-xs mt-1">
//                   {product.quantity}
//                 </p>
//                 <button
//                 onClick={() => removeFromCart(product.id)}
//                   type="button"
//                   className="w-5 h-5 text-sm focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
//                 >
//                   -
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <span className="text-base font-bold text-gray-800 mr-4">
//               ${product.price}
//             </span>
//             <MdDeleteForever
//               size={25}
//               onClick={() => deleteFromCart(product.id)}
//               className=" fill-red-500 inline cursor-pointer"
//             />
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* Before Footer */}
//     <div className="flex mt-6">
//       <span className="text-base font-bold text-gray-800 flex-1">
//         Total
//       </span>
//       <span className="text-base font-bold text-gray-800">
//         ${totalPrice}
//       </span>
//     </div>

//     <div>Current Order</div>
//   )
// }
