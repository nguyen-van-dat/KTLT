// --- Logic Đăng nhập Modal ---

const loginModal = document.getElementById('login-modal');
const closeLoginModalBtn = document.getElementById('close-login-modal');
const socialIcons = document.querySelectorAll('.social-icons a'); // Chọn tất cả các logo mạng xã hội
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginMessage = document.getElementById('login-message');

// 1. mở modal khi nhấp vào bất kỳ biểu tượng mạng xã hội nào
socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault(); // ngăn chặn hành vi mặc định của liên kết
        
        // reset trạng thái trước khi mở modal
        loginForm.reset(); // xóa các trường
        loginMessage.textContent = '';
        loginMessage.className = 'login-message'; 
        
        loginModal.style.display = 'block';
    });
});

// 2. dóng modal khi nhấp vào nút X
closeLoginModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// 3. đóng modal khi nhấp ra ngoài khu vực modal
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// 4. xử lý form đăng nhập
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ngăn form submit thực tế

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();
    
    // regex kiểm tra định dạng email (phải có ký tự @)
    const emailRegex = /@/; 

    loginMessage.textContent = '';
    loginMessage.className = 'login-message';

    if (!emailRegex.test(email)) {
        // lỗi: thiếu ký tự @
        loginMessage.classList.add('error');
        loginMessage.textContent = 'Error: Email must contain the "@" symbol.';
        return;
    }
    
    // giả lập kiểm tra đăng nhập thành công
    // ở đây, chúng ta chỉ kiểm tra xem mật khẩu có được nhập hay không
    if (password.length > 0) {
        // Thành công:
        loginMessage.classList.add('success');
        loginMessage.textContent = 'Login successful! Redirecting...';
        
        // giả lập chuyển hướng hoặc đóng modal sau 2 giây
        setTimeout(() => {
            loginModal.style.display = 'none';
            loginForm.reset();
        }, 2000); 

    } else {
        // lỗi: mật khẩu trống (có thể tùy chỉnh thêm logic kiểm tra)
        loginMessage.classList.add('error');
        loginMessage.textContent = 'Error: Please enter a password.';
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------------

// thêm vào đầu file script.js hoặc bên trong document.addEventListener('DOMContentLoaded', ...)

// --- logic Đăng ký Modal (Registration) ---

const registerModal = document.getElementById('register-modal');
const openRegisterModalBtn = document.getElementById('open-register-modal'); // Nút Sign up trong section Discount
const closeRegisterModalBtn = document.getElementById('close-register-modal');
const registerForm = document.getElementById('register-form');
const regEmailInput = document.getElementById('reg-email');
const regPasswordInput = document.getElementById('reg-password');
const regConfirmPasswordInput = document.getElementById('reg-confirm-password');
const registerMessage = document.getElementById('register-message');
const discountEmailInput = document.getElementById('email-input'); // Input email hiện tại

// 1. mở Modal khi nhấp vào nút "Sign up" trong phần Discount
if (openRegisterModalBtn) {
    openRegisterModalBtn.addEventListener('click', (e) => {
        e.preventDefault(); // **QUAN TRỌNG:** Ngăn chặn hành vi submit mặc định

        // lấy giá trị email từ input ngoài (nếu có) và điền vào modal
        if(discountEmailInput && discountEmailInput.value.trim() !== '') {
            regEmailInput.value = discountEmailInput.value.trim();
        } else {
             regEmailInput.value = '';
        }
        
        // reset các trường khác
        regPasswordInput.value = '';
        regConfirmPasswordInput.value = '';
        registerMessage.textContent = '';
        registerMessage.className = 'login-message'; 
        
        registerModal.style.display = 'block';
    });
}


// 2. đóng Modal khi nhấp vào nút X
if (closeRegisterModalBtn) {
    closeRegisterModalBtn.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });
}

// 3. đóng Modal khi nhấp ra ngoài khu vực modal
window.addEventListener('click', (event) => {
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});


