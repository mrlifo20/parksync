/* ========================
   PARKSYNC - Vanilla JavaScript
   Multi-city, role-based, i18n
   ======================== */

// ========================
// Initialize App
// ========================
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initLanguage();
    injectNavbarExtras();
    initAuth();
    initNavigation();
    initToasts();
    routePage();
    applyTranslations();
});

function routePage() {
    const page = getCurrentPage();

    const userPages = ['dashboard.html', 'booking.html', 'reservations.html', 'profile.html'];
    const adminPages = ['admin.html', 'reports.html', 'manage-spaces.html', 'owner-dashboard.html', 'add-space.html'];

    if (userPages.includes(page)) protectPage(['user', 'admin']);
    if (adminPages.includes(page)) protectPage(['admin']);

    switch (page) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'login.html':
            initLoginPage();
            break;
        case 'register.html':
            initRegisterPage();
            break;
        case 'forgot-password.html':
            initForgotPasswordPage();
            break;
        case 'dashboard.html':
            initDashboard();
            break;
        case 'search.html':
            initSearchPage();
            break;
        case 'booking.html':
            initBookingPage();
            break;
        case 'reservations.html':
            initReservationsPage();
            break;
        case 'owner-dashboard.html':
            initOwnerDashboard();
            break;
        case 'add-space.html':
            initAddSpacePage();
            break;
        case 'manage-spaces.html':
            initManageSpacesPage();
            break;
        case 'admin.html':
            initAdminPage();
            break;
        case 'reports.html':
            initReportsPage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        case 'faq.html':
            initFAQPage();
            break;
    }
}

// ========================
// Utilities
// ========================
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return page || 'index.html';
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

// ========================
// Cities & Parking Locations
// ========================
const CITIES = {
    cairo: {
        nameEn: 'Cairo',
        nameAr: 'القاهرة',
        locations: [
            {
                id: 'cai-1',
                name: 'Tahrir Square Garage',
                nameAr: 'موقف ميدان التحرير',
                address: 'Tahrir Square, Downtown',
                addressAr: 'ميدان التحرير، وسط البلد',
                price: 5, priceUnit: 'hour',
                type: 'indoor', size: 'standard', hasEV: true,
                totalSlots: 120, availableSlots: 48,
                image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600',
                rating: 4.5, reviews: 210
            },
            {
                id: 'cai-2',
                name: 'Cairo Festival City Mall',
                nameAr: 'كايرو فيستيفال سيتي مول',
                address: 'New Cairo, Ring Road',
                addressAr: 'القاهرة الجديدة، الطريق الدائري',
                price: 4, priceUnit: 'hour',
                type: 'indoor', size: 'large', hasEV: true,
                totalSlots: 500, availableSlots: 320,
                image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=600',
                rating: 4.7, reviews: 412
            },
            {
                id: 'cai-3',
                name: 'Maadi Riverside Lot',
                nameAr: 'موقف كورنيش المعادي',
                address: 'Corniche El Nil, Maadi',
                addressAr: 'كورنيش النيل، المعادي',
                price: 3, priceUnit: 'hour',
                type: 'outdoor', size: 'standard', hasEV: false,
                totalSlots: 80, availableSlots: 12,
                image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600',
                rating: 4.1, reviews: 98
            },
            {
                id: 'cai-4',
                name: 'Nasr City Stadium Parking',
                nameAr: 'موقف استاد مدينة نصر',
                address: 'Nasr Road, Nasr City',
                addressAr: 'شارع النصر، مدينة نصر',
                price: 6, priceUnit: 'event',
                type: 'outdoor', size: 'large', hasEV: false,
                totalSlots: 400, availableSlots: 0,
                image: 'https://images.unsplash.com/photo-1545179605-1296651e9d43?w=600',
                rating: 4.2, reviews: 310
            }
        ]
    },
    giza: {
        nameEn: 'Giza',
        nameAr: 'الجيزة',
        locations: [
            {
                id: 'giz-1',
                name: 'Pyramids Visitor Center',
                nameAr: 'مركز زوار الأهرامات',
                address: 'Al Haram, Giza',
                addressAr: 'الهرم، الجيزة',
                price: 7, priceUnit: 'hour',
                type: 'outdoor', size: 'large', hasEV: false,
                totalSlots: 250, availableSlots: 90,
                image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?w=600',
                rating: 4.6, reviews: 540
            },
            {
                id: 'giz-2',
                name: 'Mall of Egypt Garage',
                nameAr: 'جراج مول مصر',
                address: 'Wahat Road, 6th of October',
                addressAr: 'طريق الواحات، السادس من أكتوبر',
                price: 4, priceUnit: 'hour',
                type: 'indoor', size: 'standard', hasEV: true,
                totalSlots: 600, availableSlots: 410,
                image: 'https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?w=600',
                rating: 4.4, reviews: 220
            },
            {
                id: 'giz-3',
                name: 'Sheikh Zayed Plaza',
                nameAr: 'بلازا الشيخ زايد',
                address: 'Zayed City, Giza',
                addressAr: 'مدينة زايد، الجيزة',
                price: 3, priceUnit: 'hour',
                type: 'outdoor', size: 'compact', hasEV: false,
                totalSlots: 90, availableSlots: 45,
                image: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=600',
                rating: 4.0, reviews: 64
            }
        ]
    },
    alexandria: {
        nameEn: 'Alexandria',
        nameAr: 'الإسكندرية',
        locations: [
            {
                id: 'alx-1',
                name: 'Stanley Bridge Parking',
                nameAr: 'موقف كوبري ستانلي',
                address: 'Corniche, Stanley',
                addressAr: 'الكورنيش، ستانلي',
                price: 5, priceUnit: 'hour',
                type: 'outdoor', size: 'standard', hasEV: false,
                totalSlots: 70, availableSlots: 18,
                image: 'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=600',
                rating: 4.3, reviews: 142
            },
            {
                id: 'alx-2',
                name: 'San Stefano Mall',
                nameAr: 'سان ستيفانو مول',
                address: 'San Stefano, Corniche',
                addressAr: 'سان ستيفانو، الكورنيش',
                price: 4, priceUnit: 'hour',
                type: 'indoor', size: 'standard', hasEV: true,
                totalSlots: 350, availableSlots: 180,
                image: 'https://images.unsplash.com/photo-1611568302502-de9bf64d2c19?w=600',
                rating: 4.5, reviews: 268
            },
            {
                id: 'alx-3',
                name: 'Bibliotheca Alexandrina Lot',
                nameAr: 'موقف مكتبة الإسكندرية',
                address: 'Shatby, Alexandria',
                addressAr: 'الشاطبي، الإسكندرية',
                price: 3, priceUnit: 'hour',
                type: 'outdoor', size: 'compact', hasEV: false,
                totalSlots: 60, availableSlots: 22,
                image: 'https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=600',
                rating: 4.2, reviews: 87
            }
        ]
    }
};

function getCities() {
    return CITIES;
}

