// cart.js - floating cart & quantity
function updateFloatingCart(){
  const cart=JSON.parse(localStorage.getItem("cart"))||[];
  const cartBtn=document.getElementById("floatingCart");
  if(cart.length>0){
    cartBtn.style.display="block";
    let count=0; cart.forEach(p=>count+=p.qty);
    document.getElementById("cartCount").innerText=count;
  } else cartBtn.style.display="none";
}

function addToCart(id, productsList){
  const product=productsList.find(p=>p.id===id);
  const qty=parseInt(document.getElementById(`qty-${id}`).innerText);
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  const exist=cart.find(c=>c.id===id);
  if(exist) exist.qty+=qty; else cart.push({...product,qty});
  localStorage.setItem("cart",JSON.stringify(cart));
  updateFloatingCart();
}

function changeQty(id){
  const span=document.getElementById(`qty-${id}`);
  let val=parseInt(span.innerText);
  if(val<1) val=1; span.innerText=val;
}

updateFloatingCart();  const container = document.getElementById("cartItems");
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
