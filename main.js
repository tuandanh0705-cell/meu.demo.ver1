// ── Navbar scroll
const nb=document.getElementById('navbar');
window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',scrollY>60));

// ── Scroll reveal
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>rv.observe(el));

// ── Counter
let counted=false;
const co=new IntersectionObserver(es=>{
  if(es[0].isIntersecting&&!counted){
    counted=true;
    document.querySelectorAll('.cnt').forEach(el=>{
      const t=+el.dataset.target,s=el.dataset.suffix||'';
      let c=0;const step=t/60;
      const id=setInterval(()=>{c=Math.min(c+step,t);el.textContent=Math.floor(c).toLocaleString('vi-VN')+(c>=t?s:'');if(c>=t)clearInterval(id)},1600/60);
    });
  }
},{threshold:.25});
const fc=document.querySelector('.cnt');
if(fc)co.observe(fc.closest('section')||fc);

// ── Category filter
function filterCat(el){document.querySelectorAll('.cat-filter-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');}

// ── Mobile menu
function openMenu(){document.getElementById('mobileNav').classList.add('open');document.body.style.overflow='hidden';}
function closeMenu(){document.getElementById('mobileNav').classList.remove('open');document.body.style.overflow='';}

// ── Hero Carousel
let heroIdx=0;
const heroSlides=document.querySelectorAll('.hero-slide');
const heroDots=document.querySelectorAll('#heroDots .hero-dot');
function heroShow(i){
  if(heroSlides.length===0) return;
  heroSlides[heroIdx].classList.remove('active');
  heroDots[heroIdx].classList.remove('active');
  heroIdx=(i+heroSlides.length)%heroSlides.length;
  heroSlides[heroIdx].classList.add('active');
  heroDots[heroIdx].classList.add('active');
}
function heroMove(d){heroShow(heroIdx+d);}
function heroGo(i){heroShow(i);}
const heroSec = document.getElementById('heroSection');
if (heroSec) {
  let heroTimer=setInterval(()=>heroMove(1),5000);
  heroSec.addEventListener('mouseenter',()=>clearInterval(heroTimer));
  heroSec.addEventListener('mouseleave',()=>{heroTimer=setInterval(()=>heroMove(1),5000);});
}

// ── Testimonials Slider
let testiIdx=0;
const testiSlides=document.querySelectorAll('#testiSlider .testi-slide');
const testiDots=document.querySelectorAll('#testiDots .testi-dot');
function testiShow(i){
  if(testiSlides.length===0) return;
  testiSlides[testiIdx].classList.remove('active');
  testiDots[testiIdx].classList.remove('active');
  testiIdx=(i+testiSlides.length)%testiSlides.length;
  testiSlides[testiIdx].classList.add('active');
  testiDots[testiIdx].classList.add('active');
}
function testiMove(d){testiShow(testiIdx+d);}
function testiGo(i){testiShow(i);}
setInterval(()=>testiMove(1),4000);

// ── Cart System (Redirect to cart.html)
function getCartItems() {
  try { return JSON.parse(localStorage.getItem('cartItems')) || []; } catch(e) { return []; }
}

function updateCartBadge() {
  const items = getCartItems();
  document.querySelectorAll('.nav-cart-badge').forEach(b => b.textContent = items.length);
}

function initCartNav() {
  // Attach click to all nav cart icons to redirect to cart.html
  document.querySelectorAll('.nav-cart-badge').forEach(badge => {
    const btn = badge.closest('.nav-icon-btn');
    if (btn) {
      btn.addEventListener('click', () => { window.location.href = 'cart.html'; });
      btn.style.cursor = 'pointer';
    }
  });
  updateCartBadge();
}

window.addToCart = function(e, item) {
  if (e) e.stopPropagation();
  
  const items = getCartItems();
  items.push(item);
  localStorage.setItem('cartItems', JSON.stringify(items));
  
  updateCartBadge();
  
  if (e && e.currentTarget) {
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Đã thêm';
    const oldBg = btn.style.background;
    const oldCol = btn.style.color;
    btn.style.background = 'var(--navy)';
    btn.style.color = '#fff';
    setTimeout(() => { 
      btn.innerHTML = orig; 
      btn.style.background = oldBg; 
      btn.style.color = oldCol; 
    }, 1800);
  }
}