function getCityLocations(cityKey) {
    const data = getStoredCityData();
    return (data[cityKey] && data[cityKey].locations) ? data[cityKey].locations : [];
}

function getStoredCityData() {
    const stored = localStorage.getItem('parksync_cities');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { /* fall through */ }
    }
    return JSON.parse(JSON.stringify(CITIES));
}

function saveCityData(data) {
    localStorage.setItem('parksync_cities', JSON.stringify(data));
}

function findLocation(locationId) {
    const data = getStoredCityData();
    for (const cityKey of Object.keys(data)) {
        const loc = data[cityKey].locations.find(l => l.id === locationId);
        if (loc) return { cityKey, city: data[cityKey], location: loc };
    }
    return null;
}

function updateLocationAvailability(locationId, delta) {
    const data = getStoredCityData();
    for (const cityKey of Object.keys(data)) {
        const loc = data[cityKey].locations.find(l => l.id === locationId);
        if (loc) {
            loc.availableSlots = Math.max(0, Math.min(loc.totalSlots, loc.availableSlots + delta));
            loc.status = loc.availableSlots > 0 ? 'available' : 'full';
            saveCityData(data);
            return loc;
        }
    }
    return null;
}

function getSelectedCity() {
    return localStorage.getItem('parksync_selectedCity') || '';
}

function setSelectedCity(cityKey) {
    if (cityKey) localStorage.setItem('parksync_selectedCity', cityKey);
    else localStorage.removeItem('parksync_selectedCity');
}

// ========================
// Theme
// ========================
function initTheme() {
    const savedTheme = localStorage.getItem('parksync_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('parksync_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(t('themeChanged'), t(newTheme === 'dark' ? 'darkModeOn' : 'lightModeOn'), 'info');
}

function updateThemeIcon(theme) {
    document.querySelectorAll('#themeToggle, .theme-toggle').forEach(btn => {
        btn.innerHTML = theme === 'dark'
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-fill"></i>';
    });
}

// ========================
// Language / i18n
// ========================
let currentLang = 'en';

const translations = {
    en: {
        // navbar
        home: 'Home', search: 'Search Parking', dashboard: 'Dashboard',
        howItWorks: 'How It Works', contact: 'Contact', login: 'Login',
        logout: 'Logout', register: 'Register', profile: 'Profile',
        admin: 'Admin', reports: 'Reports', reservations: 'My Reservations',
        manageSpaces: 'Manage Spaces', addSpace: 'Add Space',
        // hero / home
        heroTitle: 'Smart Urban Parking Made Easy',
        heroSubtitle: 'Find, Book, and Manage Parking Effortlessly',
        searchPlaceholder: 'Enter location or parking name...',
        getStartedFree: 'Get Started Free', findParking: 'Find Parking',
        // city / search
        chooseCity: 'Choose a city to start',
        chooseCityHint: 'Select where you want to park, then browse available locations.',
        selectCity: 'Select City', city: 'City',
        cityCairo: 'Cairo', cityGiza: 'Giza', cityAlexandria: 'Alexandria',
        changeCity: 'Change city', allCities: 'All cities',
        availableSpaces: 'Available Parking Spaces',
        noSpaces: 'No parking spaces found', adjustFilters: 'Try adjusting your filters',
        bookNow: 'Book Now', notAvailable: 'Not Available', fullyBooked: 'Fully Booked',
        available: 'Available', peakHour: 'Peak Hour', full: 'Full',
        spotsAvailable: 'spots available', filters: 'Filters',
        priceRange: 'Price Range', allPrices: 'All Prices', parkingType: 'Parking Type',
        allTypes: 'All Types', indoor: 'Indoor', outdoor: 'Outdoor',
        vehicleSize: 'Vehicle Size', allSizes: 'All Sizes',
        compact: 'Compact', standard: 'Standard', large: 'Large/SUV',
        evCharging: 'EV Charging Available', applyFilters: 'Apply Filters',
        // auth
        loginTitle: 'Welcome Back', loginSubtitle: 'Sign in to your PARKSYNC account',
        registerTitle: 'Create Account', registerSubtitle: 'Join PARKSYNC and start parking smarter',
        fullName: 'Full Name', emailAddress: 'Email Address', password: 'Password',
        confirmPassword: 'Confirm Password', accountType: 'Account Type',
        roleUser: 'Regular User (Find & Book Parking)',
        roleAdmin: 'Administrator (Manage System)',
        signIn: 'Sign In', createAccount: 'Create Account',
        forgotPassword: 'Forgot password?', alreadyHaveAccount: 'Already have an account?',
        noAccount: "Don't have an account?", signUp: 'Sign up',
        agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
        invalidCredentials: 'Invalid email or password',
        emailRegistered: 'Email already registered',
        registerSuccess: 'Registration successful! Please login.',
        passwordsNoMatch: 'Passwords do not match',
        // booking
        bookingTitle: 'Book This Space', vehiclePlate: 'Vehicle License Plate',
        plateExample: 'e.g., ABC-1234', duration: 'Duration', hours: 'hour(s)',
        startTime: 'Start Time', subtotal: 'Subtotal', serviceFee: 'Service Fee',
        total: 'Total', confirmBooking: 'Confirm Booking', bookingConfirmed: 'Booking Confirmed!',
        showQR: 'Show this QR code at the parking entrance',
        loginFirst: 'Please login first', spaceUnavailable: 'Parking space not available',
        bookingSuccess: 'Booking confirmed!', bookingNotFound: 'Booking not found',
        // dashboard
        myDashboard: 'My Dashboard', totalBookings: 'Total Bookings',
        activeBookings: 'Active Bookings', totalSpent: 'Total Spent',
        recentBookings: 'Recent Bookings', noBookings: 'No bookings yet',
        // common
        themeChanged: 'Theme Changed', darkModeOn: 'Switched to dark mode',
        lightModeOn: 'Switched to light mode', languageChanged: 'Language Changed',
        languageUpdated: 'Language updated', success: 'Success', error: 'Error',
        accessDenied: 'Access Denied', adminOnly: 'This page is for administrators only',
        welcome: 'Welcome', cancel: 'Cancel', save: 'Save', edit: 'Edit',
        delete: 'Delete', actions: 'Actions', status: 'Status', date: 'Date',
        amount: 'Amount', name: 'Name', email: 'Email', role: 'Role',
        location: 'Location', spots: 'Spots', price: 'Price'
    },
    ar: {
        home: 'الرئيسية', search: 'بحث عن موقف', dashboard: 'لوحة التحكم',
        howItWorks: 'كيف يعمل', contact: 'اتصل بنا', login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج', register: 'حساب جديد', profile: 'الملف الشخصي',
        admin: 'الإدارة', reports: 'التقارير', reservations: 'حجوزاتي',
        manageSpaces: 'إدارة المواقف', addSpace: 'إضافة موقف',
        heroTitle: 'مواقف السيارات الذكية أصبحت سهلة',
        heroSubtitle: 'ابحث واحجز وأدر مواقف السيارات بسهولة',
        searchPlaceholder: 'أدخل الموقع أو اسم الموقف...',
        getStartedFree: 'ابدأ مجاناً', findParking: 'ابحث عن موقف',
        chooseCity: 'اختر مدينة للبدء',
        chooseCityHint: 'حدد المدينة التي تريد الركن فيها، ثم تصفح المواقف المتاحة.',
        selectCity: 'اختر المدينة', city: 'المدينة',
        cityCairo: 'القاهرة', cityGiza: 'الجيزة', cityAlexandria: 'الإسكندرية',
        changeCity: 'تغيير المدينة', allCities: 'كل المدن',
        availableSpaces: 'المواقف المتاحة',
        noSpaces: 'لا توجد مواقف متاحة', adjustFilters: 'حاول تعديل عوامل التصفية',
        bookNow: 'احجز الآن', notAvailable: 'غير متاح', fullyBooked: 'محجوز بالكامل',
        available: 'متاح', peakHour: 'ساعة الذروة', full: 'ممتلئ',
        spotsAvailable: 'مكان متاح', filters: 'التصفية',
        priceRange: 'نطاق السعر', allPrices: 'كل الأسعار', parkingType: 'نوع الموقف',
        allTypes: 'كل الأنواع', indoor: 'داخلي', outdoor: 'خارجي',
        vehicleSize: 'حجم السيارة', allSizes: 'كل الأحجام',
        compact: 'صغير', standard: 'متوسط', large: 'كبير/SUV',
        evCharging: 'شحن السيارات الكهربائية متاح', applyFilters: 'تطبيق التصفية',
        loginTitle: 'مرحباً بعودتك', loginSubtitle: 'سجل الدخول إلى حساب باركسينك',
        registerTitle: 'إنشاء حساب', registerSubtitle: 'انضم إلى باركسينك وابدأ الركن بذكاء',
        fullName: 'الاسم الكامل', emailAddress: 'البريد الإلكتروني', password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور', accountType: 'نوع الحساب',
        roleUser: 'مستخدم عادي (البحث والحجز)',
        roleAdmin: 'مسؤول النظام (الإدارة)',
        signIn: 'تسجيل الدخول', createAccount: 'إنشاء حساب',
        forgotPassword: 'نسيت كلمة المرور؟', alreadyHaveAccount: 'لديك حساب بالفعل؟',
        noAccount: 'ليس لديك حساب؟', signUp: 'سجل الآن',
        agreeTerms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
        invalidCredentials: 'البريد أو كلمة المرور غير صحيحة',
        emailRegistered: 'البريد الإلكتروني مسجل بالفعل',
        registerSuccess: 'تم التسجيل بنجاح! يرجى تسجيل الدخول.',
        passwordsNoMatch: 'كلمات المرور غير متطابقة',
        bookingTitle: 'احجز هذا الموقف', vehiclePlate: 'رقم لوحة السيارة',
        plateExample: 'مثال: ABC-1234', duration: 'المدة', hours: 'ساعة',
        startTime: 'وقت البدء', subtotal: 'المجموع الفرعي', serviceFee: 'رسوم الخدمة',
        total: 'الإجمالي', confirmBooking: 'تأكيد الحجز', bookingConfirmed: 'تم تأكيد الحجز!',
        showQR: 'اعرض رمز QR عند مدخل الموقف',
        loginFirst: 'يرجى تسجيل الدخول أولاً', spaceUnavailable: 'الموقف غير متاح',
        bookingSuccess: 'تم تأكيد الحجز!', bookingNotFound: 'الحجز غير موجود',
        myDashboard: 'لوحتي', totalBookings: 'إجمالي الحجوزات',
        activeBookings: 'الحجوزات النشطة', totalSpent: 'إجمالي المصروف',
        recentBookings: 'أحدث الحجوزات', noBookings: 'لا توجد حجوزات بعد',
        themeChanged: 'تم تغيير المظهر', darkModeOn: 'تم التبديل إلى الوضع الداكن',
        lightModeOn: 'تم التبديل إلى الوضع الفاتح', languageChanged: 'تم تغيير اللغة',
        languageUpdated: 'تم تحديث اللغة', success: 'نجاح', error: 'خطأ',
        accessDenied: 'الوصول مرفوض', adminOnly: 'هذه الصفحة للمسؤولين فقط',
        welcome: 'مرحباً', cancel: 'إلغاء', save: 'حفظ', edit: 'تعديل',
        delete: 'حذف', actions: 'إجراءات', status: 'الحالة', date: 'التاريخ',
        amount: 'المبلغ', name: 'الاسم', email: 'البريد', role: 'الدور',
        location: 'الموقع', spots: 'الأماكن', price: 'السعر'
    }
};

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
}

