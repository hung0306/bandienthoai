const Product = require("../../models/product.model");
module.exports.index = async(req, res) => {
    const products = await Product.find({
        status: "active",
        delete: false
    });
    const newProduct = products.map(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })
    console.log(newProduct);
    res.render("client/pages/products/index", {
        pageTitle: "trang ds sp",
        products :newProduct
    });
}