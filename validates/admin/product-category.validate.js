module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "nhap tieu de");
    res.redirect("back");
    return;
  }
  //   if (!req.body.title.length < 8) {
  //     req.flash("error", "nhap tieu de lon hon 8 ki tu");
  //     res.redirect("back");
  //     return;
  //   }
  next();
};
