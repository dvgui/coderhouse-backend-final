const socket = io.connect();
const author = new normalizr.schema.Entity("authors");

const messageSchema = new normalizr.schema.Entity("messages", {
  id: author,
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const validarEntrada = () => {
  let price = document.getElementById("price").value;
  if (!isNumeric(price)) {
    document.getElementById("send").disabled = true;
  } else {
    document.getElementById("send").disabled = false;
  }
};

function addMessage(e) {
  let date = new Date();
  let formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const message = {
    author: {
      mail: document.getElementById("username").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      age: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
      date: formattedDate,
    },
    text: document.getElementById("message-text").value,
  };
  console.log(message);
  socket.emit("new-message", message);
  return false;
}
const render = (products) => {
  if (!document.getElementById("table-container")) {
    return;
  }
  if (products.length === 0) {
    document.getElementById(
      "table-container"
    ).innerHTML = `<h3 class="alert alert-danger">no products found</h3>`;
    return;
  }
  document.getElementById(
    "table-container"
  ).innerHTML = `<table id="table" class="table table-dark">
        <tr><th>Name</th> <th>Precio</th> <th>Imagen</th> </tr>`;

  let html = products
    .map(function (product, index) {
      return `<tr>
        <td>${product.title}</td>
        <td>${product.price}</td> 
        <td><img class="img-responsive" src="${product.thumbnail}" alt="${product.title}"></td>
    </tr>`;
    })
    .join("");

  document.getElementById("table").innerHTML += html;
};

const messageRender = (normalizedMessages) => {
  if (!document.getElementById("message-container")) {
    return;
  }
  const messages = normalizr.denormalize(
    normalizedMessages.result,
    messageSchema,
    normalizedMessages.entities
  );
  if (messages.length === 0) {
    document.getElementById(
      "message-container"
    ).innerHTML = `<h3 class="alert alert-danger">no messages found</h3>`;
    return;
  }
  let html = Object.values(messages)
    .map(function (message, index) {
      if (message === undefined) {
        return;
      }
      return `<div class="flex">
            <div class="d-flex">
            <p class="author">${message.author.mail}</p>
            <p class="date">[${message.author.date}]:</p>
            <p class="message"> ${message.text}</p>
            <img style="max-height : 40px"class="img-fluid" src="${message.author.avatar}" alt="${message.author.mail}'s avatar">
            </div>
        </div>`;
    })
    .join("");
  document.getElementById("message-container").innerHTML = html;
  let compression =
    (100 * JSON.stringify(messages).length) /
    JSON.stringify(normalizedMessages).length;
  document.getElementById(
    "compression"
  ).innerHTML = `Compression rate is ${compression}%`;
};
socket.on("error", () => {
  document.getElementById("error-container").innerHTML =
    '<h1 class="title">Product format error</h2>';
});
socket.on("mailError", () => {
  document.getElementById("mailError-container").innerHTML =
    '<h1 class="title">Message format error. Check that age is numeric</h2>';
});
socket.on("messages", (data) => {
  if (!document.getElementById("mailError-container")) {
    return;
  }
  console.log(data.entities.messages);
  messageRender(data);
  document.getElementById("mailError-container").innerHTML = "";
  document.getElementById("message-text").value = "";
  document.getElementById("message-text").focus();
});
socket.on("products", (data) => {
  render(data);
  if (document.getElementById("error-container")) {
    document.getElementById("error-container").innerHTML = "";
  }
});
const addProduct = (e) => {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("image").value,
  };
  socket.emit("product", product);
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  document.getElementById("title").focus();
  return false;
};
