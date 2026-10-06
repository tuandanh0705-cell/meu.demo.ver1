
  import { db, collection, getDocs, doc, setDoc, deleteDoc } from './firebase-config.js';

  // Default courses to seed DB if empty
  const defaultCourses = [
    {
      id: 1,
      title: "Khóa học Livestream AI: Chốt Đơn Tự Động Không Cần Setup Phức Tạp",
      category: "CHIẾN LƯỢC LIVESTREAM",
      price: 1990000,
      oldPrice: 3500000,
      purchases: 1204,
      status: "active",
      image: "images/livestream.avif",
      curriculum: []
    },
    {
      id: 2,
      title: "Chiến Lược Xây Kênh TikTok Vạn Đơn Từ Con Số 0",
      category: "XÂY KÊNH TIKTOK",
      price: 2500000,
      oldPrice: 4200000,
      purchases: 856,
      status: "active",
      image: "images/tiktok-channel.avif",
      curriculum: []
    },
    {
      id: 3,
      title: "Bí Quyết Xây Dựng Thương Hiệu Cá Nhân Trên Đa Nền Tảng",
      category: "TỐI ƯU CONTENT AI",
      price: 1290000,
      oldPrice: 2500000,
      purchases: 0,
      status: "draft",
      image: "",
      curriculum: []
    }
  ];

  let adminCourses = [];
  window.adminCourses = adminCourses;

  // Expose to window for inline HTML handlers
  window.formatMoney = formatMoney;
  window.renderCourses = renderCourses;
  window.handleImageUpload = handleImageUpload;
  window.openCourseModal = openCourseModal;
  window.closeCourseModal = closeCourseModal;
  window.saveCourse = saveCourse;
  window.deleteCourse = deleteCourse;
  window.openCurriculum = openCurriculum;
  window.closeCurriculum = closeCurriculum;
  window.renderCurriculum = renderCurriculum;
  window.openSectionModal = openSectionModal;
  window.closeSectionModal = closeSectionModal;
  window.saveSection = saveSection;
  window.setVideoSource = setVideoSource;
  window.openLessonModal = openLessonModal;
  window.handleLessonVideoUpload = handleLessonVideoUpload;
  window.clearVideoPreview = clearVideoPreview;
  window.closeLessonModal = closeLessonModal;
  window.saveLesson = saveLesson;
  window.deleteSection = deleteSection;
  window.deleteLesson = deleteLesson;

  async function loadCoursesFromFirebase() {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      let courses = [];
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
      });
      
      if (courses.length === 0) {
        // Seed default courses
        for (let c of defaultCourses) {
          await setDoc(doc(db, "courses", c.id.toString()), c);
        }
        courses = defaultCourses;
      }
      
      // Sort by ID descending (newest first)
      courses.sort((a, b) => b.id - a.id);
      adminCourses = courses;
      window.adminCourses = courses;
      renderCourses();
    } catch (e) {
      console.error("Error loading courses: ", e);
      alert("Lỗi kết nối CSDL Đám mây. Vui lòng kiểm tra lại cấu hình Firebase!");
    }
  }

  async function syncCourseToFirebase(courseObj) {
    try {
      await setDoc(doc(db, "courses", courseObj.id.toString()), courseObj);
    } catch (e) {
      console.error("Error saving to Firebase: ", e);
      alert("Lỗi khi lưu lên Đám mây. Ảnh quá nặng hoặc lỗi cấu hình Firebase.");
    }
  }

  function formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  }

  function renderCourses() {
    const tbody = document.getElementById('courseTableBody');
    document.querySelector('.section-header h2 span').textContent = adminCourses.length;
    
    if (adminCourses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray-text);">Chưa có khóa học nào.</td></tr>`;
      return;
    }

    tbody.innerHTML = adminCourses.map(c => {
      const imgHtml = c.image 
        ? `<img src="${c.image}" alt="${c.title}" class="course-thumb" onerror="this.src='https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=200&auto=format&fit=crop'">`
        : `<div style="width:80px; height:56px; border-radius:8px; background:var(--navy); color:#fff; display:flex; align-items:center; justify-content:center; border:1px solid var(--border);"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>`;
      
      const statusHtml = c.status === 'active' 
        ? `<span class="status-badge status-active">Đang xuất bản</span>`
        : `<span class="status-badge status-draft">Bản nháp</span>`;

      return `
        <tr>
          <td>
            <div class="course-cell">
              ${imgHtml}
              <div class="course-info">
                <div class="course-title">${c.title}</div>
                <div class="course-cat">${c.category}</div>
              </div>
            </div>
          </td>
          <td>
            <div style="font-weight:700; color:var(--brand);">${formatMoney(c.price)}</div>
            <div style="font-size:0.8rem; color:var(--gray-text); text-decoration:line-through;">${formatMoney(c.oldPrice)}</div>
          </td>
          <td><strong style="color:var(--navy);">${c.purchases}</strong></td>
          <td>${statusHtml}</td>
          <td>
            <div style="display:flex; gap:16px; align-items:center;">
              <button class="action-text-btn" onclick="openCourseModal(${c.id})">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Sửa
              </button>
              <button class="action-text-btn" onclick="openCurriculum(${c.id})">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                Bài học
              </button>
              <button class="action-text-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                Xem
              </button>
              <button class="action-text-btn" style="color:#ef4444;" onclick="deleteCourse(${c.id})">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Xóa
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          document.getElementById('courseImageBase64').value = compressedBase64;
          document.getElementById('courseImagePreview').src = compressedBase64;
          document.getElementById('courseImagePreview').style.display = 'block';
          document.getElementById('uploadPlaceholder').style.display = 'none';
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function openCourseModal(id = null) {
    document.getElementById('courseModal').style.display = 'flex';
    document.getElementById('courseImageFile').value = '';
    
    if (id) {
      document.getElementById('modalTitle').textContent = 'Chỉnh sửa khóa học';
      const c = adminCourses.find(x => x.id === id);
      document.getElementById('courseId').value = c.id;
      document.getElementById('courseTitle').value = c.title;
      document.getElementById('courseCat').value = c.category;
      document.getElementById('coursePrice').value = c.price;
      document.getElementById('courseOldPrice').value = c.oldPrice;
      document.getElementById('courseStatus').value = c.status;
      document.getElementById('courseDesc').value = c.description || '';
      document.getElementById('courseImageBase64').value = c.image || '';
      if (c.image) {
        document.getElementById('courseImagePreview').src = c.image;
        document.getElementById('courseImagePreview').style.display = 'block';
        document.getElementById('uploadPlaceholder').style.display = 'none';
      } else {
        document.getElementById('courseImagePreview').style.display = 'none';
        document.getElementById('uploadPlaceholder').style.display = 'block';
      }
    } else {
      document.getElementById('modalTitle').textContent = 'Thêm khóa học mới';
      document.getElementById('courseForm').reset();
      document.getElementById('courseId').value = '';
      document.getElementById('courseDesc').value = '';
      document.getElementById('courseImageBase64').value = '';
      document.getElementById('courseImagePreview').style.display = 'none';
      document.getElementById('uploadPlaceholder').style.display = 'block';
    }
  }

  function closeCourseModal() {
    document.getElementById('courseModal').style.display = 'none';
  }

  async function saveCourse(e) {
    e.preventDefault();
    const id = document.getElementById('courseId').value;
    
    // Safety check for purchases
    let purchasesCount = 0;
    if (id) {
      const existing = adminCourses.find(x => x.id == id);
      if (existing) purchasesCount = existing.purchases;
    }
    
    const newCourse = {
      id: id ? parseInt(id) : Date.now(),
      title: document.getElementById('courseTitle').value,
      category: document.getElementById('courseCat').value,
      price: parseInt(document.getElementById('coursePrice').value) || 0,
      oldPrice: parseInt(document.getElementById('courseOldPrice').value) || 0,
      purchases: purchasesCount,
      status: document.getElementById('courseStatus').value,
      description: document.getElementById('courseDesc').value,
      image: document.getElementById('courseImageBase64').value
    };

    if (id) {
      const idx = adminCourses.findIndex(x => x.id == id);
      if(idx > -1) adminCourses[idx] = newCourse;
    } else {
      adminCourses.push(newCourse);
    }

    try {
      await syncCourseToFirebase(newCourse);
      closeCourseModal();
      renderCourses();
    } catch(err) {
      console.error(err);
      alert("Không thể lưu khóa học lên Đám mây!");
      if (!id) adminCourses.pop();
    }
  }

  async function deleteCourse(id) {
    if(confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      adminCourses = adminCourses.filter(c => c.id !== id);
      try {
        await deleteDoc(doc(db, "courses", id.toString()));
        renderCourses();
      } catch(e) {
        alert("Lỗi khi xóa khóa học!");
        console.error(e);
      }
    }
  }

  let currentCurriculumCourseId = null;

  function openCurriculum(id) {
    const c = adminCourses.find(x => x.id === id);
    if (c) {
      currentCurriculumCourseId = id;
      document.getElementById('curriculumCourseSubtitle').textContent = c.title;
      document.getElementById('courseListView').style.display = 'none';
      document.getElementById('courseCurriculumView').style.display = 'block';
      renderCurriculum();
    }
  }

  function closeCurriculum() {
    currentCurriculumCourseId = null;
    document.getElementById('courseCurriculumView').style.display = 'none';
    document.getElementById('courseListView').style.display = 'block';
  }

  function renderCurriculum() {
    if (!currentCurriculumCourseId) return;
    const course = adminCourses.find(x => x.id === currentCurriculumCourseId);
    const container = document.getElementById('curriculumContainer');
    
    if (!course.curriculum || course.curriculum.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:40px; color:var(--gray-text); border:1px dashed var(--border); border-radius:12px;">Chưa có nội dung nào. Hãy thêm phần mới!</div>`;
      return;
    }

    let html = '';
    course.curriculum.forEach((section, sIndex) => {
      let lessonsHtml = '';
      if (section.lessons && section.lessons.length > 0) {
        lessonsHtml = section.lessons.map((lesson, lIndex) => `
          <div class="lesson-item">
            <div style="display:flex; align-items:center; gap:16px;">
              <div style="cursor:grab; color:var(--gray-text);"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg></div>
              <div style="width:28px; height:28px; border-radius:50%; background:#f1f5f9; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:700; color:var(--navy);">${lIndex + 1}</div>
              <div style="font-weight:600; color:var(--navy);">${lesson.title}</div>
            </div>
            <div style="display:flex; align-items:center; gap:16px;">
              <span class="badge-public"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2" style="margin-right:4px; vertical-align:-2px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Public</span>
              <button class="action-text-btn" style="color:var(--gray-text);" onclick="openLessonModal('${section.id}', '${lesson.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
              <button class="action-text-btn" style="color:var(--gray-text);" onclick="deleteLesson('${section.id}', '${lesson.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
            </div>
          </div>
        `).join('');
      } else {
        lessonsHtml = `<div style="padding:16px 24px; color:var(--gray-text); font-size:0.9rem; text-align:center;">Chưa có bài học nào trong phần này</div>`;
      }

      html += `
        <div class="curriculum-section">
          <div class="curriculum-section-header">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="cursor:grab; color:var(--gray-text);"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg></div>
              <div style="background:#fef2f2; color:#ef4444; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center;"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
              <div>
                <div style="font-weight:700; color:var(--navy); font-size:1rem;">Phần ${sIndex + 1}: ${section.title}</div>
                <div style="font-size:0.8rem; color:var(--gray-text); margin-top:2px;">${section.lessons ? section.lessons.length : 0} bài học &bull; 0 phút</div>
              </div>
            </div>
            <div style="display:flex; gap:16px; align-items:center;">
              <button class="action-text-btn" style="color:var(--brand);" onclick="openLessonModal('${section.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Bài học</button>
              <button class="action-text-btn" style="color:var(--gray-text);" onclick="openSectionModal('${section.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
              <button class="action-text-btn" style="color:var(--gray-text);" onclick="deleteSection('${section.id}')"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
            </div>
          </div>
          <div>${lessonsHtml}</div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function openSectionModal(sectionId = null) {
    document.getElementById('sectionModal').style.display = 'flex';
    if (sectionId) {
      document.getElementById('sectionModalTitle').textContent = 'Chỉnh sửa phần học';
      document.getElementById('sectionSubmitBtnText').textContent = 'Cập nhật';
      document.getElementById('sectionId').value = sectionId;
      const course = adminCourses.find(x => x.id === currentCurriculumCourseId);
      const section = course.curriculum.find(s => s.id === sectionId);
      document.getElementById('sectionTitle').value = section.title;
      document.getElementById('sectionDesc').value = section.description || '';
    } else {
      document.getElementById('sectionModalTitle').textContent = 'Thêm phần mới';
      document.getElementById('sectionSubmitBtnText').textContent = 'Tạo phần học';
      document.getElementById('sectionForm').reset();
      document.getElementById('sectionId').value = '';
    }
  }

  function closeSectionModal() {
    document.getElementById('sectionModal').style.display = 'none';
  }

  function saveSection(e) {
    e.preventDefault();
    if (!currentCurriculumCourseId) return;

    const sectionId = document.getElementById('sectionId').value;
    const title = document.getElementById('sectionTitle').value;
    const description = document.getElementById('sectionDesc').value;

    const courseIndex = adminCourses.findIndex(x => x.id === currentCurriculumCourseId);
    if (!adminCourses[courseIndex].curriculum) {
      adminCourses[courseIndex].curriculum = [];
    }

    if (sectionId) {
      // Update
      const sectionIndex = adminCourses[courseIndex].curriculum.findIndex(s => s.id === sectionId);
      adminCourses[courseIndex].curriculum[sectionIndex].title = title;
      adminCourses[courseIndex].curriculum[sectionIndex].description = description;
    } else {
      // Create
      adminCourses[courseIndex].curriculum.push({
        id: Date.now().toString(),
        title: title,
        description: description,
        lessons: []
      });
    }

    const courseObj = adminCourses[courseIndex];
    syncCourseToFirebase(courseObj).then(() => {
      closeSectionModal();
      renderCurriculum();
    });
  }

  let currentVideoSource = 'youtube';

  function setVideoSource(source) {
    currentVideoSource = source;
    const btnYoutube = document.getElementById('btnYoutubeSource');
    const btnUpload = document.getElementById('btnUploadSource');
    const youtubeSection = document.getElementById('youtubeInputSection');
    const uploadSection = document.getElementById('uploadVideoSection');

    if (source === 'youtube') {
      btnYoutube.style.borderColor = '#ef4444';
      btnYoutube.style.color = '#ef4444';
      btnUpload.style.borderColor = 'var(--border)';
      btnUpload.style.color = 'var(--navy)';
      
      youtubeSection.style.display = 'block';
      uploadSection.style.display = 'none';
    } else {
      btnUpload.style.borderColor = '#ef4444';
      btnUpload.style.color = '#ef4444';
      btnYoutube.style.borderColor = 'var(--border)';
      btnYoutube.style.color = 'var(--navy)';

      youtubeSection.style.display = 'none';
      uploadSection.style.display = 'block';
    }
  }

  function openLessonModal(sectionId, lessonId = null) {
    document.getElementById('lessonModal').style.display = 'flex';
    document.getElementById('lessonSectionId').value = sectionId;
    
    // Default to YouTube source
    setVideoSource('youtube');
    
    if (lessonId) {
      document.getElementById('lessonModalTitle').textContent = 'Chỉnh sửa bài học';
      document.getElementById('lessonSubmitBtnText').textContent = 'Cập nhật';
      document.getElementById('lessonId').value = lessonId;
      const course = adminCourses.find(x => x.id === currentCurriculumCourseId);
      const section = course.curriculum.find(s => s.id === sectionId);
      const lesson = section.lessons.find(l => l.id === lessonId);
      
      
      document.getElementById('lessonTitle').value = lesson.title || '';
      document.getElementById('lessonDesc').value = lesson.description || '';
      document.getElementById('lessonType').value = lesson.type || 'video';
      document.getElementById('lessonDuration').value = lesson.duration || '0';
      
      if (lesson.videoSource === 'upload') {
        setVideoSource('upload');
        document.getElementById('lessonUploadedVideoUrl').value = lesson.videoUrl || '';
        document.getElementById('lessonVideoUrl').value = '';
        
        if (lesson.videoUrl) {
          document.getElementById('uploadVideoDropzone').style.display = 'none';
          document.getElementById('lessonVideoPreview').src = lesson.videoUrl;
          document.getElementById('videoPreviewContainer').style.display = 'block';
        } else {
          clearVideoPreview();
        }
      } else {
        setVideoSource('youtube');
        document.getElementById('lessonVideoUrl').value = lesson.videoUrl || '';
        clearVideoPreview();
      }

      document.getElementById('lessonIsPreview').checked = !!lesson.isPreview;
      document.getElementById('lessonIsPublished').checked = lesson.isPublished !== false; // Default true
    } else {
      document.getElementById('lessonModalTitle').textContent = 'Thêm bài học mới';
      document.getElementById('lessonSubmitBtnText').textContent = 'Thêm bài học';
      document.getElementById('lessonId').value = '';
      document.getElementById('lessonForm').reset();
      document.getElementById('lessonIsPublished').checked = true;
      document.getElementById('lessonIsPublished').checked = true;
      clearVideoPreview();
      setVideoSource('youtube');
    }
  }

  function handleLessonVideoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('uploadVideoDropzone').style.display = 'none';
      const fileUrl = URL.createObjectURL(file);
      document.getElementById('lessonUploadedVideoUrl').value = fileUrl;
      const preview = document.getElementById('lessonVideoPreview');
      preview.src = fileUrl;
      document.getElementById('videoPreviewContainer').style.display = 'block';
    }
  }

  function clearVideoPreview(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    document.getElementById('lessonVideoFile').value = '';
    document.getElementById('lessonUploadedVideoUrl').value = '';
    const preview = document.getElementById('lessonVideoPreview');
    preview.pause();
    preview.removeAttribute('src');
    preview.load();
    document.getElementById('videoPreviewContainer').style.display = 'none';
    document.getElementById('uploadVideoDropzone').style.display = 'block';
  }

  function closeLessonModal() {
    document.getElementById('lessonModal').style.display = 'none';
  }

  function saveLesson(e) {
    e.preventDefault();
    if (!currentCurriculumCourseId) return;

    const sectionId = document.getElementById('lessonSectionId').value;
    const lessonId = document.getElementById('lessonId').value;
    const title = document.getElementById('lessonTitle').value;
    const desc = document.getElementById('lessonDesc').value;
    const type = document.getElementById('lessonType').value;
    const duration = document.getElementById('lessonDuration').value;
    
    let videoUrl = '';
    if (currentVideoSource === 'youtube') {
      videoUrl = document.getElementById('lessonVideoUrl').value;
    } else {
      videoUrl = document.getElementById('lessonUploadedVideoUrl').value;
    }

    const isPreview = document.getElementById('lessonIsPreview').checked;
    const isPublished = document.getElementById('lessonIsPublished').checked;

    const courseIndex = adminCourses.findIndex(x => x.id === currentCurriculumCourseId);
    const sectionIndex = adminCourses[courseIndex].curriculum.findIndex(s => s.id === sectionId);

    const lessonData = {
      title: title,
      description: desc,
      type: type,
      duration: duration,
      videoSource: currentVideoSource,
      videoUrl: videoUrl,
      isPreview: isPreview,
      isPublished: isPublished
    };

    if (lessonId) {
      // Edit existing
      const lessonIndex = adminCourses[courseIndex].curriculum[sectionIndex].lessons.findIndex(l => l.id === lessonId);
      adminCourses[courseIndex].curriculum[sectionIndex].lessons[lessonIndex] = {
        ...adminCourses[courseIndex].curriculum[sectionIndex].lessons[lessonIndex],
        ...lessonData
      };
    } else {
      // Add new
      adminCourses[courseIndex].curriculum[sectionIndex].lessons.push({
        id: Date.now().toString(),
        ...lessonData
      });
    }

    const courseObj = adminCourses[courseIndex];
    syncCourseToFirebase(courseObj).then(() => {
      closeLessonModal();
      renderCurriculum();
    });
  }

  function deleteSection(sectionId) {
    if (confirm("Bạn có chắc chắn muốn xóa Phần học này?")) {
      const courseIndex = adminCourses.findIndex(x => x.id === currentCurriculumCourseId);
      adminCourses[courseIndex].curriculum = adminCourses[courseIndex].curriculum.filter(s => s.id !== sectionId);
      const courseObj = adminCourses[courseIndex];
      syncCourseToFirebase(courseObj).then(() => renderCurriculum());
    }
  }

  function deleteLesson(sectionId, lessonId) {
    if (confirm("Bạn có chắc chắn muốn xóa Bài học này?")) {
      const courseIndex = adminCourses.findIndex(x => x.id === currentCurriculumCourseId);
      const sectionIndex = adminCourses[courseIndex].curriculum.findIndex(s => s.id === sectionId);
      adminCourses[courseIndex].curriculum[sectionIndex].lessons = adminCourses[courseIndex].curriculum[sectionIndex].lessons.filter(l => l.id !== lessonId);
      const courseObj = adminCourses[courseIndex];
      syncCourseToFirebase(courseObj).then(() => renderCurriculum());
    }
  }

  document.addEventListener('DOMContentLoaded', loadCoursesFromFirebase);
