const toast=document.getElementById('toast');
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
let cart=0;
document.querySelectorAll('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{cart++;document.getElementById('cartCount').textContent=cart.toLocaleString('fa-IR');showToast(`${btn.dataset.product} به سبد خرید اضافه شد.`)}));
document.querySelectorAll('.heart').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('liked');btn.textContent=btn.classList.contains('liked')?'♥':'♡';showToast(btn.classList.contains('liked')?'به علاقه‌مندی‌ها اضافه شد.':'از علاقه‌مندی‌ها حذف شد.')}));

document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('searchInput').value.trim().toLowerCase();let count=0;document.querySelectorAll('.product-card').forEach(card=>{const match=!q||card.dataset.search.toLowerCase().includes(q)||card.innerText.toLowerCase().includes(q);card.style.display=match?'':'none';if(match)count++});document.getElementById('bestsellers').scrollIntoView({behavior:'smooth'});showToast(q?(count?`${count} محصول پیدا شد.`:'محصولی پیدا نشد.'):'نمایش محصولات پرفروش')});
document.getElementById('mobileMenu').addEventListener('click',()=>document.getElementById('mainNav').classList.toggle('open'));
document.getElementById('cartButton').addEventListener('click',()=>showToast(cart?`${cart.toLocaleString('fa-IR')} محصول در سبد خرید داری.`:'سبد خریدت هنوز خالی است.'));
document.querySelector('.user-action').addEventListener('click',()=>showToast('بخش ورود کاربر در نسخه نمایشی فعال نیست.'));
document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsletterMessage').textContent='ممنون! ایمیل شما ثبت شد (نمایشی).';e.target.reset()});
document.querySelectorAll('.main-nav a,.story,.category-card,.text-link').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('open')));
const grid=document.getElementById('productGrid');
document.getElementById('productNext').addEventListener('click',()=>grid.scrollBy({left:-260,behavior:'smooth'}));
document.getElementById('productPrev').addEventListener('click',()=>grid.scrollBy({left:260,behavior:'smooth'}));
