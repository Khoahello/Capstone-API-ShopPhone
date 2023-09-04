cart = [];

var jsonData = localStorage.getItem("cart");
if (jsonData != null) {
  var list = JSON.parse(jsonData);
  cart = list.map(function (item) {
    return new CartItem(
      item.id,
      item.name,
      item.img,
      item.price,
      item.quantity
    );
  });
  showThongBaoSLCartItem();
  renderCart(cart);
  cartTotal();
}

function fetchProductList() {
  startLoading();
  axios({
    url: "https://64d6faeb2a017531bc12e738.mockapi.io//product",
    method: "GET",
  })
    .then(function (res) {
      list = res.data;
      renderProductList(list);
      endLoading();
    })
    .catch(function (err) {
      endLoading();
    });
}

fetchProductList();

function xemThongTin(id) {
  axios({
    url: "https://64d6faeb2a017531bc12e738.mockapi.io//product",
    method: "GET",
  })
    .then(function (res) {
      list = res.data;
    })
    .catch(function (err) {});
  index = timViTri(id);
  var item = list[index];
  showThongTinSanPham(item);
}

function themVaoGioHang(id) {
  axios({
    url: "https://64d6faeb2a017531bc12e738.mockapi.io//product",
    method: "GET",
  })
    .then(function (res) {
      list = res.data;
    })
    .catch(function (err) {});
  var indexCart = timViTriCartItem(id);
  if (indexCart == -1) {
    console.log("oh yes");
    var indexList = timViTri(id);
    var item = layThongTin(list, indexList);
    cart.push(item);
  } else {
    cart[indexCart].quantity++;
  }
  var jsonData = JSON.stringify(cart);
  localStorage.setItem("cart", jsonData);
  renderCart();
  showThongBaoSLCartItem();
  cartTotal();
}

function capNhatQuantity(id) {
  var inputQuantity = document.querySelector(`#product${id} input`).value;
  var name = document.querySelector(`#product${id} h3`).innerText;
  if (inputQuantity < 1) {
    showThongBaoLoiQuantity(id, name);
  } else {
    var indexCartItem = timViTriCartItem(id);
    cart[indexCartItem].quantity = inputQuantity;
    var jsonData = JSON.stringify(cart);
    localStorage.setItem("cart", jsonData);
    renderCart();
    cartTotal();
  }
}

function giamQuantity(id) {
  var indexCartItem = timViTriCartItem(id);
  var name = cart[indexCartItem].name;
  cart[indexCartItem].quantity--;
  if (cart[indexCartItem].quantity < 1) {
    showThongBaoLoiQuantity(id, name);
  } else {
    var jsonData = JSON.stringify(cart);
    localStorage.setItem("cart", jsonData);
    renderCart();
    cartTotal();
  }
}

function tangQuantity(id) {
  var indexCartItem = timViTriCartItem(id);
  cart[indexCartItem].quantity++;
  var jsonData = JSON.stringify(cart);
  localStorage.setItem("cart", jsonData);
  renderCart();
  cartTotal();
}

function xoaCartItem(id) {
  var indexCartItem = timViTriCartItem(id);
  cart.splice(indexCartItem, 1);
  var jsonData = JSON.stringify(cart);
  localStorage.setItem("cart", jsonData);
  renderCart();
  cartTotal();
  showThongBaoSLCartItem();
  thongBaoGioHangTrong();
}

function clearCart() {
  cart = [];
  var jsonData = JSON.stringify(cart);
  localStorage.setItem("cart", jsonData);
  renderCart();
  cartTotal();
  showThongBaoSLCartItem();
  thongBaoGioHangTrong();
}

function payCart() {
  var payTotal = document.getElementById("total-money").innerText;
  showThongBaoAlert(payTotal);
  cart = [];
  var jsonData = JSON.stringify(cart);
  localStorage.setItem("cart", jsonData);
  renderCart();
  cartTotal();
  thongBaoGioHangTrong();
  showThongBaoSLCartItem();
}

thongBaoGioHangTrong();
