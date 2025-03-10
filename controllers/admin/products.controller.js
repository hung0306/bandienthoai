const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status); //
  //req.query là lấy sau dấu ?
  const fillterStatus = fillterStatusHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // tim kiem
  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // tim kiem

  //pagination
  const countProduct = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProduct
  );
  //end pagination
  // console.log(req.query.page);

  // limit là số sp 1 trang, skip là vị trí bắt đầu lấy(trang ht - 1) * limit)

  // sort

  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }

  // end sort
  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  // console.log( products);
  res.render("admin/pages/products/index", {
    pageTitle: "hehe",
    products: products,
    fillterStatus: fillterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id

module.exports.changeStatus = async (req, res) => {
  // console.log(req.params);
  //req.param là lấy đựơc các biến động ở trên url
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  //thong bao
  req.flash("success", "cap nhat thanh cong");

  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  // console.log(req.body);
  // req.body là lấy được các giá trị người dùng gửi lên thông qua form
  const type = req.body.type;

  //chuyen thanh mang
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", "cap nhat thanh cong");
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", "cap nhat thanh cong");
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deleteAt: new Date() }
      );
      req.flash("success", "xoa thanh cong");
      break;
    case "change-position":
      // console.log(ids);
      for (const item of ids) {
        //hien tai item tra ve dang id-position nen ta se tach id va position ra va cho vao 1 mang
        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(item);
        // console.log(id);
        // console.log(position);
        await Product.updateMany({ _id: id }, { position: position });
      }
      req.flash("success", "cap nhat thanh cong");
      break;

    default:
      break;
  }
  // console.log(ids);
  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id  xóa vĩnh viễn

// module.exports.deleteItem = async(req,res) =>{
//     // console.log(req.params);

//     const id = req.params.id;
//     await Product.deleteOne({_id: id});
//     res.redirect("back")

// };

// [DELETE] /admin/products/delete/:id   xoá mềm
module.exports.deleteItem = async (req, res) => {
  // console.log(req.params);

  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true, deleteAt: new Date() });
  res.redirect("back");
};

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "them san pham",
  });
};

// [POST]  /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countproduct = await Product.countDocuments();

    // console.log(countproduct);

    req.body.position = countproduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  // console.log(req.body);
  // console.log(req.file);
  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  // console.log(req.params.id);
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);

    res.render("admin/pages/products/edit", {
      pageTitle: "sua san pham",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

//[PATCH] /admin/products/edit/:id

module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  req.body.position = parseInt(req.body.position);

  // console.log(req.body);
  // console.log(req.file);

  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "cap nhat thanh cong");
  } catch (error) {
    req.flash("error", "cap nhat 0 thanh cong");
  }

  res.redirect(`back`);
};

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  // console.log(req.params.id);
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);

    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
