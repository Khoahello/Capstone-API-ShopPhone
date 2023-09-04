$(document).ready(function($) {
	// Declare the body variable
	var $body = $("body");

	// Function that shows and hides the sidebar cart
	$(".cart-button, .close-button, #sidebar-cart-curtain, .checkout-button").click(function(e) {
		e.preventDefault();
		
		// Add the show-sidebar-cart class to the body tag
		$body.toggleClass("show-sidebar-cart");

		// Check if the sidebar curtain is visible
		if ($("#sidebar-cart-curtain").is(":visible")) {
			// Hide the curtain
			$("#sidebar-cart-curtain").fadeOut(500);
		} else {
			// Show the curtain
			$("#sidebar-cart-curtain").fadeIn(500);
		}
	});
	
	// Function that adds or subtracts quantity when a 
	// plus or minus button is clicked
	$body.on('click', '.plus-button, .minus-button', function () {
		// Get quanitity input values
		var qty = $(this).closest('.qty').find('.qty-input');
		var val = parseFloat(qty.val());
		var max = parseFloat(qty.attr('max'));
		var min = parseFloat(qty.attr('min'));
		var step = parseFloat(qty.attr('step'));

		// Check which button is clicked
		if ($(this).is('.plus-button')) {
			// Increase the value
			qty.val(val + step);
		} else {
			// Check if minimum button is clicked and that value is 
			// >= to the minimum required
			if (min && min >= val) {
				// Do nothing because value is the minimum required
				qty.val(min);
			} else if (val > 0) {
				// Subtract the value
				qty.val(val - step);
			}
		}
	});
});

function renderProductList(List) {
    var contentHTML_All = "";
    var contentHTML_Samsung = ""
    var contentHTML_Iphone = ""
    List.forEach((item) => {
        var trString =`
        <div class="col-lg-3">
        <div class="card text-center">
          <img
            class="card-img-top w-5"
            src="${item.img}"
            alt=""
          />
          <div class="card-body">
          <h4 class="card-title">${item.name}</h4>
          <h5 class="price">$${item.price}</h5>
            <a href="#thongTinSanPham" onclick="xemThongTin(${item.id})">
              <button class="btn btn-secondary">
                Xem thông tin
              </button></a
            >
          </div>
        </div>
      </div>
        `
        contentHTML_All += trString
        if (item.type == "Samsung") {
            contentHTML_Samsung += trString
        } else {
            contentHTML_Iphone += trString
        }
    });
    if (contentHTML_All.length == 0) {
      document.getElementById("tab-ALL").innerHTML = `<p class="emptyProduct">Không có sản phẩm</p>`
      document.getElementById("tab-Samsung").innerHTML = `<p class="emptyProduct">Không có sản phẩm</p>`
      document.getElementById("tab-Iphone").innerHTML = `<p class="emptyProduct">Không có sản phẩm</p>`
    } else {
      document.getElementById("tab-ALL").innerHTML = contentHTML_All
    }
    if (contentHTML_Samsung.length == 0) {
      document.getElementById("tab-Samsung").innerHTML = `<p class="emptyProduct">Không có sản phẩm</p>`
    } else {
      document.getElementById("tab-Samsung").innerHTML = contentHTML_Samsung
    }
    if (contentHTML_Iphone.length == 0) {
      document.getElementById("tab-Iphone").innerHTML = `<p class="emptyProduct">Không có sản phẩm</p>`
    } else {
      document.getElementById("tab-Iphone").innerHTML = contentHTML_Iphone
    }
}

function showThongTinSanPham(item) {
    var contentHTML = `
    <div id="flex" class="flex">
        <div class="w-1/2 h-full flex items-center">
        <img
          class="w-2/3 img"
          src="${item.img}"
          alt=""
        />
          </div>
          <div class="w-1/2 h-full flex flex-col justify-center space-y-5">
        <h2 class="text-5xl text-blue-600 name">${item.name}</h2>
        <div class="flex stars text-xl space-y-1">
          <p>5.0</p>
          <i class="las la-star"></i>
          <i class="las la-star"></i>
          <i class="las la-star"></i>
          <i class="las la-star"></i>
          <i class="las la-star"></i>
        </div>
        <div class="flex price">
          <h3 class="mr-1 text-3xl">Price:</h3>
          <h3 class="text-3xl" id="price">$${item.price}</h3>
        </div>
        <div class="space-y-2 info">
          <div class="flex desc">
            <p class="mr-1 text-xl">Type:</p>
            <p class="text-xl" id="desc">${item.type}</p>
          </div>
          <div class="flex desc">
            <p class="mr-1 text-xl">Desc:</p>
            <p class="text-xl" id="desc">${item.desc}</p>
          </div>
          <div class="flex desc">
            <p class="mr-1 text-xl">Screen:</p>
            <p class="text-xl" id="screen">${item.screen}</p>
          </div>
          <div class="flex desc back-camera">
            <p class="mr-1 text-xl">Back camera:</p>
            <p class="text-xl" id="backCamera">${item.backCamera}</p>
          </div>
          <div class="flex desc">
            <p class="mr-1 text-xl">Front camera:</p>
            <p class="text-xl" id="frontCamera">${item.frontCamera}</p>
          </div>
        </div>
        <div>
            <button class="shop inline-flex" onclick="themVaoGioHang(${item.id})">
                <i class="las la-cart-plus text-2xl"></i>
                <span class="text-lg">Thêm vào giỏ hàng</span>
            </button>
        </div>
    </div>
    `
    document.getElementById("showThongTinSanPham").innerHTML = contentHTML
}