// 4. xử lý Form Đăng ký bên trong Modal
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = regEmailInput.value.trim();
        const password = regPasswordInput.value.trim();
        const confirmPassword = regConfirmPasswordInput.value.trim();
        
        // reset thông báo
        registerMessage.textContent = '';
        registerMessage.className = 'login-message';

        // **bước 1: Kiểm tra định dạng Email** (phải có ký tự @)
        const emailRegex = /@/; 
        if (!emailRegex.test(email)) {
            registerMessage.classList.add('error');
            registerMessage.textContent = 'Lỗi: Email phải chứa ký tự "@"';
            return;
        }

        // **bước 2: Kiểm tra xác nhận mật khẩu**
        if (password !== confirmPassword) {
            registerMessage.classList.add('error');
            registerMessage.textContent = 'Lỗi: Mật khẩu xác nhận không trùng khớp.';
            return;
        }
        
        // **bước 3: Kiểm tra mật khẩu** (có thể thêm độ dài tối thiểu)
        if (password.length === 0) {
            registerMessage.classList.add('error');
            registerMessage.textContent = 'Lỗi: Vui lòng nhập mật khẩu.';
            return; 
        }

        // **thành công:** Email hợp lệ và mật khẩu khớp
        registerMessage.classList.add('success');
        registerMessage.textContent = 'Đăng ký thành công! Bạn nhận được mã giảm giá 15%.';
        
        // giả lập đóng modal sau 2 giây
        setTimeout(() => {
            registerModal.style.display = 'none';
            registerForm.reset();
            // Tùy chọn: Xóa input email ngoài nếu muốn
            if (discountEmailInput) discountEmailInput.value = ''; 
        }, 2000); 
    });
}
// ////////////////////////////////////////////////////////////////////////////////

// 1. dữ liệu mẫu (Giả lập dữ liệu cá nhân)
const profileData = [
    { 
        name: "James Wilson", 
        job: "Manager", 
        image: "../btap gk/image/boy1.png", 
        email: "james.w@medifit.com", 
        phone: "0899191919",
        address: "124, Lê Duẩn, Hải Châu, Đà Nẵng" 
    },
    { 
        name: "Henry Adams", 
        job: "CEO", 
        image: "../btap gk/image/boy2.png", 
        email: "henry.a@medifit.com", 
        phone: "0091823475",
        address: "502/40, Đường 2/9, Phường Hòa Cường Nam, Hải Châu, Đà Nẵng" 
    },
    { 
        name: "Ethan Harris", 
        job: "Business manager", 
        image: "../btap gk/image/boy3.png", 
        email: "ethan.h@medifit.com", 
        phone: "0842571823",
        address: "198, Nguyễn Văn Linh, Thanh Khê, Đà Nẵng" 
    },
    { 
        name: "Lily Baker", 
        job: "Product manager", 
        image: "../btap gk/image/girl 1.png", 
        email: "lily.b@medifit.com", 
        phone: "0571829482",
        address: "74, Xô Viết Nghệ Tĩnh, Hải Châu, Đà Nẵng" 
    }
];

// 2. chọn các phần tử Modal
const profileDetailModal = document.getElementById('profile-detail-modal');
const closeProfileModalBtn = document.getElementById('close-profile-modal');
const profileContainers = document.querySelectorAll('.container-profile');

const detailName = document.getElementById('detail-name');
const detailJob = document.getElementById('detail-job');
const detailAvatar = document.getElementById('detail-avatar');
const detailEmail = document.getElementById('detail-email');
const detailPhone = document.getElementById('detail-phone');
const detailAddress = document.getElementById('detail-address');

// 3. gán sự kiện nhấp cho từng container profile
profileContainers.forEach((container, index) => {
    container.addEventListener('click', () => {
        const person = profileData[index];
        
        // Cập nhật nội dung Modal
        detailName.textContent = person.name;
        detailJob.textContent = person.job;
        detailEmail.textContent = person.email;
        detailPhone.textContent = person.phone;
        detailAddress.textContent = person.address;
        
        // Cập nhật ảnh đại diện
        detailAvatar.innerHTML = `<img src="${person.image}" alt="${person.name}'s avatar">`;
        
        // Hiển thị Modal
        profileDetailModal.style.display = 'block';
    });
});

