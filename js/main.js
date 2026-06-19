document.querySelectorAll('.reel-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const video = btn.closest('.gallery-reel').querySelector('video');
        if (video.paused) {
            video.play();
            btn.style.opacity = '0';
        } else {
            video.pause();
            btn.style.opacity = '1';
        }
    });
});



// ── BOOKING FORM: Pre-fill & WhatsApp Redirect ──
(function () {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const fields = ['name', 'phone', 'service', 'date', 'time', 'message'];
    const waNumber = '254714243358';

    // Pre-fill form from localStorage on page load
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input) return;

        const saved = localStorage.getItem('milords_' + field);
        if (saved) {
            input.value = saved;
        }
    });

    // Save to localStorage on input change
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input) return;

        input.addEventListener('input', function () {
            localStorage.setItem('milords_' + field, this.value);
        });
    });

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value.trim();

        // Build WhatsApp message
        let waMessage = '*New Booking - Milords Barbershop*%0A%0A';
        waMessage += '*Name:* ' + encodeURIComponent(name) + '%0A';
        waMessage += '*Phone:* ' + encodeURIComponent(phone) + '%0A';
        waMessage += '*Service:* ' + encodeURIComponent(service) + '%0A';
        waMessage += '*Date:* ' + encodeURIComponent(date) + '%0A';
        waMessage += '*Time:* ' + encodeURIComponent(time) + '%0A';

        if (message) {
            waMessage += '*Special Requests:* ' + encodeURIComponent(message) + '%0A';
        }

        waMessage += '%0ALooking forward to my appointment! 👑';

        // Redirect to WhatsApp
        const waUrl = 'https://wa.me/' + waNumber + '?text=' + waMessage;
        window.open(waUrl, '_blank');
    });
})();

// Mobile header menu
(function () {
    const header = document.getElementById('header');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-navigation');

    if (!header || !toggle || !nav) return;

    function closeMenu() {
        header.classList.remove('nav-open');
        document.body.classList.remove('nav-lock');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    }

    toggle.addEventListener('click', function () {
        const isOpen = header.classList.toggle('nav-open');
        document.body.classList.toggle('nav-lock', isOpen);
        toggle.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
        if (!header.classList.contains('nav-open')) return;
        if (header.contains(event.target)) return;
        closeMenu();
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
})();