function initLanguage() {
    currentLang = localStorage.getItem('parksync_lang') || 'en';
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('parksync_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    updateLanguageButtons();
    applyTranslations();
    autoTranslateNavLinks();
    showToast(t('languageChanged'), t('languageUpdated'), 'info');

    const page = getCurrentPage();
    if (page === 'search.html') initSearchPage();
    if (page === 'admin.html') initAdminPage();
    if (page === 'manage-spaces.html') initManageSpacesPage();
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        const val = translations[currentLang] && translations[currentLang][key];
        if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.dataset.translatePlaceholder;
        const val = translations[currentLang] && translations[currentLang][key];
        if (val) el.placeholder = val;
    });
}

// Maps known nav-link hrefs to translation keys so links translate automatically
const NAV_LINK_KEYS = {
    'index.html': 'home',
    'search.html': 'search',
    'dashboard.html': 'dashboard',
    'contact.html': 'contact',
    'admin.html': 'admin',
    'reports.html': 'reports',
    'reservations.html': 'reservations',
    'manage-spaces.html': 'manageSpaces',
    'add-space.html': 'addSpace',
    'profile.html': 'profile',
    '#how': 'howItWorks'
};

function autoTranslateNavLinks() {
    document.querySelectorAll('.navbar .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const key = NAV_LINK_KEYS[href];
        if (key && !link.hasAttribute('data-translate')) {
            link.setAttribute('data-translate', key);
        }
    });
    applyTranslations();
}

// ========================
// Navbar extras (lang switcher) auto-injection
// ========================
function injectNavbarExtras() {
    document.querySelectorAll('.navbar .d-flex.align-items-center.gap-3').forEach(container => {
        if (!container.querySelector('.lang-toggle')) {
            const wrap = document.createElement('div');
            wrap.className = 'lang-toggle';
            wrap.innerHTML = `
                <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" type="button">EN</button>
                <button class="lang-btn ${currentLang === 'ar' ? 'active' : ''}" data-lang="ar" type="button">AR</button>
            `;
            wrap.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
            });
            container.prepend(wrap);
        }
    });
    autoTranslateNavLinks();
}

// ========================
// Authentication (role-based)
// ========================
function initAuth() {
    seedAdminAccount();
    updateAuthUI();
}

