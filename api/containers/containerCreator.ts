import { MessagesDaoSQL } from "../daos/messagesDaoSQL";
import { ProductsDaoSQL } from "../daos/productsDaoSQL";
import { MessagesDaoMongo } from "../daos/messagesDaoMongo";
import { ProductsDaoMongo } from "../daos/productsDaoMongo";

export let ProductsDao;
export let MessagesDao;

switch (process.env.STORAGE_MODE) {
  case "MONGO":
    ProductsDao = new ProductsDaoMongo();
    MessagesDao = new MessagesDaoMongo();
    break;
  case "SQL":
    ProductsDao = new ProductsDaoSQL();
    MessagesDao = new MessagesDaoSQL();
    break;

  default:
    console.log("No storage mode specified");
}