// 4. Đóng Modal khi nhấp vào nút X
if (closeProfileModalBtn) {
    closeProfileModalBtn.addEventListener('click', () => {
        profileDetailModal.style.display = 'none';
    });
}

// 5. Đóng Modal khi nhấp ra ngoài khu vực modal
window.addEventListener('click', (event) => {
    if (event.target === profileDetailModal) {
        profileDetailModal.style.display = 'none';
    }
});

// /////////
// --- Logic Giỏ hàng ---
let itemCount = 0; 
const cartCountElement = document.getElementById('cart-count'); 
// -----------------------

/////////////////////////
// --- Logic cho các nút "Shop now" trong phần tatcasanpham ---

const shopNowButtons = document.querySelectorAll('.tatcasanpham button');

shopNowButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); 

        const container = button.closest('.container-tatcasanpham');
        const productNameElement = container.querySelector('.noidung-tatcasanpham h3');

        if (productNameElement) {
            const productName = productNameElement.textContent.trim();
            
            // 1. tăng số lượng mặt hàng
            itemCount++;

            // 2. cập nhật số lượng mặt hàng
            if (cartCountElement) {
                cartCountElement.textContent = itemCount;
                // cập nhật thuộc tính data-count để CSS có thể ẩn/hiện số 0
                cartCountElement.setAttribute('data-count', itemCount); 
                
                // hiển thị nếu số lượng > 0 và ẩn alert cũ
                if (itemCount > 0) {
                     cartCountElement.style.opacity = '1';
                }
            }

            console.log(`[ACTION] Đã thêm sản phẩm: ${productName}. Tổng số lượng: ${itemCount}`);
            
        } else {
            console.error('Không tìm thấy tên sản phẩm.');
        }
    });
});


// ///////////
// --- logic Giỏ hàng Mở rộng ---
const cartToast = document.getElementById('add-to-cart-toast');
const cartIconElement = document.getElementById('open-cart-btn'); 
// -----------------------

function showAddToCartNotification() {
    // xử lý thông báo (Toast)
    if (cartToast) {
        // hiện thông báo
        cartToast.classList.add('show');
        
        // ẩn thông báo sau 2s
        setTimeout(() => {
            cartToast.classList.remove('show');
        }, 2000);
    }
    
    // xử lý hiệu ứng Giỏ hàng (Bounce Effect)
    if (cartIconElement) {
        // Áp dụng hiệu ứng động
        cartIconElement.classList.add('cart-icon-animate');
        
        // xóa class để hiệu ứng có thể chạy lại lần nữa
        setTimeout(() => {
            cartIconElement.classList.remove('cart-icon-animate');
        }, 300); // thời gian này phải bằng hoặc lớn hơn animation duration (0.3s)
    }
}

// /////////////////

// --- Logic Xóa Giỏ Hàng (Reset Cart) ---

// Lấy phần tử icon giỏ hàng (đã khai báo ở trên)
// const cartIconElement = document.getElementById('open-cart-btn');

if (cartIconElement) {
    cartIconElement.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        if (itemCount > 0) {
            // xác nhận hành động xóa giỏ hàng
            const confirmReset = confirm(`Bạn có chắc chắn muốn xóa tất cả ${itemCount} sản phẩm khỏi giỏ hàng không?`);
            
            if (confirmReset) {
                // 1. đặt lại số lượng về 0
                itemCount = 0;

                // 2. CẬP NHẬT GIAO DIỆN VỀ 0
                if (cartCountElement) {
                    cartCountElement.textContent = 0;
                    cartCountElement.setAttribute('data-count', 0); 
                    cartCountElement.style.opacity = '0'; // Ẩn số 0
                }

                // 3. thông báo xóa thành công
                alert("Giỏ hàng đã được xóa thành công!");
                console.log("[ACTION] Giỏ hàng đã được reset về 0.");
            }
        } else {
            // thông báo giỏ hàng trống
            alert("Giỏ hàng của bạn đang trống.");
            console.log("[INFO] Giỏ hàng đang trống.");
        }
    });
}




