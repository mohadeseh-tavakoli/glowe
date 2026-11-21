const toast=document.getElementById('toast');
let toastTimer;
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
const CART_KEY='gloweCart';
function parseLocalizedNumber(value){const normalized=String(value).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));return Number(normalized.replace(/[^0-9]/g,''))||0;}
function readCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch(e){return []}}
function saveCart(items){localStorage.setItem(CART_KEY,JSON.stringify(items));updateCartCount()}
function updateCartCount(){const count=readCart().reduce((s,p)=>s+p.qty,0);const el=document.getElementById('cartCount');if(el)el.textContent=count.toLocaleString('fa-IR')}
function addToCart(name,price){const items=readCart();const found=items.find(p=>p.name===name);if(found)found.qty++;else items.push({name,price,qty:1});saveCart(items);showToast(`${name} به سبد خرید اضافه شد.`)}
document.querySelectorAll('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.product-card');const name=btn.dataset.product||card?.querySelector('h3')?.textContent||'محصول';const raw=card?.querySelector('.price-row strong')?.innerText||'';const price=parseLocalizedNumber(raw);addToCart(name,price)}));
document.querySelectorAll('.heart').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('liked');btn.textContent=btn.classList.contains('liked')?'♥':'♡';showToast(btn.classList.contains('liked')?'به علاقه‌مندی‌ها اضافه شد.':'از علاقه‌مندی‌ها حذف شد.')}));
const searchForm=document.getElementById('searchForm');
if(searchForm)searchForm.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('searchInput').value.trim();if(document.querySelector('.shop-product-grid')){filterShop(q)}else if(document.getElementById('bestsellers')){const cards=[...document.querySelectorAll('#productGrid .product-card')];let count=0;cards.forEach(card=>{const match=!q||card.innerText.toLowerCase().includes(q.toLowerCase())||(card.dataset.search||'').toLowerCase().includes(q.toLowerCase());card.style.display=match?'':'none';if(match)count++});document.getElementById('bestsellers').scrollIntoView({behavior:'smooth'});showToast(q?(count?`${count} محصول پیدا شد.`:'محصولی پیدا نشد.'):'نمایش محصولات پرفروش')}else location.href='store.html'+(q?'?q='+encodeURIComponent(q):'')});
function filterShop(q){let count=0;document.querySelectorAll('.shop-product-grid .product-card').forEach(card=>{const match=!q||card.innerText.toLowerCase().includes(q.toLowerCase())||(card.dataset.search||'').toLowerCase().includes(q.toLowerCase());card.style.display=match?'':'none';if(match)count++});const c=document.querySelector('.shop-count');if(c)c.textContent=`${count.toLocaleString('fa-IR')} محصول`;}
const menu=document.getElementById('mobileMenu');if(menu)menu.addEventListener('click',()=>document.getElementById('mainNav')?.classList.toggle('open'));
document.querySelectorAll('.main-nav a,.story,.category-card,.text-link').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav')?.classList.remove('open')));
const newsletter=document.getElementById('newsletterForm');if(newsletter)newsletter.addEventListener('submit',e=>{e.preventDefault();const m=document.getElementById('newsletterMessage');if(m)m.textContent='ممنون! ایمیل شما ثبت شد (نمایشی).';e.target.reset()});
const grid=document.getElementById('productGrid');
const next=document.getElementById('productNext'),prev=document.getElementById('productPrev');
if(grid&&next)next.addEventListener('click',()=>grid.scrollBy({left:-260,behavior:'smooth'}));
if(grid&&prev)prev.addEventListener('click',()=>grid.scrollBy({left:260,behavior:'smooth'}));
updateCartCount();
// Apply search query when arriving from another page.
if(document.querySelector('.shop-product-grid')){const q=new URLSearchParams(location.search).get('q')||'';const input=document.getElementById('searchInput');if(input)input.value=q;if(q)filterShop(q)}
// Cart page rendering and quantity controls.
function renderCart(){const host=document.getElementById('cartItems');if(!host)return;const items=readCart();if(!items.length){host.innerHTML='<div class="cart-empty"><span>♡</span><h2>سبد خریدت هنوز خالی است.</h2><p>با دیدن محصولات فروشگاه، اولین انتخابت را به سبد اضافه کن.</p><a class="btn btn-burgundy" href="store.html">رفتن به فروشگاه ←</a></div>'}else{host.innerHTML=items.map((p,i)=>`<div class="cart-line"><div><h3>${escapeText(p.name)}</h3><p>${p.price ? p.price.toLocaleString('fa-IR')+' تومان' : 'قیمت پس از استعلام'} · تعداد: ${p.qty.toLocaleString('fa-IR')}</p></div><div><button data-remove="${i}" type="button">حذف</button><div style="display:flex;gap:6px;margin-top:8px"><button data-minus="${i}" type="button">−</button><button data-plus="${i}" type="button">+</button></div></div></div>`).join('')}
const total=items.reduce((s,p)=>s+p.price*p.qty,0);const fmt=items.some(p=>!p.price)?'پس از استعلام قیمت':' '+total.toLocaleString('fa-IR')+' تومان';const sub=document.getElementById('cartSubtotal'),tot=document.getElementById('cartTotal');if(sub)sub.textContent=fmt;if(tot)tot.textContent=fmt;
host.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{const a=readCart();a.splice(Number(b.dataset.remove),1);saveCart(a);renderCart()}));
host.querySelectorAll('[data-minus]').forEach(b=>b.addEventListener('click',()=>{const a=readCart(),i=Number(b.dataset.minus);a[i].qty--;if(a[i].qty<=0)a.splice(i,1);saveCart(a);renderCart()}));
host.querySelectorAll('[data-plus]').forEach(b=>b.addEventListener('click',()=>{const a=readCart();a[Number(b.dataset.plus)].qty++;saveCart(a);renderCart()}));
}
function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
renderCart();
const checkout=document.getElementById('checkoutButton');if(checkout)checkout.addEventListener('click',()=>showToast('اتصال به پرداخت در نسخه نمایشی فعال نیست.'));
const contactForm=document.getElementById('contactForm');if(contactForm)contactForm.addEventListener('submit',e=>{e.preventDefault();document.getElementById('contactMessage').textContent='پیام شما در این نسخه نمایشی ثبت شد. برای دریافت واقعی پیام باید فرم به سرویس ارسال متصل شود.';contactForm.reset()});

let detailQty=1;
const qtyValue=document.getElementById('productQty');
const qtyMinus=document.getElementById('qtyMinus'),qtyPlus=document.getElementById('qtyPlus');
if(qtyMinus)qtyMinus.addEventListener('click',()=>{detailQty=Math.max(1,detailQty-1);if(qtyValue)qtyValue.textContent=detailQty.toLocaleString('fa-IR')});
if(qtyPlus)qtyPlus.addEventListener('click',()=>{detailQty=Math.min(20,detailQty+1);if(qtyValue)qtyValue.textContent=detailQty.toLocaleString('fa-IR')});
const detailAdd=document.getElementById('detailAddCart');
if(detailAdd)detailAdd.addEventListener('click',()=>{const itemName='اسنس حلزون COSRX';const items=readCart();const found=items.find(p=>p.name===itemName);if(found)found.qty+=detailQty;else items.push({name:itemName,price:1280000,qty:detailQty});saveCart(items);showToast('محصول به سبد خرید اضافه شد.')});