function seedAdminAccount() {
    const users = getUsers();
    if (!users.find(u => u.email === 'admin@parksync.com')) {
        users.push({
            id: 'admin-seed',
            name: 'Site Admin',
            email: 'admin@parksync.com',
            password: 'admin123',
            role: 'admin',
            avatar: null, phone: '', favorites: [],
            createdAt: new Date().toISOString()
        });
        saveUsers(users);
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem('parksync_users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('parksync_users', JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('parksync_currentUser') || 'null');
}

function setCurrentUser(user) {
    localStorage.setItem('parksync_currentUser', JSON.stringify(user));
}

function isLoggedIn() { return getCurrentUser() !== null; }

function hasRole(roles) {
    const u = getCurrentUser();
    if (!u) return false;
    if (!roles || roles.length === 0) return true;
    return roles.includes(u.role);
}

function register(name, email, password, role) {
    const users = getUsers();
    role = (role === 'admin') ? 'admin' : 'user';
    if (users.find(u => u.email === email)) {
        return { success: false, message: t('emailRegistered') };
    }
    const newUser = {
        id: generateId(),
        name, email, password, role,
        avatar: null, phone: '', favorites: [],
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true, message: t('registerSuccess'), user: newUser };
}

function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: t('invalidCredentials') };
    setCurrentUser(user);
    return { success: true, user };
}

function logout() {
    localStorage.removeItem('parksync_currentUser');
    window.location.href = 'index.html';
}

function protectPage(roles) {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    if (roles && roles.length && !hasRole(roles)) {
        showToast(t('accessDenied'), t('adminOnly'), 'error');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    }
}

function updateAuthUI() {
    const user = getCurrentUser();

    document.querySelectorAll('#loginBtn').forEach(loginBtn => {
        if (user) {
            loginBtn.textContent = t('logout');
            loginBtn.setAttribute('data-translate', 'logout');
            loginBtn.onclick = logout;
        } else {
            loginBtn.textContent = t('login');
            loginBtn.setAttribute('data-translate', 'login');
            loginBtn.onclick = () => window.location.href = 'login.html';
        }
    });

    document.querySelectorAll('#profileIcon').forEach(profileIcon => {
        if (user) {
            profileIcon.textContent = (user.name || '?').charAt(0).toUpperCase();
            profileIcon.style.display = 'flex';
        } else {
            profileIcon.style.display = 'none';
        }
    });

    // Inject Admin link in navbar for admins (once)
    if (user && user.role === 'admin') {
        document.querySelectorAll('.navbar .navbar-nav').forEach(nav => {
            if (!nav.querySelector('a[data-admin-link]')) {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `<a class="nav-link" href="admin.html" data-admin-link data-translate="admin">${t('admin')}</a>`;
                nav.appendChild(li);
            }
        });
    }
}