function renderCart() {
    var contentHTML = ""
    for (var i = 0; i < cart.length; i++) {
      var data = cart[i]
      var contentTr = `
      <li class="product" id="product${data.id}">
      <a class="product-link">
        <span class="product-image">
          <img
            src="${data.img}"
            alt="Product Photo"
          />
        </span>
        <span class="product-details">
          <h3>${data.name}</h3>
          <span class="qty-price">
            <span class="qty">
              <button class="minus-button" id="minus-button-1" onclick="giamQuantity(${data.id})">-</button>
              <input
                type="number"
                id="qty-input-1"
                class="qty-input"
                step="1"
                min="1"
                max="1000"
                name="qty-input"
                value="${data.quantity}"
                pattern="[0-9]*"
                title="Quantity"
                inputmode="numeric"
                onchange="capNhatQuantity(${data.id})"
              />
              <button class="plus-button" id="plus-button-1" onclick="tangQuantity(${data.id})">+</button>

            </span>
            <span class="price">$${data.tinhGia(data.id)}</span>
          </span>
        </span>
      </a>
      <a href="#remove" class="remove-button" onclick="xoaCartItem(${data.id})"
        ><span class="remove-icon">X</span></a
      >
    </li>
      `
      contentHTML = contentHTML + contentTr
    }
    document.getElementById("cartItem").innerHTML = contentHTML
}

function startLoading() {
  document.getElementById("spinner").style.display = "flex"
}

function endLoading() {
  document.getElementById("spinner").style.display = "none"
}

function layThongTin(list, index) {
  //   lấy thông tin
  var _id = list[index].id
  var _name = list[index].name
  var _img = list[index].img
  var _price = list[index].price
  var _quantity = 1
  var item = new CartItem(_id, _name, _img, _price, _quantity);
  return item;
}

function timViTri(id) {
  axios({
      url:"https://64d6fc0c2a017531bc12e978.mockapi.io/product",
      method: "GET",
  })
      .then(function (res) {
          list = res.data
      })
      .catch(function (err){
          
      });
  return list.findIndex(function(item) {
    return item.id == id
  })
}

function timViTriCartItem(id) {
  return cart.findIndex(function(item) {
      return item.id == id
  })
}

function cartTotal() {
var cartTotalPrice = 0
for (var i = 0; i < cart.length; i++) {
  cartTotalPrice = cartTotalPrice + cart[i].tinhGia()
  }
document.getElementById("total-money").innerText = `$${cartTotalPrice}`
}

function showThongBaoSLCartItem() {
document.querySelector(".bag-count").innerHTML = document.querySelector(".count").innerHTML = cart.length
}

function thongBaoGioHangTrong() {
if(cart.length == 0) {
  document.getElementById("cartItem").innerHTML =  `<p class="text-white mt-48 justify-center text-center">Giỏ hàng của bạn đang trống</p>`
  }
}

function showThongBaoAlert(payTotal) {
  if (cart.length == 0) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `Bạn không thể thanh toán khi giỏ hàng trống`,
      showConfirmButton: false,
      timer: 3000,
    })
  } else {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Bạn đã thanh toán ${payTotal}`,
      showConfirmButton: false,
      timer: 3000,
    })
  }
}

function showThongBaoLoiQuantity(id, name) {
  Swal.fire({
    title: 'Bạn muốn bỏ sản phẩm này ra khỏi giỏ hàng?',
    text: `${name}`,
    showDenyButton: true,
    confirmButtonText: 'Có',
    denyButtonText: `Không`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      console.log("Yes");
      var indexCartItem = timViTriCartItem(id)
      cart.splice(indexCartItem, 1)
      var jsonData = JSON.stringify(cart);
      localStorage.setItem("cart", jsonData);
      renderCart()
      cartTotal()
      showThongBaoSLCartItem()
      thongBaoGioHangTrong()
    } else if (result.isDenied) {
      console.log("No");
      var inputQuantity = 1
      var indexCartItem = timViTriCartItem(id)
      cart[indexCartItem].quantity = inputQuantity
      var jsonData = JSON.stringify(cart);
      localStorage.setItem("cart", jsonData);
      renderCart()
      cartTotal()
    }
  })
}