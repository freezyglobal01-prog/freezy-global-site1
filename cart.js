// cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(id){
  const product = products.find(p=>p.id===id);
  const cartItem = cart.find(item=>item.id===id);
  if(cartItem){
    cartItem.qty++;
  } else {
    cart.push({...product, qty:1});
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(id){
  cart = cart.filter(item=>item.id!==id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Update quantity
function updateQty(id, qty){
  const item = cart.find(i=>i.id===id);
  if(item){
    item.qty = qty;
    if(item.qty<=0) removeFromCart(id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Render cart items
function renderCart(){
  const container = document.getElementById("cartItems");
  if(!container) return;
  container.innerHTML = "";
  let total=0;
  cart.forEach(item=>{
    total += item.price*item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>₦${item.price} x <input type="number" value="${item.qty}" min="1" onchange="updateQty(${item.id},this.value)"></p>
      </div>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    container.appendChild(div);
  });
  const totalDiv = document.getElementById("cartTotal");
  if(totalDiv) totalDiv.textContent = `Total: ₦${total}`;
}

// Clear cart after checkout
function clearCart(){
  cart=[];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded",()=>{ renderCart(); });