// ========================
// Navigation
// ========================
function initNavigation() {
    const currentPage = getCurrentPage();
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================
// Toasts
// ========================
function initToasts() {
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toastId = 'toast-' + generateId();
    const bgColors = { success: 'bg-success', error: 'bg-danger', warning: 'bg-warning', info: 'bg-info' };
    const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    const toastHTML = `
        <div id="${toastId}" class="toast toast-custom show" role="alert">
            <div class="toast-header ${bgColors[type]} text-white">
                <i class="bi ${icons[type]} me-2"></i>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close btn-close-white" onclick="removeToast('${toastId}')"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', toastHTML);
    setTimeout(() => removeToast(toastId), 5000);
}

function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }
}

// ========================
// Bookings
// ========================
function getBookings() {
    return JSON.parse(localStorage.getItem('parksync_bookings') || '[]');
}

function saveBookings(bookings) {
    localStorage.setItem('parksync_bookings', JSON.stringify(bookings));
}

function createBooking(locationId, duration, vehiclePlate) {
    const user = getCurrentUser();
    if (!user) return { success: false, message: t('loginFirst') };

    const found = findLocation(locationId);
    if (!found || found.location.availableSlots <= 0) {
        return { success: false, message: t('spaceUnavailable') };
    }
    const { cityKey, city, location } = found;

    const totalPrice = location.price * duration;
    const booking = {
        id: generateId(),
        cityKey, cityName: city.nameEn, cityNameAr: city.nameAr,
        locationId: location.id,
        spaceName: location.name,
        spaceNameAr: location.nameAr,
        spaceAddress: location.address,
        spaceAddressAr: location.addressAr,
        userId: user.id, userEmail: user.email, userName: user.name,
        vehiclePlate, duration,
        priceUnit: location.priceUnit,
        totalPrice, status: 'active',
        checkedIn: false, checkedOut: false,
        qrCode: 'QR-' + generateId().toUpperCase(),
        createdAt: new Date().toISOString(),
        expiresAt: calculateExpiry(duration, location.priceUnit)
    };
    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);
    updateLocationAvailability(location.id, -1);
    return { success: true, message: t('bookingSuccess'), booking };
}

function cancelBooking(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    if (booking.status !== 'active') return { success: false, message: 'Already closed' };
    booking.status = 'cancelled';
    saveBookings(bookings);
    updateLocationAvailability(booking.locationId, +1);
    return { success: true, message: 'Booking cancelled' };
}

function extendBooking(bookingId, additionalDuration) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    const found = findLocation(booking.locationId);
    if (found) booking.totalPrice += found.location.price * additionalDuration;
    booking.duration += additionalDuration;
    booking.expiresAt = calculateExpiry(booking.duration, booking.priceUnit, new Date(booking.createdAt));
    saveBookings(bookings);
    return { success: true, message: 'Booking extended!', booking };
}

function checkIn(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    booking.checkedIn = true;
    booking.checkInTime = new Date().toISOString();
    saveBookings(bookings);
    return { success: true, message: 'Checked in successfully!' };
}

function checkOut(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: t('bookingNotFound') };
    booking.checkedOut = true;
    booking.checkOutTime = new Date().toISOString();
    booking.status = 'completed';
    saveBookings(bookings);
    updateLocationAvailability(booking.locationId, +1);
    return { success: true, message: 'Checked out successfully!' };
}

function calculateExpiry(duration, unit, startDate = new Date()) {
    const date = new Date(startDate);
    switch (unit) {
        case 'hour': date.setHours(date.getHours() + duration); break;
        case 'day': date.setDate(date.getDate() + duration); break;
        case 'event': date.setHours(date.getHours() + 8); break;
    }
    return date.toISOString();
}

// ========================
// Favorites
// ========================
function toggleFavorite(spaceId) {
    const user = getCurrentUser();
    if (!user) { showToast(t('error'), t('loginFirst'), 'error'); return false; }
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return false;
    if (!users[idx].favorites) users[idx].favorites = [];
    const favIdx = users[idx].favorites.indexOf(spaceId);
    if (favIdx === -1) {
        users[idx].favorites.push(spaceId);
        showToast(t('success'), 'Added to favorites!', 'success');
    } else {
        users[idx].favorites.splice(favIdx, 1);
        showToast(t('success'), 'Removed from favorites', 'info');
    }
    saveUsers(users);
    setCurrentUser(users[idx]);
    return favIdx === -1;
}

function isFavorite(spaceId) {
    const user = getCurrentUser();
    return !!(user && user.favorites && user.favorites.includes(spaceId));
}

// ========================
// Page Initializations
// ========================
function initHomePage() {
    const heroSearchForm = document.getElementById('heroSearchForm');
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('heroSearchInput').value;
            window.location.href = 'search.html?q=' + encodeURIComponent(query);
        });
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('fade-in-up'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.feature-card, .step-card, .testimonial-card').forEach(el => observer.observe(el));
}

function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const result = login(email, password);
        if (result.success) {
            showToast(t('welcome'), `${t('welcome')}, ${result.user.name}!`, 'success');
            setTimeout(() => {
                window.location.href = result.user.role === 'admin' ? 'admin.html' : 'dashboard.html';
            }, 800);
        } else {
            showToast(t('error'), result.message, 'error');
        }
    });
}

function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = (document.getElementById('role') || {}).value || 'user';
        if (password !== confirmPassword) {
            showToast(t('error'), t('passwordsNoMatch'), 'error');
            return;
        }
        const result = register(name, email, password, role);
        if (result.success) {
            showToast(t('success'), result.message, 'success');
            setTimeout(() => { window.location.href = 'login.html'; }, 1200);
        } else {
            showToast(t('error'), result.message, 'error');
        }
    });
}

function initForgotPasswordPage() {
    const forgotForm = document.getElementById('forgotForm');
    if (!forgotForm) return;
    forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        showToast('Email Sent', `Password reset instructions sent to ${email}`, 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    });
}

function initDashboard() {
    const user = getCurrentUser();
    const bookings = getBookings().filter(b => b.userId === user.id);
    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(b => b.status === 'active').length;
    const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('totalBookings', totalBookings);
    set('activeBookings', activeBookings);
    set('totalSpent', formatCurrency(totalSpent));
    set('userName', user.name);

    renderRecentBookings(bookings.slice(-5).reverse());
    checkExpiringBookings(bookings);
}

function renderRecentBookings(bookings) {
    const container = document.getElementById('recentBookings');
    if (!container) return;
    if (bookings.length === 0) {
        container.innerHTML = `
            <tr><td colspan="5" class="text-center py-4">
                <p class="text-secondary mb-2">${t('noBookings')}</p>
                <a href="search.html" class="btn btn-accent btn-sm">${t('findParking')}</a>
            </td></tr>`;
        return;
    }
    container.innerHTML = bookings.map(booking => `
        <tr>
            <td>
                <strong>${locName(booking)}</strong>
                <br><small class="text-secondary">${cityName(booking)} — ${locAddress(booking)}</small>
            </td>
            <td>${formatDate(booking.createdAt)}</td>
            <td>${booking.duration} ${t('hours')}</td>
            <td><span class="badge ${getStatusBadgeClass(booking.status)}">${booking.status}</span></td>
            <td>${formatCurrency(booking.totalPrice)}</td>
        </tr>`).join('');
}

function locName(b) { return currentLang === 'ar' && b.spaceNameAr ? b.spaceNameAr : b.spaceName; }
function locAddress(b) { return currentLang === 'ar' && b.spaceAddressAr ? b.spaceAddressAr : b.spaceAddress; }
function cityName(b) { return currentLang === 'ar' && b.cityNameAr ? b.cityNameAr : (b.cityName || ''); }

function getStatusBadgeClass(status) {
    return ({ active: 'bg-success', completed: 'bg-info', cancelled: 'bg-danger', expired: 'bg-warning' })[status] || 'bg-secondary';
}

function checkExpiringBookings(bookings) {
    const now = new Date();
    bookings.filter(b => b.status === 'active').forEach(booking => {
        const hoursLeft = (new Date(booking.expiresAt) - now) / 36e5;
        if (hoursLeft <= 1 && hoursLeft > 0) {
            showToast('Expiry Warning', `Your booking at ${locName(booking)} expires in less than 1 hour!`, 'warning');
        }
    });
}

// ========================
// Search Page (city + locations)
// ========================
function initSearchPage() {
    renderCityPicker();
    const selected = getSelectedCity();
    renderSpacesForCity(selected);

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const searchInput = document.getElementById('searchInput');
    if (searchInput && query) searchInput.value = query;

    ['searchInput', 'priceFilter', 'typeFilter', 'evFilter', 'sizeFilter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', filterSpaces);
        if (el) el.addEventListener('change', filterSpaces);
    });
    if (query) filterSpaces();
}

function renderCityPicker() {
    const host = document.getElementById('cityPicker');
    if (!host) return;
    const selected = getSelectedCity();
    const data = getStoredCityData();
    host.innerHTML = `
        <div class="card card-custom mb-4">
            <div class="card-body">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div>
                        <h5 class="mb-1">${t('selectCity')}</h5>
                        <small class="text-secondary">${t('chooseCityHint')}</small>
                    </div>
                    <div class="d-flex flex-wrap gap-2" id="cityButtons">
                        ${Object.keys(data).map(key => {
                            const c = data[key];
                            const cityName = currentLang === 'ar' ? c.nameAr : c.nameEn;
                            return `<button type="button" class="btn ${selected === key ? 'btn-accent' : 'btn-outline-accent'}" data-city="${key}">
                                <i class="bi bi-geo-alt"></i> ${cityName}
                            </button>`;
                        }).join('')}
                        <button type="button" class="btn ${!selected ? 'btn-accent' : 'btn-outline-accent'}" data-city="">
                            ${t('allCities')}
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    host.querySelectorAll('[data-city]').forEach(btn => {
        btn.addEventListener('click', () => {
            setSelectedCity(btn.dataset.city);
            renderCityPicker();
            renderSpacesForCity(btn.dataset.city);
            filterSpaces();
        });
    });
}

function renderSpacesForCity(cityKey) {
    let spaces = [];
    const data = getStoredCityData();
    if (cityKey && data[cityKey]) {
        spaces = data[cityKey].locations.map(l => ({ ...l, cityKey, cityName: data[cityKey].nameEn, cityNameAr: data[cityKey].nameAr }));
    } else {
        Object.keys(data).forEach(k => {
            data[k].locations.forEach(l => spaces.push({ ...l, cityKey: k, cityName: data[k].nameEn, cityNameAr: data[k].nameAr }));
        });
    }
    renderParkingSpaces(spaces);
}

function filterSpaces() {
    const searchQuery = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    const typeFilter = document.getElementById('typeFilter')?.value || 'all';
    const evFilter = document.getElementById('evFilter')?.checked || false;
    const sizeFilter = document.getElementById('sizeFilter')?.value || 'all';

    const cityKey = getSelectedCity();
    const data = getStoredCityData();
    let spaces = [];
    if (cityKey && data[cityKey]) {
        spaces = data[cityKey].locations.map(l => ({ ...l, cityKey, cityName: data[cityKey].nameEn, cityNameAr: data[cityKey].nameAr }));
    } else {
        Object.keys(data).forEach(k => {
            data[k].locations.forEach(l => spaces.push({ ...l, cityKey: k, cityName: data[k].nameEn, cityNameAr: data[k].nameAr }));
        });
    }

    spaces = spaces.filter(space => {
        if (searchQuery && !space.name.toLowerCase().includes(searchQuery) &&
            !space.address.toLowerCase().includes(searchQuery) &&
            !(space.cityName || '').toLowerCase().includes(searchQuery)) return false;
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-').map(Number);
            if (max && (space.price < min || space.price > max)) return false;
            if (!max && space.price < min) return false;
        }
        if (typeFilter !== 'all' && space.type !== typeFilter) return false;
        if (evFilter && !space.hasEV) return false;
        if (sizeFilter !== 'all' && space.size !== sizeFilter) return false;
        return true;
    });

    renderParkingSpaces(spaces);
}