// ── Auth System (Mock)
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navRights = document.querySelectorAll('.nav-right');
  
  // Default data
  let userData = { name: 'Học viên Ecom', email: 'hocvien@example.com', phone: '0987654321', avatarName: 'HV' };
  try {
    const saved = JSON.parse(localStorage.getItem('userData'));
    if (saved) userData = { ...userData, ...saved };
  } catch(e){}

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=ef4b28&color=fff&bold=true`;

  if (isLoggedIn) {
    navRights.forEach(nr => {
      const loginBtn = nr.querySelector('.nav-btn-login');
      const signupBtn = nr.querySelector('.nav-btn-enroll');
      if (loginBtn) loginBtn.style.display = 'none';
      if (signupBtn) signupBtn.style.display = 'none';
      
      if (!nr.querySelector('.nav-user-profile')) {
        const profile = document.createElement('div');
        profile.className = 'nav-user-profile';
        profile.style.cssText = 'display:flex; align-items:center; gap:8px; cursor:pointer; margin-left:12px; position:relative;';
        profile.innerHTML = `
          <img src="${avatarUrl}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; border:2px solid #e2e8f0;">
          <span style="font-weight:600; font-size:0.9rem; color:var(--navy); display:none;">${userData.name.split(' ').pop()}</span>
        `;
        
        const dropWrapper = document.createElement('div');
        dropWrapper.style.cssText = 'position:absolute; top:100%; right:0; padding-top:12px; display:none; z-index:100;';
        
        const drop = document.createElement('div');
        drop.style.cssText = 'background:#fff; box-shadow:0 10px 25px rgba(0,0,0,0.1); border-radius:8px; padding:8px; min-width:160px; display:flex; flex-direction:column; border:1px solid #e2e8f0;';
        drop.innerHTML = `
          <a href="profile.html" style="padding:10px 16px; color:var(--navy); text-decoration:none; font-size:0.9rem; font-weight:500; border-radius:6px; transition:background 0.2s;">Trang cá nhân</a>
          <a href="my-courses.html" style="padding:10px 16px; color:var(--navy); text-decoration:none; font-size:0.9rem; font-weight:500; border-radius:6px; transition:background 0.2s;">Khóa học của tôi</a>
          <div style="height:1px; background:#e2e8f0; margin:4px 0;"></div>
          <a href="#" class="logout-btn" style="padding:10px 16px; color:var(--red); text-decoration:none; font-size:0.9rem; font-weight:600; border-radius:6px; transition:background 0.2s;">Đăng xuất</a>
        `;
        
        dropWrapper.appendChild(drop);
        profile.appendChild(dropWrapper);
        
        profile.addEventListener('mouseenter', () => dropWrapper.style.display = 'block');
        profile.addEventListener('mouseleave', () => dropWrapper.style.display = 'none');
        
        drop.querySelector('.logout-btn').addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.setItem('isLoggedIn', 'false');
          window.location.reload();
        });
        
        nr.appendChild(profile);
      }
    });
    
    const mobMenu = document.querySelector('#mobileNav > div:last-child');
    if (mobMenu) {
      mobMenu.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--gray100); border-radius:8px;">
          <img src="${avatarUrl}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
          <div>
            <div style="font-weight:700; color:var(--navy);">${userData.name}</div>
            <a href="#" onclick="localStorage.setItem('isLoggedIn','false');window.location.reload();" style="font-size:0.8rem; color:var(--red); text-decoration:none; font-weight:600;">Đăng xuất</a>
          </div>
        </div>
      `;
    }
  }
}

window.handleLogin = function(e) {
  e.preventDefault();
  localStorage.setItem('isLoggedIn', 'true');
  window.location.href = 'index.html';
}

window.handleSignup = function(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input');
  if (inputs.length >= 3) {
    const userData = {
      name: inputs[0].value,
      phone: inputs[1].value,
      email: inputs[2].value,
      joinDate: new Date().toLocaleDateString('vi-VN'),
      courses: 0
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Append to global allUsers array
    let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    allUsers.push(userData);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }
  localStorage.setItem('isLoggedIn', 'true');
  window.location.href = 'index.html';
}

function initProfilePage() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) return; // Normally redirect to login.html here
  
  let userData = { name: 'Học viên Ecom', email: 'hocvien@example.com', phone: '0987654321' };
  try {
    const saved = JSON.parse(localStorage.getItem('userData'));
    if (saved) userData = { ...userData, ...saved };
  } catch(e){}

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=ef4b28&color=fff&bold=true`;

  // Update sidebar profile
  const sidebarName = document.querySelector('.student-sidebar-hdr h3');
  const sidebarEmail = document.querySelector('.student-sidebar-hdr p');
  const sidebarImg = document.querySelector('.student-sidebar-hdr img');
  if (sidebarName) sidebarName.textContent = userData.name;
  if (sidebarEmail) sidebarEmail.textContent = userData.email;
  if (sidebarImg) { sidebarImg.src = avatarUrl; sidebarImg.removeAttribute('onerror'); }

  // Update form inputs if they exist (profile.html)
  const nameInput = document.getElementById('profileNameInput');
  const phoneInput = document.getElementById('profilePhoneInput');
  const emailInput = document.getElementById('profileEmailInput');
  const mainAvatar = document.getElementById('profileMainAvatar');
  
  if (nameInput) nameInput.value = userData.name;
  if (phoneInput) phoneInput.value = userData.phone;
  if (emailInput) emailInput.value = userData.email;
  if (mainAvatar) { mainAvatar.src = avatarUrl; mainAvatar.removeAttribute('onerror'); }
}

window.updateProfileInfo = function(e) {
  const nameInput = document.getElementById('profileNameInput');
  const phoneInput = document.getElementById('profilePhoneInput');
  if (nameInput && phoneInput) {
    let userData = {};
    try { userData = JSON.parse(localStorage.getItem('userData')) || {}; } catch(e){}
    userData.name = nameInput.value;
    userData.phone = phoneInput.value;
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.reload(); // Refresh to update nav and sidebar
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCartNav();
  checkAuth();
  initProfilePage();
});