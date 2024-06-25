document.addEventListener('DOMContentLoaded', function () {
    // Booking form navigation
    const bookingNavItems = document.querySelectorAll('.booking__nav span');
    bookingNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            bookingNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            // Add your class switching logic here
            // Example: document.querySelector('.booking__container form').className = `class-${index}`;
        });
    });

    // Form submit button
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Form submitted successfully!');
    });
});