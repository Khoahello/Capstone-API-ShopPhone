function CartItem (_id, _name, _img, _price, _quantity) {
    this.id = _id
    this.name = _name;
    this.img = _img;
    this.price = _price;
    this.quantity = 1;
    this.tinhGia = function() {
      return (this.price * this.quantity)
    }
  }