import { ProductsDao } from "./containerCreator";
class ProductsDto {
  products: any;
  constructor() {
    this.products = ProductsDao;
  }
  getAll() {
    return this.products.getAll();
  }
  push(producto) {
    this.products.save(producto);
  }
  update(id, producto) {
    return this.products.update(id, producto);
  }
  delete(id) {
    let product = this.products.getById(id);
    this.products.deleteById(id);
    return product;
  }
  get(id) {
    return this.products.getById(id);
  }
}

const productsDto = new ProductsDto();
export default productsDto;