function renderParkingSpaces(spaces) {
    const container = document.getElementById('parkingGrid');
    if (!container) return;
    if (!spaces || spaces.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search display-1 text-secondary"></i>
                <h4 class="mt-3">${t('noSpaces')}</h4>
                <p class="text-secondary">${t('adjustFilters')}</p>
            </div>`;
        return;
    }
    container.innerHTML = spaces.map(space => {
        const available = space.availableSlots > 0;
        const cityLabel = currentLang === 'ar' ? (space.cityNameAr || space.cityName) : space.cityName;
        const name = currentLang === 'ar' && space.nameAr ? space.nameAr : space.name;
        const address = currentLang === 'ar' && space.addressAr ? space.addressAr : space.address;
        return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card card-custom parking-card h-100">
                <img src="${space.image}" class="card-img-top" alt="${name}">
                <span class="parking-badge ${available ? 'badge-available' : 'badge-booked'}">
                    ${available ? t('available') : t('fullyBooked')}
                </span>
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title mb-0">${name}</h5>
                        <button class="btn btn-link p-0 text-accent" onclick="toggleFavorite('${space.id}')">
                            <i class="bi ${isFavorite(space.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
                        </button>
                    </div>
                    <p class="card-text mb-1"><i class="bi bi-building text-accent"></i> ${cityLabel}</p>
                    <p class="card-text"><i class="bi bi-geo-alt text-accent"></i> ${address}</p>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="price-tag">${formatCurrency(space.price)} <small>/${space.priceUnit}</small></div>
                        <div>
                            <span class="text-warning"><i class="bi bi-star-fill"></i> ${space.rating || '—'}</span>
                            <small class="text-secondary">(${space.reviews || 0})</small>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        <span class="badge bg-secondary">${t(space.type) || space.type}</span>
                        <span class="badge bg-secondary">${t(space.size) || space.size}</span>
                        ${space.hasEV ? '<span class="badge bg-success"><i class="bi bi-lightning-charge"></i> EV</span>' : ''}
                    </div>
                    <p class="small text-secondary mb-3">
                        <i class="bi bi-car-front"></i> ${space.availableSlots}/${space.totalSlots} ${t('spotsAvailable')}
                    </p>
                    <a href="booking.html?id=${space.id}" class="btn btn-accent w-100 ${!available ? 'disabled' : ''}">
                        ${available ? t('bookNow') : t('notAvailable')}
                    </a>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ========================
// Booking Page
// ========================
function initBookingPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const locationId = urlParams.get('id');
    if (!locationId) { window.location.href = 'search.html'; return; }

    const found = findLocation(locationId);
    if (!found) { showToast(t('error'), 'Location not found', 'error'); setTimeout(() => window.location.href = 'search.html', 800); return; }
    const { city, location } = found;

    const name = currentLang === 'ar' && location.nameAr ? location.nameAr : location.name;
    const address = currentLang === 'ar' && location.addressAr ? location.addressAr : location.address;
    const cityLabel = currentLang === 'ar' ? city.nameAr : city.nameEn;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('spaceName', name);
    set('spaceAddress', `${cityLabel} — ${address}`);
    set('spacePrice', formatCurrency(location.price) + '/' + location.priceUnit);
    set('spaceAvailability', `${location.availableSlots}/${location.totalSlots}`);
    const img = document.getElementById('spaceImage');
    if (img) img.src = location.image;

    const fee = 0.50;
    const recalc = () => {
        const dur = parseInt(document.getElementById('duration')?.value || '0', 10);
        const sub = location.price * dur;
        set('subtotalPrice', formatCurrency(sub));
        set('totalPrice', formatCurrency(sub + fee));
    };
    document.getElementById('duration')?.addEventListener('input', recalc);
    recalc();

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const duration = parseInt(document.getElementById('duration').value, 10);
            const vehiclePlate = document.getElementById('vehiclePlate').value;
            const result = createBooking(location.id, duration, vehiclePlate);
            if (result.success) {
                showToast(t('success'), t('bookingSuccess'), 'success');
                showQRModal(result.booking);
                setTimeout(() => { window.location.href = 'reservations.html'; }, 2500);
            } else {
                showToast(t('error'), result.message, 'error');
            }
        });
    }
}

function showQRModal(booking) {
    const modalHTML = `
        <div class="modal fade show" id="qrModal" tabindex="-1" style="display:block; background:rgba(0,0,0,0.5)">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="background: var(--bg-secondary)">
                    <div class="modal-header border-0">
                        <h5 class="modal-title text-accent">${t('bookingConfirmed')}</h5>
                        <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('qrModal').remove()"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="qr-container mb-3">
                            <div class="qr-code" style="background: url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.qrCode}') center/contain no-repeat; width:150px; height:150px;"></div>
                        </div>
                        <p class="mb-1"><strong>${t('city')}:</strong> ${cityName(booking)}</p>
                        <p class="mb-1"><strong>${t('location')}:</strong> ${locName(booking)}</p>
                        <p class="mb-1"><strong>Code:</strong> ${booking.qrCode}</p>
                        <p class="text-secondary small">${t('showQR')}</p>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ========================
// Reservations
// ========================
function initReservationsPage() {
    const user = getCurrentUser();
    const bookings = getBookings().filter(b => b.userId === user.id);
    renderActiveReservations(bookings.filter(b => b.status === 'active'));
    renderPastReservations(bookings.filter(b => b.status !== 'active'));
}

function renderActiveReservations(bookings) {
    const container = document.getElementById('activeReservations');
    if (!container) return;
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-calendar-x display-1 text-secondary"></i>
                <h4 class="mt-3">No active reservations</h4>
                <a href="search.html" class="btn btn-accent mt-3">${t('findParking')}</a>
            </div>`;
        return;
    }
    container.innerHTML = bookings.map(booking => `
        <div class="card card-custom mb-3">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <div class="qr-container">
                            <div class="qr-code" style="background: url('https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${booking.qrCode}') center/contain no-repeat; width:100px; height:100px;"></div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <h5 class="mb-1">${locName(booking)}</h5>
                        <p class="text-secondary mb-1"><i class="bi bi-building"></i> ${cityName(booking)}</p>
                        <p class="text-secondary mb-1"><i class="bi bi-geo-alt"></i> ${locAddress(booking)}</p>
                        <p class="mb-1"><i class="bi bi-car-front text-accent"></i> ${booking.vehiclePlate}</p>
                        <p class="mb-1"><i class="bi bi-clock text-accent"></i> ${booking.duration} ${t('hours')}</p>
                        <p class="mb-0"><i class="bi bi-calendar text-accent"></i> Expires: ${formatDate(booking.expiresAt)}</p>
                    </div>
                    <div class="col-md-4 text-md-end mt-3 mt-md-0">
                        <p class="price-tag mb-3">${formatCurrency(booking.totalPrice)}</p>
                        <div class="d-flex flex-wrap gap-2 justify-content-md-end">
                            ${!booking.checkedIn
                                ? `<button class="btn btn-success btn-sm" onclick="handleCheckIn('${booking.id}')"><i class="bi bi-box-arrow-in-right"></i> Check In</button>`
                                : !booking.checkedOut
                                    ? `<button class="btn btn-info btn-sm" onclick="handleCheckOut('${booking.id}')"><i class="bi bi-box-arrow-right"></i> Check Out</button>`
                                    : ''}
                            <button class="btn btn-outline-accent btn-sm" onclick="handleExtend('${booking.id}')"><i class="bi bi-plus-circle"></i> Extend</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="handleCancel('${booking.id}')"><i class="bi bi-x-circle"></i> ${t('cancel')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`).join('');
}

function renderPastReservations(bookings) {
    const container = document.getElementById('pastReservations');
    if (!container) return;
    if (bookings.length === 0) { container.innerHTML = '<p class="text-secondary text-center py-4">No past reservations</p>'; return; }
    container.innerHTML = bookings.map(booking => `
        <tr>
            <td>${cityName(booking)} — ${locName(booking)}</td>
            <td>${formatDate(booking.createdAt)}</td>
            <td>${booking.duration} ${t('hours')}</td>
            <td><span class="badge ${getStatusBadgeClass(booking.status)}">${booking.status}</span></td>
            <td>${formatCurrency(booking.totalPrice)}</td>
        </tr>`).join('');
}

function handleCheckIn(id) { const r = checkIn(id); showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'error'); initReservationsPage(); }
function handleCheckOut(id) { const r = checkOut(id); showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'error'); initReservationsPage(); }
function handleExtend(id) {
    const hours = prompt('Enter additional hours to extend:');
    if (hours && !isNaN(hours)) {
        const r = extendBooking(id, parseInt(hours, 10));
        showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'error');
        initReservationsPage();
    }
}
function handleCancel(id) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        const r = cancelBooking(id);
        showToast(r.success ? t('success') : t('error'), r.message, r.success ? 'success' : 'info');
        initReservationsPage();
    }
}

// ========================
// Owner Dashboard / Manage spaces (admin)
// ========================
function getAllLocationsFlat() {
    const data = getStoredCityData();
    const out = [];
    Object.keys(data).forEach(k => {
        data[k].locations.forEach(l => out.push({ ...l, cityKey: k, cityName: data[k].nameEn, cityNameAr: data[k].nameAr }));
    });
    return out;
}

function initOwnerDashboard() {
    const spaces = getAllLocationsFlat();
    const bookings = getBookings();
    const totalSpaces = spaces.length;
    const occupiedSpaces = spaces.reduce((sum, s) => sum + (s.totalSlots - s.availableSlots), 0);
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('totalSpaces', totalSpaces);
    set('occupiedSpaces', occupiedSpaces);
    set('ownerRevenue', formatCurrency(totalRevenue));

    renderOwnerSpaces(spaces);
}

function renderOwnerSpaces(spaces) {
    const container = document.getElementById('ownerSpacesList');
    if (!container) return;
    container.innerHTML = spaces.map(space => `
        <tr>
            <td>
                <img src="${space.image}" width="60" height="40" class="rounded me-2" style="object-fit:cover;">
                ${space.name}
            </td>
            <td>${space.cityName}</td>
            <td>${space.address}</td>
            <td>${formatCurrency(space.price)}/${space.priceUnit}</td>
            <td>${space.availableSlots}/${space.totalSlots}</td>
            <td>
                <span class="badge ${space.availableSlots > 0 ? 'bg-success' : 'bg-danger'}">
                    ${space.availableSlots > 0 ? t('available') : t('full')}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-accent me-1" onclick="editSpace('${space.id}')"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteSpace('${space.id}')"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`).join('');
}

function initAddSpacePage() {
    const form = document.getElementById('addSpaceForm');
    if (!form) return;

    // Inject city selector if not present
    const cityRow = form.querySelector('[data-city-host]') || (() => {
        const wrap = document.createElement('div');
        wrap.className = 'mb-3';
        wrap.setAttribute('data-city-host', '');
        wrap.innerHTML = `
            <label class="form-label-custom">${t('city')}</label>
            <select class="form-select form-select-custom" id="newSpaceCity">
                ${Object.keys(CITIES).map(k => `<option value="${k}">${CITIES[k].nameEn}</option>`).join('')}
            </select>`;
        form.prepend(wrap);
        return wrap;
    })();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const cityKey = document.getElementById('newSpaceCity').value;
        const data = getStoredCityData();
        if (!data[cityKey]) return;

        const totalSlots = parseInt(document.getElementById('totalSpots').value, 10);
        const newSpace = {
            id: 'loc-' + generateId(),
            name: document.getElementById('spaceName').value,
            nameAr: document.getElementById('spaceName').value,
            address: document.getElementById('spaceAddress').value,
            addressAr: document.getElementById('spaceAddress').value,
            price: parseFloat(document.getElementById('spacePrice').value),
            priceUnit: document.getElementById('priceUnit').value,
            type: document.getElementById('spaceType').value,
            size: document.getElementById('spaceSize').value,
            hasEV: document.getElementById('hasEV').checked,
            totalSlots, availableSlots: totalSlots,
            image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600',
            rating: 0, reviews: 0
        };
        data[cityKey].locations.push(newSpace);
        saveCityData(data);
        showToast(t('success'), 'Parking space added successfully!', 'success');
        setTimeout(() => { window.location.href = 'manage-spaces.html'; }, 1200);
    });
}

function initManageSpacesPage() {
    const spaces = getAllLocationsFlat();
    renderManageSpaces(spaces);
}

function renderManageSpaces(spaces) {
    const container = document.getElementById('manageSpacesList');
    if (!container) return;
    container.innerHTML = spaces.map(space => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card card-custom h-100">
                <img src="${space.image}" class="card-img-top" style="height:150px; object-fit:cover;">
                <div class="card-body">
                    <h5 class="card-title">${space.name}</h5>
                    <p class="text-secondary small mb-1"><i class="bi bi-building"></i> ${space.cityName}</p>
                    <p class="text-secondary small">${space.address}</p>
                    <p class="mb-2"><span class="price-tag">${formatCurrency(space.price)}</span><small>/${space.priceUnit}</small></p>
                    <p class="small mb-3">${t('spots')}: ${space.availableSlots}/${space.totalSlots}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-accent btn-sm flex-fill" onclick="editSpace('${space.id}')"><i class="bi bi-pencil"></i> ${t('edit')}</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteSpace('${space.id}')"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>`).join('');
}

function editSpace(spaceId) {
    showToast(t('edit'), 'Edit functionality - In a real app, this would open an edit form', 'info');
}

function deleteSpace(spaceId) {
    if (!confirm('Are you sure you want to delete this parking space?')) return;
    const data = getStoredCityData();
    let removed = false;
    Object.keys(data).forEach(k => {
        const before = data[k].locations.length;
        data[k].locations = data[k].locations.filter(l => l.id !== spaceId);
        if (data[k].locations.length !== before) removed = true;
    });
    if (removed) {
        saveCityData(data);
        showToast(t('success'), 'Parking space deleted', 'success');
        initManageSpacesPage();
    }
}

// ========================
// Admin Page
// ========================
function initAdminPage() {
    renderAdminUsers();
    renderAdminFines();
}

function renderAdminUsers() {
    const users = getUsers();
    const container = document.getElementById('adminUsersList');
    if (!container) return;
    container.innerHTML = users.map(user => `
        <tr>
            <td>${user.id.substring(0, 8)}...</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge ${user.role === 'admin' ? 'bg-warning' : 'bg-info'}">${user.role}</span></td>
            <td>${formatDate(user.createdAt)}</td>
            <td>
                <button class="btn btn-sm btn-outline-accent" onclick="showToast('${t('edit')}', 'Edit user: ${user.email}', 'info')"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteUser('${user.id}')"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`).join('');
}

function renderAdminFines() {
    const fines = [
        { id: 1, user: 'john@example.com', amount: 50, reason: 'Overtime parking', date: '2026-04-15', status: 'pending' },
        { id: 2, user: 'jane@example.com', amount: 25, reason: 'Wrong spot', date: '2026-04-20', status: 'paid' }
    ];
    const container = document.getElementById('adminFinesList');
    if (!container) return;
    container.innerHTML = fines.map(fine => `
        <tr>
            <td>#${fine.id}</td><td>${fine.user}</td><td>${formatCurrency(fine.amount)}</td>
            <td>${fine.reason}</td><td>${fine.date}</td>
            <td><span class="badge ${fine.status === 'paid' ? 'bg-success' : 'bg-warning'}">${fine.status}</span></td>
            <td><button class="btn btn-sm btn-outline-accent" onclick="showToast('Fine', 'Mark as paid', 'info')"><i class="bi bi-check-circle"></i></button></td>
        </tr>`).join('');
}

function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const users = getUsers().filter(u => u.id !== userId);
    saveUsers(users);
    showToast(t('success'), 'User deleted', 'success');
    renderAdminUsers();
}

// ========================
// Reports
// ========================
function initReportsPage() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const bookings = getBookings();
    set('reportBookings', bookings.length);
    set('reportRevenue', formatCurrency(bookings.reduce((s, b) => s + b.totalPrice, 0)));
    set('reportUsers', getUsers().length);
    set('reportSpaces', getAllLocationsFlat().length);
    document.getElementById('downloadPdf')?.addEventListener('click', () => showToast('Download', 'PDF report download started (simulation)', 'success'));
}

