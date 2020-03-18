const fs = require("fs");
const path = require("path");

const getProductById = (request, response) => {
  const stringIds = Object.values(request.query)[0];
  const ids = stringIds.slice(1, stringIds.length - 1).split(",");

  const filePath = path.join(
    __dirname,
    "../../../",
    "db",
    "products",
    "all-products.json"
  );

  const allProducts = JSON.parse(
    fs.readFileSync(filePath, (err, data) => {
      if (err) {
        return console.log(err);
      }
    })
  );

  const products = allProducts.filter(elem => {
    return ids.find(item => elem.id == item);
  });

  if (products.length > 0) {
    response.writeHead(200, {
      "Content-Type": "aplication/json"
    });
    response.write(JSON.stringify({ status: "success", products }));
    response.end();
    return;
  } else {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ status: "no products", products }));
    response.end();
    return;
  }
};

module.exports = getProductById;