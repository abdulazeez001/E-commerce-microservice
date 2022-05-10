import ProductModel from './data/models/Product';

const productsName = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'];

const products = productsName.map((name) => ({
  name,
  description: `Description for ${name}`,
  price: 5000,
}));

export default function seed() {
  ProductModel.deleteMany({})
    .then(() => {
      ProductModel.insertMany(products).then(function () {
        console.log('Products inserted');
      });
    })
    .catch(function (error) {
      console.log('Products already inserted');
    });
}
