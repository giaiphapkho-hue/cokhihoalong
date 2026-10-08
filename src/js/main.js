document.addEventListener("DOMContentLoaded", function() {
    // 1. Tự động nạp Header & kích hoạt Menu Mobile
    const headerHolder = document.getElementById('header-placeholder');
    if (headerHolder) {
        fetch('header.html')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải header.html');
                return response.text();
            })
            .then(data => {
                headerHolder.innerHTML = data;
                initMobileMenu(); // Khởi tạo menu & active link ngay sau khi DOM header xuất hiện
            })
            .catch(err => console.error(err));
    }

    // 2. Tự động nạp Footer
    const footerHolder = document.getElementById('footer-placeholder');
    if (footerHolder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải footer.html');
                return response.text();
            })
            .then(data => {
                footerHolder.innerHTML = data;
            })
            .catch(err => console.error(err));
    }

    // 3. Xử lý các logic riêng biệt (Form, Đếm ký tự) nếu có trong trang
    initPageEvents();
});

// HÀM XỬ LÝ MENU MOBILE & HIGHLIGHT NAV-LINK
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileMenuBtn && mainNav) {
        // Toggle mở/đóng menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                menuIcon?.classList.remove('fa-bars');
                menuIcon?.classList.add('fa-xmark');
            } else {
                menuIcon?.classList.remove('fa-xmark');
                menuIcon?.classList.add('fa-bars');
            }
        });

        // Toggle mở menu con trên di động
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (dropdown && link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 992) {
                        if (!item.classList.contains('open')) {
                            e.preventDefault();
                            item.classList.add('open');
                        }
                    }
                });
            }
        });

        // Click ngoài đóng menu
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                menuIcon?.classList.remove('fa-xmark');
                menuIcon?.classList.add('fa-bars');
            }
        });

        // TỰ ĐỘNG ĐỒNG BỘ TRẠNG THÁI "ACTIVE" CHO TRANG HIỆN TẠI
        let currentPath = window.location.pathname.split('/').pop();
        if (!currentPath || currentPath === '') currentPath = 'index.html';

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// XỬ LÝ SỰ KIỆN RIÊNG DÀNH CHO CÁC TRANG CÓ FORM/ĐẾM KÝ TỰ
function initPageEvents() {
    // Đếm ký tự
    const noteInput = document.getElementById('note');
    const charCount = document.getElementById('charCount');
    if (noteInput && charCount) {
        noteInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }

    // Xử lý submit Form
    const form = document.getElementById("contactForm");
    const status = document.getElementById("form-status");
    const btnSubmit = document.getElementById("btnSubmit");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ĐANG GỬI...';

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    status.className = "success";
                    status.innerHTML = "Cảm ơn Quý khách! Yêu cầu tư vấn đã được gửi thành công đến hệ thống.";
                    form.reset();
                    if (charCount) charCount.textContent = '0';
                } else {
                    status.className = "error";
                    status.innerHTML = "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau!";
                }
            })
            .catch(() => {
                status.className = "error";
                status.innerHTML = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng!";
            })
            .finally(() => {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> GỬI YÊU CẦU TƯ VẤN';
            });
        });
    }
}