// ========================
// Profile
// ========================
function initProfilePage() {
    const user = getCurrentUser();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    set('profileName', user.name);
    set('profileEmail', user.email);
    set('profilePhone', user.phone || '');

    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) {
        avatarEl.src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=00d4ff&color=0d0d0d&size=150`;
    }

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const users = getUsers();
            const idx = users.findIndex(u => u.id === user.id);
            if (idx === -1) return;
            users[idx].name = document.getElementById('profileName').value;
            users[idx].phone = document.getElementById('profilePhone').value;
            saveUsers(users);
            setCurrentUser(users[idx]);
            showToast(t('success'), 'Profile updated successfully!', 'success');
        });
    }

    document.getElementById('avatarInput')?.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            const users = getUsers();
            const idx = users.findIndex(u => u.id === user.id);
            if (idx === -1) return;
            users[idx].avatar = ev.target.result;
            saveUsers(users);
            setCurrentUser(users[idx]);
            document.getElementById('profileAvatar').src = ev.target.result;
            showToast(t('success'), 'Profile picture updated!', 'success');
        };
        reader.readAsDataURL(file);
    });

    renderFavorites(user);
}

function renderFavorites(user) {
    const container = document.getElementById('favoritesList');
    if (!container) return;
    const all = getAllLocationsFlat();
    const favs = (user.favorites || []).map(id => all.find(s => s.id === id)).filter(Boolean);
    if (favs.length === 0) {
        container.innerHTML = '<p class="text-secondary">No favorites yet. Browse parking spaces and add some!</p>';
        return;
    }
    container.innerHTML = favs.map(space => `
        <div class="col-md-6 mb-3">
            <div class="card card-custom">
                <div class="card-body d-flex align-items-center">
                    <img src="${space.image}" width="80" height="60" class="rounded me-3" style="object-fit:cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${space.name}</h6>
                        <p class="text-secondary small mb-0">${space.cityName} — ${space.address}</p>
                    </div>
                    <a href="booking.html?id=${space.id}" class="btn btn-accent btn-sm">${t('bookNow')}</a>
                </div>
            </div>
        </div>`).join('');
}

// ========================
// Contact / FAQ
// ========================
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showToast('Message Sent', 'Thank you for contacting us! We will respond shortly.', 'success');
            this.reset();
        });
    }
    initChat();
}

function initChat() {
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    if (!chatSend || !chatInput || !chatMessages) return;

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        chatMessages.innerHTML += `<div class="chat-message sent">${message}</div>`;
        chatInput.value = '';
        setTimeout(() => {
            const responses = [
                "Thank you for your message! Our team will get back to you shortly.",
                "I understand. Is there anything else I can help you with?",
                "Our support hours are 9 AM to 6 PM EET.",
                "You can also reach us at support@parksync.com"
            ];
            chatMessages.innerHTML += `<div class="chat-message received">${responses[Math.floor(Math.random() * responses.length)]}</div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendChatMessage(); });
}

function initFAQPage() { /* Bootstrap accordion handles itself */ }

// ========================
// Globals
// ========================
window.toggleTheme = toggleTheme;
window.setLanguage = setLanguage;
window.logout = logout;
window.toggleFavorite = toggleFavorite;
window.isFavorite = isFavorite;
window.handleCheckIn = handleCheckIn;
window.handleCheckOut = handleCheckOut;
window.handleExtend = handleExtend;
window.handleCancel = handleCancel;
window.editSpace = editSpace;
window.deleteSpace = deleteSpace;
window.deleteUser = deleteUser;
window.removeToast = removeToast;
window.showToast = showToast;
window.filterSpaces = filterSpaces;
