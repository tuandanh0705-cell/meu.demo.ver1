// Frontend demo built from the page briefs. Never writes Firebase, enrollments or payments.
(() => {
  'use strict';
  const data = window.MEU_DATA;
  if (!data) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = value => Number(value).toLocaleString('vi-VN') + 'đ';
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;
  const courseUrl = id => 'course-detail.html?id=' + encodeURIComponent(id);
  const selected = data.courses.find(c => c.id === params.get('id'));
  const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll('đ','d').replaceAll('Đ','D').toLowerCase();
  let toastTimer;
  function toast(message) {
    const element = $('#toast');
    if (!element) return;
    element.textContent = message; element.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { element.hidden = true; }, 6000);
  }
  const safeRead = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  function readCart() {
    const items = safeRead('cartItems', []);
    return Array.isArray(items) ? items.filter(i => i && typeof i.name === 'string' && Number.isFinite(Number(i.price)) && Number(i.price) >= 0).map(i => ({ ...i, price: Number(i.price) })) : [];
  }
  function updateBadge() { const count=readCart().length; $$('[data-cart-count]').forEach(el => { el.textContent = count; el.hidden=false; el.closest('a')?.setAttribute('aria-label',`Giỏ hàng, ${count} khóa học`); }); }
  function addCourse(id, buy = false) {
    const course = data.courses.find(c => c.id === id);
    if (!course || course.status !== 'open') { toast('Khóa sắp mở: chọn Nhận thông báo để được tư vấn.'); return; }
    const items = readCart();
    if (!items.some(item => item.id === id)) items.push({ id, name: course.title, price: course.price, img: course.image });
    try { localStorage.setItem('cartItems', JSON.stringify(items)); }
    catch { toast('Không lưu được giỏ trên thiết bị này. Vui lòng kiểm tra quyền lưu trữ.'); return; }
    updateBadge();
    if (buy) location.href = 'cart.html';
    else toast('Đã thêm khóa học vào giỏ hàng.');
  }
  function courseCard(c) {
    return `<article class="card course-card" data-course-id="${esc(c.id)}"><a class="card-image" href="${courseUrl(c.id)}"><img src="${esc(c.image)}" width="640" height="360" loading="lazy" alt="${esc(c.title)}"><span class="tag">${c.status === 'soon' ? 'Sắp mở' : 'Học Ngay'}</span></a><div class="card-body"><span class="tag">${esc(c.field)}</span><h3><a href="${courseUrl(c.id)}">${esc(c.title)}</a></h3><p class="course-summary">${esc(c.description)}</p><p class="teacher-name">Giảng viên: ${esc(c.teacher)}</p><div class="course-bottom"><span class="price">${c.price === 0 ? 'Miễn phí' : money(c.price)}</span><div class="actions"><a class="btn secondary" href="${courseUrl(c.id)}">Xem chi tiết</a>${c.status === 'open' ? `<button class="btn" type="button" data-add="${esc(c.id)}">Thêm giỏ hàng</button>` : `<a class="btn" href="contact.html?course=${encodeURIComponent(c.id)}&intent=notification">Nhận thông báo</a>`}</div></div></div></article>`;
  }
  const grids = $$('[data-course-grid]');
  function renderCourses(container, courses) { if (container) container.innerHTML = courses.map(courseCard).join(''); }
  window.MEU_UI={renderCourses};
  grids.filter(g => g.id !== 'catalog-grid' && g.dataset.courseGrid !== 'home-featured').forEach(grid => {
    const mode = grid.dataset.courseGrid;
    let list = data.courses;
    if (mode === 'recent' || mode === 'featured') list = list.filter(c => c[mode]);
    if (mode === 'related') list = list.filter(c => c.id !== selected?.id).slice(0,3);
    renderCourses(grid, list);
  });
  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    if (add) addCourse(add.dataset.add);
    const buy = event.target.closest('[data-buy]');
    if (buy) addCourse(buy.dataset.buy, true);
    const pending = event.target.closest('[data-pending]');
    if (pending) toast(pending.dataset.pending);
  });
  updateBadge();
  window.addEventListener('storage', updateBadge);

  const ticker=$('.announcement-marquee');
  if(ticker){const pause=ticker.querySelector('[data-ticker-pause]'),track=ticker.querySelector('.announcement-track');pause.addEventListener('click',()=>{const stopped=ticker.classList.toggle('is-paused');pause.setAttribute('aria-pressed',String(stopped));pause.setAttribute('aria-label',stopped?'Tiếp tục thanh thông báo':'Tạm dừng thanh thông báo');pause.textContent=stopped?'▶':'Ⅱ';});document.fonts.ready.then(()=>{const width=track.scrollWidth/2;track.style.animationDuration=Math.max(25,width/34)+'s';});}

  const menu = $('#mobile-menu'), opener = $('.menu-open');
  if (menu && opener) {
    let oldOverflow = '';
    opener.addEventListener('click', () => {
      oldOverflow = document.body.style.overflow;
      menu.showModal(); opener.setAttribute('aria-expanded','true'); document.body.style.overflow = 'hidden';
      menu.querySelector('[data-close-menu]').focus();
    });
    menu.querySelector('[data-close-menu]').addEventListener('click', () => menu.close());
    menu.addEventListener('close', () => { opener.setAttribute('aria-expanded','false'); document.body.style.overflow = oldOverflow; opener.focus(); });
    window.matchMedia('(min-width:1160px)').addEventListener('change', e => { if (e.matches && menu.open) menu.close(); });
  }
  $$('.nav-dropdown').forEach(dropdown => {
    dropdown.addEventListener('toggle',()=>{if(dropdown.open)$$('.nav-dropdown').filter(other=>other!==dropdown).forEach(other=>other.open=false);});
    dropdown.addEventListener('keydown', event => { if (event.key === 'Escape') { dropdown.open = false; dropdown.querySelector('summary').focus(); } });
  });
  document.addEventListener('click', event => { $$('.nav-dropdown').forEach(dropdown => { if (!dropdown.contains(event.target)) dropdown.open = false; }); });
  $$('.search-link').forEach(link => link.setAttribute('aria-label','Tìm kiếm khóa học'));
  $$('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    carousel.querySelector('[data-prev]').addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
    carousel.querySelector('[data-next]').addEventListener('click', () => track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }));
  });
  $$('[data-featured]').forEach(button => button.addEventListener('click', () => {
    $$('[data-featured]').forEach(b => b.classList.toggle('active', b === button));
    renderCourses($('#home-course-grid'), data.courses.filter(c => c[button.dataset.featured]));
  }));

  if (page === 'courses') {
    const form = $('#catalog-filters'), search = $('#course-search'), sort = $('#course-sort');
    const filterToggle=$('#catalog-filter-toggle'),mobileFilters=matchMedia('(max-width:700px)');
    function setFiltersOpen(open){form.hidden=mobileFilters.matches&&!open;filterToggle.hidden=!mobileFilters.matches;filterToggle.setAttribute('aria-expanded',String(!form.hidden));}
    setFiltersOpen(!mobileFilters.matches);
    filterToggle.addEventListener('click',()=>setFiltersOpen(form.hidden));
    mobileFilters.addEventListener('change',()=>setFiltersOpen(!mobileFilters.matches));
    const pageSize = 6;
    let currentPage = 1, filters = new FormData();
    search.value = params.get('q') || '';
    const initialField = params.get('field');
    const oldCategory = params.get('filter');
    if (initialField) [...form.elements].filter(el => el.name === 'field').forEach(el => { el.checked = el.value === initialField; });
    else if (oldCategory && oldCategory !== 'all') {
      const c = data.courses.find(c => c.category === oldCategory);
      if (c) [...form.elements].filter(el => el.name === 'field').forEach(el => { el.checked = el.value === c.field; });
    }
    ['field','goal','audience','status'].forEach(name => {
      params.getAll(name).forEach(value => [...form.elements].filter(el => el.name === name).forEach(el => { if (el.value === value) el.checked = true; }));
    });
    $('#price-min').value = params.get('min') || '0'; $('#price-max').value = params.get('max') || '10000000';
    sort.value = params.get('sort') || 'featured';
    function updatePrice() {
      let min = Number($('#price-min').value), max = Number($('#price-max').value);
      if (min > max) { [min,max] = [max,min]; $('#price-min').value=min; $('#price-max').value=max; }
      $('#price-min-value').textContent=money(min); $('#price-max-value').textContent=money(max);
      const range=$('.price-dual-range');range?.style.setProperty('--range-min',min/100000+'%');range?.style.setProperty('--range-max',max/100000+'%');
    }
    ['#price-min','#price-max'].forEach(s=>$(s).addEventListener('input',updatePrice));
    function statusMatch(course, values) {
      return !values.length || values.some(v=>v==='Miễn phí' ? course.price===0 : v==='Sắp mở' ? course.status==='soon' : course.status==='open');
    }
    $$('[data-filter-count]').forEach(el => {
      const [name,value]=el.dataset.filterCount.split(':');
      el.textContent=data.courses.filter(c=>name==='status'?statusMatch(c,[value]):c[name]===value).length;
    });
    function render() {
      const query = normalize(search.value.trim());
      let list=data.courses.filter(c=>!query || normalize([c.title,c.description,c.teacher,...c.skills].join(' ')).includes(query));
      for (const name of ['field','goal','audience']) { const values=filters.getAll(name); if(values.length) list=list.filter(c=>values.includes(c[name])); }
      list=list.filter(c=>statusMatch(c,filters.getAll('status')) && c.price>=Number(filters.get('min')||0) && c.price<=Number(filters.get('max')||10000000));
      if(sort.value==='free') list=list.filter(c=>c.price===0);
      list.sort((a,b)=>sort.value==='price-asc'?a.price-b.price:sort.value==='price-desc'?b.price-a.price:sort.value==='popular'?b.popularity-a.popularity:sort.value==='newest'?Number(b.recent)-Number(a.recent):Number(b.featured)-Number(a.featured));
      const totalPages=Math.max(1,Math.ceil(list.length/pageSize)); currentPage=Math.min(currentPage,totalPages);
      renderCourses($('#catalog-grid'),list.slice((currentPage-1)*pageSize,currentPage*pageSize));
      $('#results-count').textContent=`Hiển thị ${list.length} khóa học`;
      $('#catalog-empty').hidden=list.length>0;
      $('#course-pages').innerHTML=totalPages>1?Array.from({length:totalPages},(_,i)=>`<button type="button" data-page-number="${i+1}"${currentPage===i+1?' aria-current="page"':''}>${i+1}</button>`).join(''):'';
      const chips=[];
      for(const name of ['field','goal','audience','status']) for(const value of filters.getAll(name)) chips.push(`<button type="button" data-remove-filter="${name}" data-value="${esc(value)}" aria-label="Xóa bộ lọc ${esc(value)}">${esc(value)} ×</button>`);
      if(query) chips.push(`<button type="button" data-remove-search aria-label="Xóa từ khóa">${esc(search.value)} ×</button>`);
      if(Number(filters.get('min'))>0 || Number(filters.get('max'))<10000000) chips.push('<button type="button" data-remove-price>Học phí ×</button>');
      $('#filter-chips').innerHTML=chips.join('');
      const next=new URLSearchParams();
      if(search.value.trim())next.set('q',search.value.trim());
      for(const [name,value] of filters.entries())if(['field','goal','audience','status'].includes(name))next.append(name,value);
      if(Number(filters.get('min'))>0)next.set('min',filters.get('min'));
      if(Number(filters.get('max'))<10000000)next.set('max',filters.get('max'));
      if(sort.value!=='featured')next.set('sort',sort.value);
      try { history.replaceState(null,'',location.pathname+(next.size?'?'+next:'')+location.hash); } catch {}
    }
    function apply(){filters=new FormData(form);currentPage=1;updatePrice();render();}
    form.addEventListener('submit',event=>{event.preventDefault();apply();if(mobileFilters.matches){setFiltersOpen(false);filterToggle.focus();}});
    form.addEventListener('reset',()=>{search.value='';sort.value='featured';setTimeout(apply,0);});
    $('#search').addEventListener('submit',event=>{event.preventDefault();apply();});
    sort.addEventListener('change',()=>{currentPage=1;render();});
    $('#filter-chips').addEventListener('click',event=>{
      const chip=event.target.closest('button');if(!chip)return;
      if(chip.hasAttribute('data-remove-search'))search.value='';
      if(chip.hasAttribute('data-remove-price')){$('#price-min').value=0;$('#price-max').value=10000000;}
      if(chip.dataset.removeFilter)[...form.elements].filter(el=>el.name===chip.dataset.removeFilter && el.value===chip.dataset.value).forEach(el=>{el.checked=false;});
      apply();
    });
    $('#course-pages').addEventListener('click',event=>{const button=event.target.closest('[data-page-number]');if(button){currentPage=Number(button.dataset.pageNumber);render();$('#catalog-list').scrollIntoView({block:'start'});}});
    apply();
  }

  if(page==='course-detail') {
    const course=selected || (!params.has('id')?data.courses.find(c=>c.status==='open'):null);
    if(!course){$('#main').innerHTML='<div class="wrap section"><h1>Không tìm thấy khóa học</h1><p>Khóa học không có trong dữ liệu demo hiện tại.</p><a class="btn" href="courses.html">Quay về danh sách khóa học</a></div>';}
    else {
      $('#detail-title').textContent=course.title;document.title=course.title+' — META ECOM UNI';
      $('#detail-short').textContent=course.description;$('#detail-teacher').textContent=course.teacher;
      $('.teacher-line img').outerHTML='<div class="portrait-placeholder" role="img" aria-label="Ảnh giảng viên phụ trách chờ xác nhận">Ảnh</div>';$('.teacher-line a').href='instructor.html?id=unconfirmed';
      $('#detail-image').src=course.image;$('#detail-image').alt=course.title;
      $('#detail-preview').href='learning.html?id='+encodeURIComponent(course.id)+'&mode=preview';
      $('#detail-price').textContent=course.price===0?'Miễn phí':money(course.price);
      $('#detail-old-price').textContent=course.oldPrice?money(course.oldPrice):'';$('#detail-old-price').hidden=!course.oldPrice;
      $('#detail-duration').textContent=course.duration;$('#detail-level').textContent=course.level;$('#detail-field').textContent=course.field;
      $('#detail-audience').textContent='Đối tượng: '+course.audience;$('#detail-problem').textContent='Mục tiêu: '+course.goal;
      $('#detail-description').textContent=course.description;
      $('#detail-curriculum').innerHTML=course.curriculum.length?'<p>Chương trình đang được cập nhật.</p>':`<div class="curriculum"><details open><summary>Module / Buổi học — Chờ đề cương</summary><div class="lesson-row"><span>Nội dung và tài liệu từng bài cần được bổ sung theo khóa.</span><a class="text-link" href="learning.html?id=${encodeURIComponent(course.id)}&mode=preview">Xem bố cục bài học thử</a></div></details></div>`;
      $('#detail-actions').innerHTML=course.status==='soon'?`<a class="btn" href="contact.html?course=${course.id}&intent=notification">Nhận thông báo</a>`:`<button class="btn" type="button" data-buy="${course.id}">MUA NGAY</button><button class="btn secondary" type="button" data-add="${course.id}">Thêm vào giỏ hàng</button>`;
      $('#offer-actions').innerHTML=course.status==='soon'?`<a class="btn" href="contact.html?course=${course.id}&intent=notification">Nhận thông báo</a>`:`<button class="btn" type="button" data-buy="${course.id}">ĐĂNG KÍ KHÓA HỌC</button>`;
      renderCourses($('#related-course-grid'),data.courses.filter(c=>c.id!==course.id && c.field===course.field).concat(data.courses.filter(c=>c.id!==course.id && c.field!==course.field)).slice(0,3));
    }
  }
  $$('[data-demo-form]').forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    form.querySelector('.form-status').textContent='Thông tin đã được kiểm tra trong bản demo. Yêu cầu chưa được gửi; cần kết nối hệ thống tiếp nhận trước khi vận hành.';
  }));
  if(page==='contact' && params.get('course')) {
    const course=data.courses.find(c=>c.id===params.get('course'));
    if(course){$('#interest').value=course.id;if(params.get('intent')==='notification')$('#message').value='Tôi muốn nhận thông báo khi khóa '+course.title+' mở học.';}
  }
  if(page==='trial') $('#trial-course').addEventListener('change',()=>{$('#trial-preview').href='learning.html?id='+encodeURIComponent($('#trial-course').value)+'&mode=preview';});

  if(page==='blog') {
    let category='all',limit=3;
    function renderPosts(){const cards=$$('#blog-posts .post-card');let count=0;cards.forEach(card=>{const match=category==='all'||card.dataset.category===category;if(match)count++;card.hidden=!match||count>limit;});$('#blog-empty').hidden=count>0;$('#more-posts').disabled=count<=limit;$('#more-posts-status').textContent=count<=limit?'Đã hiển thị tất cả bài viết hiện có.':'';}
    $$('[data-filter-group="posts"] button').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;limit=3;$$('[data-filter-group="posts"] button').forEach(b=>b.classList.toggle('active',b===button));renderPosts();}));
    $('#more-posts').addEventListener('click',()=>{limit+=3;renderPosts();});renderPosts();
  }
  if(page==='ebook') {
    function renderResources(category='all') {$('#resource-grid').innerHTML=data.resources.filter(r=>category==='all'||r.category===category).map(r=>`<article class="card card-body resource-card"><span class="resource-icon" aria-hidden="true">▤</span><span class="tag">${esc(r.category)}</span><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p>${r.file?`<a href="${esc(r.file)}" class="btn secondary" download>Tải xuống</a>`:`<button type="button" class="btn secondary" data-pending="Tài liệu này chưa có file tải được xác nhận. Chưa phát sinh thao tác tải xuống.">Tải xuống</button><p class="muted">File tải xuống đang chờ bổ sung.</p>`}</article>`).join('');}
    $$('[data-filter-group="resources"] button').forEach(button=>button.addEventListener('click',()=>{$$('[data-filter-group="resources"] button').forEach(b=>b.classList.toggle('active',b===button));renderResources(button.dataset.category);}));renderResources();
  }
  const now=new Date();
  const dateVN = value=>new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
  if(page==='webinar') {
    const upcoming=data.webinars.filter(w=>new Date(w.startsAt)>now).sort((a,b)=>new Date(a.startsAt)-new Date(b.startsAt));
    if(upcoming.length){const w=upcoming[0];$('#event-hero-title').textContent=w.title;$('#event-hero-value').textContent=w.description;$('#event-hero-meta').innerHTML=`<div><dt>Ngày / giờ Việt Nam</dt><dd>${dateVN(w.startsAt)}</dd></div><div><dt>Hình thức / địa điểm</dt><dd>${esc(w.location)}</dd></div><div><dt>Diễn giả</dt><dd>${esc(w.speaker||'Chờ xác nhận')}</dd></div>`;$('#event-notice').textContent='Thông tin sự kiện trong dữ liệu demo; cần xác nhận trước khi mở đăng ký.';$('#event-register').dataset.pending='Đăng ký sự kiện chưa kết nối hệ thống tiếp nhận.';$('#event-details').href='webinar-detail.html?id='+w.id;}
    const past=data.webinars.filter(w=>new Date(w.startsAt)<=now);
    function renderPast(category='all'){
      const events=past.filter(w=>category==='all'||w.category===category);
      $('#event-recordings').innerHTML=events.map(w=>`<article class="card event-card"><img src="${esc(w.image)}" width="600" height="338" alt="Minh họa ${esc(w.title)}" loading="lazy"><div class="card-body"><span class="tag">${esc(w.category)} · Đã diễn ra</span><h3>${esc(w.title)}</h3><p class="event-date">${dateVN(w.startsAt)} · Giờ Việt Nam</p><p>Diễn giả: ${esc(w.speaker||'Chờ xác nhận')}</p><a class="btn secondary" href="${w.recording?esc(w.recording):'webinar-detail.html?id='+encodeURIComponent(w.id)}">${w.recording?'Xem bản ghi':'Xem nội dung chương trình'}</a></div></article>`).join('');
      $('#event-empty').hidden=events.length>0;
    }
    $$('#event-categories button').forEach(button=>button.addEventListener('click',()=>{
      $$('#event-categories button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderPast(button.dataset.category);
    }));
    renderPast();
  }
  if(page==='blog-detail') {
    const post=data.posts.find(p=>p.id===params.get('id'));
    $('#post-detail').innerHTML=post?`<div class="article-layout"><span class="tag">${esc(post.category)}</span><h1>${esc(post.title)}</h1><img src="${esc(post.image)}" width="900" height="506" alt="Minh họa bài viết"><p class="pending">Source demo mới có tiêu đề bài. Nội dung chi tiết, tác giả và ngày cập nhật chờ bổ sung; không tự viết nội dung nghiên cứu thay cho bài của MEU.</p><div class="actions"><a class="btn" href="courses.html">Khám phá khóa học liên quan</a><a class="btn secondary" href="ebook.html">Xem tài liệu</a></div></div>`:'<h1>Chưa có nội dung bài viết</h1><a class="btn" href="blog.html">Quay về Blog học tập</a>';
  }
  if(page==='instructor') {
    const teacher=data.teachers.find(t=>t.id===params.get('id'));
    $('#instructor-detail').innerHTML=teacher?`<div class="profile-layout"><img src="${esc(teacher.image)}" width="400" height="420" alt="${esc(teacher.name)}"><div><span class="eyebrow">Hồ sơ giảng viên</span><h1>${esc(teacher.name)}</h1><p>${esc(teacher.role)}</p><p class="pending">Mô tả kinh nghiệm, chuyên môn và chương trình giảng dạy chờ xác nhận từ MEU.</p><a class="btn" href="contact.html">Liên hệ MEU</a></div></div>`:'<h1>Hồ sơ giảng viên đang cập nhật</h1><p>Giảng viên phụ trách cần được xác nhận theo từng khóa học.</p><a class="btn" href="contact.html">Liên hệ MEU</a>';
  }
  if(page==='pathway') {
    const path=data.paths.find(p=>p.id===params.get('id'));
    $('#pathway-detail').innerHTML=path?`<span class="eyebrow">${esc(path.field)}</span><h1>${esc(path.title)}</h1><ol class="path-steps">${path.steps.map(step=>'<li>'+esc(step)+'</li>').join('')}</ol><p class="pending">Lộ trình này minh họa cách trình bày. Thành phần khóa, thứ tự và tổng học phí chờ MEU xác nhận.</p><a class="btn" href="courses.html?field=${encodeURIComponent(path.field)}">Xem khóa thuộc lĩnh vực</a>`:'<h1>Chọn lộ trình học</h1><a class="btn" href="courses.html#catalog-paths">Xem hệ thống khóa học</a>';
  }
  if(page==='webinar-detail') {
    const webinar=data.webinars.find(w=>w.id===params.get('id'));
    $('#webinar-detail').innerHTML=webinar?`<span class="tag">${new Date(webinar.startsAt)<=now?'Đã diễn ra':'Sắp diễn ra'}</span><h1>${esc(webinar.title)}</h1><p>${esc(webinar.description)}</p><p>${dateVN(webinar.startsAt)} · ${esc(webinar.location)}</p><p class="pending">Thông tin kế thừa từ demo. Diễn giả, nội dung chương trình và quyền xem bản ghi cần được xác nhận.</p><a class="btn secondary" href="webinar.html">Quay về Webinar</a>`:'<h1>Chưa có chương trình mới được xác nhận</h1><p>Lịch, diễn giả và nội dung sẽ được bổ sung khi có chương trình.</p><a class="btn" href="webinar.html">Xem các chương trình trước</a>';
  }
  if(page==='cart') {
    function renderCart(){const items=readCart();$('#cart-content').innerHTML=items.length?`<div class="cart-layout"><div class="card card-body"><h2>Khóa học đã chọn (${items.length})</h2>${items.map((item,i)=>`<article class="cart-item">${item.img&&/^(images\/|https:\/\/)/.test(item.img)?`<img src="${esc(item.img)}" width="96" height="54" alt="${esc(item.name)}">`:''}<div><h3>${esc(item.name)}</h3><button type="button" data-remove-cart="${i}">Xóa</button></div><strong>${money(item.price)}</strong></article>`).join('')}</div><aside class="card card-body"><h2>Tổng đơn hàng</h2><p class="cart-total">${money(items.reduce((sum,i)=>sum+i.price,0))}</p><button type="button" class="btn" data-pending="Thanh toán chưa được tích hợp trong bản demo. Chưa phát sinh giao dịch hoặc cấp quyền học.">Tiếp tục thanh toán</button><p class="pending">Giỏ demo chỉ dùng để duyệt luồng chọn khóa. Giá và giao dịch thật cần được xác nhận từ hệ thống vận hành.</p></aside></div>`:'<div class="empty"><h2>Giỏ hàng của bạn đang trống</h2><p>Chọn khóa học phù hợp để tiếp tục.</p><a class="btn" href="courses.html">Khám phá khóa học</a></div>';updateBadge();}
    $('#cart-content').addEventListener('click',event=>{const button=event.target.closest('[data-remove-cart]');if(button){const items=readCart();items.splice(Number(button.dataset.removeCart),1);localStorage.setItem('cartItems',JSON.stringify(items));renderCart();}});renderCart();
  }

  if(page==='learning') {
    const course=selected||(!params.has('id')?data.courses.find(c=>c.status==='open'):null);
    if(!course){$('#main').innerHTML='<div class="wrap section"><h1>Không tìm thấy khóa học</h1><a class="btn" href="courses.html">Xem khóa học</a></div>';return;}
    $('.learning-back').href='course-detail.html?id='+encodeURIComponent(course.id);
    const modules=course.curriculum.length?course.curriculum:[
      {title:'Module 1 — Minh họa bố cục',lessons:[{id:'preview-1',title:'Bài học thử — Vị trí nội dung',isPreview:true},{id:'locked-1',title:'Bài học cần quyền truy cập',isPreview:false}]},
      {title:'Module 2 — Minh họa bố cục',lessons:[{id:'preview-2',title:'Bài học thử tiếp theo — Vị trí nội dung',isPreview:true},{id:'locked-2',title:'Tài liệu và bài học theo chương trình',isPreview:false}]}
    ];
    const lessons=modules.flatMap((m,moduleIndex)=>m.lessons.map(l=>({...l,moduleIndex})));
    const key='meu.demo.learning.'+course.id;
    let saved=safeRead(key,{done:[],notes:{},last:null,times:{}});
    if(!saved||!Array.isArray(saved.done))saved={done:[],notes:{},last:null,times:{}};
    saved.notes ||= {};saved.times ||= {};
    let current=lessons.find(l=>l.id===params.get('lessonId')&&l.isPreview)||lessons.find(l=>l.id===saved.last&&l.isPreview)||lessons.find(l=>l.isPreview);
    const video=$('#lesson-video');
    function save(){try{localStorage.setItem(key,JSON.stringify(saved));}catch{toast('Không lưu được tiến độ demo trên thiết bị này.');}}
    const lessonIcon=shape=>`<svg class="learning-icon" viewBox="0 0 24 24" aria-hidden="true">${shape}</svg>`;
    const stateIcons={play:lessonIcon('<path d="m9 6 10 6-10 6Z"/>'),check:lessonIcon('<path d="m5 12 4 4L19 6"/>'),lock:lessonIcon('<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>')};
    function completion(){const done=saved.done.includes(current.id),button=$('#complete-lesson');button.querySelector('span').textContent=done?'Đã hoàn thành':'Đánh dấu hoàn thành';button.setAttribute('aria-pressed',String(done));}
    function list(){
      const query=normalize($('#lesson-search').value);
      $('#lesson-modules').innerHTML=modules.map((m,mi)=>{
        const visible=m.lessons.filter(l=>!query||normalize(l.title).includes(query));if(!visible.length)return'';
        return`<details${query||mi===current.moduleIndex?' open':''}><summary><svg class="learning-icon module-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg><span class="module-title">${esc(m.title)}</span><span class="module-progress">${m.lessons.filter(l=>saved.done.includes(l.id)).length}/${m.lessons.length}</span></summary>${visible.map(l=>`<button type="button" class="lesson-item ${current.id===l.id?'active':''} ${saved.done.includes(l.id)?'completed':''}" data-lesson="${esc(l.id)}"${current.id===l.id?' aria-current="step"':''}${!l.isPreview?' disabled':''}><span class="lesson-state">${!l.isPreview?stateIcons.lock:saved.done.includes(l.id)?stateIcons.check:stateIcons.play}</span><span class="lesson-copy">${esc(l.title)}<small>${!l.isPreview?'Cần quyền truy cập':l.duration?esc(l.duration):'Video · Thời lượng đang cập nhật'}</small></span></button>`).join('')}</details>`;
      }).join('');
      $('#lesson-search-empty').hidden=!!$('#lesson-modules').children.length;
      const percent=Math.round(saved.done.length/lessons.length*100);
      $('#learning-progress-text').textContent=`Tiến độ demo: ${saved.done.length}/${lessons.length} bài`;
      $('#learning-progress-percent').textContent=percent+'%';$('#learning-progress').value=percent;
    }
    function play(lesson){
      if(!lesson?.isPreview)return;current=lesson;saved.last=lesson.id;save();
      $('#learning-course-title').textContent=course.title;$('#learning-header-lesson').textContent=lesson.title;$('#learning-lesson-title').textContent=lesson.title;$('#learning-module-title').textContent=modules[lesson.moduleIndex].title;
      $('#lesson-description').textContent=lesson.description||'Nội dung mô tả bài học đang chờ bổ sung theo khóa.';$('#lesson-note').value=saved.notes[lesson.id]||'';
      video.pause();video.removeAttribute('src');const hasVideo=!!(lesson.videoUrl&&/^https:\/\//.test(lesson.videoUrl));video.hidden=!hasVideo;$('#video-placeholder').hidden=hasVideo;
      $('#learning-video-status').textContent=hasVideo?'Chất lượng và phụ đề tùy theo video bài học':'Chưa có video cho bài học này';if(hasVideo)video.src=lesson.videoUrl;video.load();list();
      const index=lessons.findIndex(l=>l.id===lesson.id);$('#previous-lesson').disabled=!lessons.slice(0,index).some(l=>l.isPreview);$('#next-lesson').disabled=!lessons.slice(index+1).some(l=>l.isPreview);completion();
    }
    if(!current){$('#main').innerHTML='<div class="wrap section"><h1>Khóa chưa có bài học thử</h1><a class="btn" href="trial.html">Quay về Học thử</a></div>';return;}
    $('#lesson-modules').addEventListener('click',event=>{const button=event.target.closest('[data-lesson]');if(button&&!button.disabled){play(lessons.find(l=>l.id===button.dataset.lesson));if(mobileSidebar.matches)setSidebar(false,true);}});
    $('#lesson-search').addEventListener('input',list);
    $('#complete-lesson').addEventListener('click',()=>{if(!saved.done.includes(current.id))saved.done.push(current.id);save();list();completion();toast('Đã lưu tiến độ demo trên thiết bị này.');});
    $('#next-lesson').addEventListener('click',()=>{const i=lessons.findIndex(l=>l.id===current.id);play(lessons.slice(i+1).find(l=>l.isPreview));});
    $('#previous-lesson').addEventListener('click',()=>{const i=lessons.findIndex(l=>l.id===current.id);play(lessons.slice(0,i).reverse().find(l=>l.isPreview));});
    $('#save-note').addEventListener('click',()=>{saved.notes[current.id]=$('#lesson-note').value;save();toast('Đã lưu ghi chú trên thiết bị này.');});
    video.addEventListener('timeupdate',()=>{if(current&&Number.isFinite(video.currentTime)){saved.times[current.id]=video.currentTime;save();}});
    video.addEventListener('loadedmetadata',()=>{const resume=saved.times[current.id]||0;if(resume<video.duration)video.currentTime=resume;});
    const tabButtons=$$('[data-lesson-tab]');
    function selectTab(button){tabButtons.forEach(b=>{const active=b===button;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;$('#panel-'+b.dataset.lessonTab).hidden=!active;});}
    tabButtons.forEach((button,index)=>{button.addEventListener('click',()=>selectTab(button));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=tabButtons[(index+1)%tabButtons.length];if(event.key==='ArrowLeft')next=tabButtons[(index+tabButtons.length-1)%tabButtons.length];if(event.key==='Home')next=tabButtons[0];if(event.key==='End')next=tabButtons.at(-1);if(next){event.preventDefault();selectTab(next);next.focus();}});});
    const shell=$('.learning-shell'),sidebarButton=$('#lesson-sidebar-toggle'),sidebar=$('#lesson-sidebar'),backdrop=$('#lesson-sidebar-backdrop'),mobileSidebar=matchMedia('(max-width:700px)');
    function setSidebar(visible,focus=false){
      shell.classList.toggle('sidebar-hidden',!visible);sidebarButton.setAttribute('aria-expanded',String(visible));backdrop.hidden=!visible||!mobileSidebar.matches;document.body.classList.toggle('learning-menu-open',visible&&mobileSidebar.matches);
      if(visible&&mobileSidebar.matches){sidebar.setAttribute('role','dialog');sidebar.setAttribute('aria-modal','true');sidebar.setAttribute('aria-labelledby','learning-course-title');}else{sidebar.removeAttribute('role');sidebar.removeAttribute('aria-modal');sidebar.removeAttribute('aria-labelledby');}
      if(focus){if(visible&&mobileSidebar.matches)$('#lesson-search').focus();else if(!visible)sidebarButton.focus();}
    }
    setSidebar(!mobileSidebar.matches);
    sidebarButton.addEventListener('click',()=>setSidebar(shell.classList.contains('sidebar-hidden'),true));
    backdrop.addEventListener('click',()=>setSidebar(false,true));$('#lesson-sidebar-close').addEventListener('click',()=>setSidebar(false,true));
    mobileSidebar.addEventListener('change',()=>setSidebar(!mobileSidebar.matches));
    document.addEventListener('keydown',event=>{
      if(!mobileSidebar.matches||shell.classList.contains('sidebar-hidden'))return;
      if(event.key==='Escape'){event.preventDefault();setSidebar(false,true);}
      if(event.key==='Tab'){const focusable=[...sidebar.querySelectorAll('button:not(:disabled),input,summary')].filter(el=>el.getClientRects().length),first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
    });
    play(current);
  }
})();
