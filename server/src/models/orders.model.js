const mongoose = require("mongoose") ;

const orderSchema = new mongoose.Schema(
  {
    order_date: { type: String, required: true, },
    order_price: { type: String, required: true },
    order_products: { type: Array, required: true },
    user_id: {type:String , required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
