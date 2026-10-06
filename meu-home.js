// Home composition and local selection editor; no Firebase or payment writes.
(() => {
  const data=window.MEU_DATA;if(!data?.home)return;
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const key='meu.demo.homepage.v1';
  let saved;try{saved=JSON.parse(localStorage.getItem(key));}catch{}
  const validIds=ids=>Array.isArray(ids)?[...new Set(ids)].filter(id=>data.courses.some(c=>c.id===id)):null;
  const featuredIds=validIds(saved?.featuredCourseIds)??data.home.featuredCourseIds;
  if(document.body.dataset.page==='index') {
    const latest=data.courses.filter(c=>c.recent).sort((a,b)=>(Date.parse(b.updatedAt||b.publishedAt)||0)-(Date.parse(a.updatedAt||a.publishedAt)||0)||data.courses.indexOf(b)-data.courses.indexOf(a)).slice(0,3);
    window.MEU_UI.renderCourses($('#home-course-grid'),latest);
    window.MEU_UI.renderCourses($('#home-featured-grid'),featuredIds.map(id=>data.courses.find(c=>c.id===id)).filter(Boolean));
    $('#home-featured-empty').hidden=featuredIds.length>0;
    $('#home-path-track').innerHTML=data.home.pathways.map(p=>{
      const courses=p.courseIds.map(id=>data.courses.find(c=>c.id===id)).filter(Boolean);
      return `<article class="card home-path-card"><div class="path-thumbnail" role="img" aria-label="Tổng quan lộ trình ${esc(p.title)}"><span>META ECOM UNI / HỆ THỐNG KHÓA HỌC</span><strong>${esc(p.title)}</strong><small>${courses.length} KHÓA · HỌC THEO THỨ TỰ</small></div><div class="card-body"><span class="tag">${esc(p.field)}</span><h3>${esc(p.title)}</h3><ol class="home-path-courses">${courses.map((c,i)=>`<li><span class="step-number">${i+1}</span><a href="course-detail.html?id=${encodeURIComponent(c.id)}">${esc(c.title)}</a></li>`).join('')}</ol><p class="muted">Học phí bộ khóa và ưu đãi: đang cập nhật.</p><a class="text-link" href="pathway.html?id=${encodeURIComponent(p.id)}">Xem tổng quan lộ trình →</a></div></article>`;
    }).join('');
    const discount=data.home.discountPercent;
    if(Number.isFinite(discount)&&discount>=0&&discount<=100)$('#home-discount').textContent=`Ưu đãi tới ${discount}%`;
    const reviews=(data.home.testimonials||[]).filter(r=>r.verified===true&&r.quote&&r.name);
    const safeImage=url=>typeof url==='string'&&/^(images\/|https:\/\/)/.test(url);
    $('#home-testimonials').innerHTML=reviews.map(r=>`<article class="home-review-card"><div><blockquote>“${esc(r.quote)}”</blockquote><div class="home-review-person">${safeImage(r.avatar)?`<img src="${esc(r.avatar)}" alt="${esc(r.name)}" width="60" height="60">`:''}<div><strong>${esc(r.name)}</strong><small>${esc(r.role)}</small><small>Khóa học: ${esc(r.courseTitle)}</small></div></div></div><div class="home-review-evidence">${safeImage(r.image)?`<img src="${esc(r.image)}" alt="Minh chứng được cung cấp cho phản hồi của ${esc(r.name)}" width="640" height="400" loading="lazy">`:''}${typeof r.sourceUrl==='string'&&/^https:\/\//.test(r.sourceUrl)?`<a class="text-link" href="${esc(r.sourceUrl)}" target="_blank" rel="noopener noreferrer">Xem minh chứng →</a>`:''}</div></article>`).join('');
    $('#home-proof-awaiting').hidden=reviews.length>0;
    const event=data.webinars[0];if(event&&$('#home-event-status'))$('#home-event-status').textContent=new Date(event.startsAt)<=new Date()?'Webinar · Đã diễn ra':'Webinar · Sắp diễn ra';
  }
  if(document.body.dataset.page==='homepage-editor') {
    $('#home-editor-rows').innerHTML=data.courses.map(c=>`<tr><td><strong>${esc(c.title)}</strong><small class="muted" style="display:block">${c.status==='soon'?'Sắp mở':'Học Ngay'}</small></td><td><input type="checkbox" name="featured" value="${esc(c.id)}" aria-label="Chọn ${esc(c.title)} làm khóa nổi bật"${featuredIds.includes(c.id)?' checked':''}></td><td><input name="order-${esc(c.id)}" type="number" min="1" max="99" value="${featuredIds.includes(c.id)?featuredIds.indexOf(c.id)+1:9}" aria-label="Thứ tự hiển thị ${esc(c.title)}"></td></tr>`).join('');
    $('#home-editor-form').addEventListener('submit',e=>{
      e.preventDefault();const form=new FormData(e.currentTarget);
      const ids=form.getAll('featured').sort((a,b)=>Number(form.get('order-'+a))-Number(form.get('order-'+b)));
      try{localStorage.setItem(key,JSON.stringify({featuredCourseIds:ids}));$('#home-editor-status').textContent='Đã lưu lựa chọn trong bản demo trên thiết bị này. Mở Trang chủ để xem danh sách theo thứ tự vừa chọn.';}catch{$('#home-editor-status').textContent='Không lưu được trên thiết bị này. Vui lòng kiểm tra quyền lưu trữ.';}
    });
    $('#home-editor-reset').addEventListener('click',()=>{localStorage.removeItem(key);location.reload();});
  }
})();
