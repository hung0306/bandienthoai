const Product = require("../../models/product.model");

//[GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });
  const newProduct = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  // console.log(newProduct);
  res.render("client/pages/products/index", {
    pageTitle: "trang ds sp",
    products: newProduct,
  });
};

//[GET] /products/:slug
module.exports.detail = async (req, res) => {
  // console.log(req.params.slug);

  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
    };
    const product = await Product.findOne(find);
    console.log(product);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
