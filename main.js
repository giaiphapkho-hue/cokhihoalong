document.addEventListener("DOMContentLoaded", function () {
    // Nhúng Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải header.html');
                return response.text();
            })
            .then(data => {
                headerPlaceholder.innerHTML = data;

                // Tự động thêm class 'active' cho menu dựa theo URL trang hiện tại
                const path = window.location.pathname;
                let currentPage = path.split('/').pop().split('?')[0].split('#')[0];
                if (!currentPage) currentPage = 'index.html';

                const navLinks = document.querySelectorAll('.main-nav a');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === currentPage) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            })
            .catch(error => console.error("Lỗi nhúng Header:", error));
    }

    // Nhúng Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải footer.html');
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Lỗi nhúng Footer:", error));
    }
});
