// const { response } = require("express");
const {
    createOrder,
    findOrderByUserId
} = require("../service/order.service.js");




exports.addOrder = async function (request, response) {
    const body = request.body;
    try {
      const order = await createOrder(body);
      response.status(201);
      response.json(order);
    } catch (error) {
    //   if (error.code === 11000) {
    //     return response.status(409).send("Account already exist");
    //   }
      return response.status(500).send(error);
    }
  };
exports.getOrdersByUserId=async function(request,response) {

    try{
      const id = request.params.userId;
      const orders = await findOrderByUserId(id);
        // if (!orders) {
        //   throw new Error("user dose not have orders");
        // }
        response.status(200)
        response.send(orders)
    }
    catch(error)
    {
        return response.status(500).send(error);
    }

}
  