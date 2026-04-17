document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
    const homeSection = document.getElementById('home');
    const bikeSection = document.getElementById('bikes');
    const carSection = document.getElementById('cars');
    const cngSection = document.getElementById('cng');
    const aboutSection = document.getElementById('about');
    
    function hideAllSections() {
        if (homeSection) homeSection.classList.add('hidden-section');
        if (bikeSection) bikeSection.classList.add('hidden-section');
        if (carSection) carSection.classList.add('hidden-section');
        if (cngSection) cngSection.classList.add('hidden-section');
        if (aboutSection) aboutSection.classList.add('hidden-section');
    }

    function showSection(section) {
        if (!section) return;
        hideAllSections();
        section.classList.remove('hidden-section');
        section.scrollIntoView({ behavior: 'smooth' });
    }

    function showHomeSection() {
        showSection(homeSection);
    }

    function showBikeSection() {
        showSection(bikeSection);
    }

    function showCarSection() {
        showSection(carSection);
    }

    function showCngSection() {
        showSection(cngSection);
    }

    function showAboutSection() {
        showSection(aboutSection);
    }

    // Hamburger menu functionality
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href === '#home') {
                event.preventDefault();
                showHomeSection();
            } else if (href === '#bikes') {
                event.preventDefault();
                showBikeSection();
            } else if (href === '#cars') {
                event.preventDefault();
                showCarSection();
            } else if (href === '#cng') {
                event.preventDefault();
                showCngSection();
            } else if (href === '#about') {
                event.preventDefault();
                showAboutSection();
            }
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Booking Modal functionality
    const modal = document.getElementById('bookingModal');
    const bookingForm = document.getElementById('bookingForm');
    const closeBtn = document.querySelector('.close-btn');
    const bookButtons = document.querySelectorAll('.book-btn');

    // Open modal when book button is clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vehicleType = this.getAttribute('data-vehicle');
            if (vehicleType !== 'general') {
                document.getElementById('vehicleType').value = vehicleType;
            }
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission to Google Forms
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(this);
        const data = {
            vehicleType: formData.get('vehicleType'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            rentalDate: formData.get('rentalDate'),
            rentalDays: formData.get('rentalDays'),
            message: formData.get('message')
        };

        // IMPORTANT: Replace this URL with your Google Form action URL
        // Steps to get Google Form URL:
        // 1. Create a Google Form with fields: vehicleType, name, email, phone, rentalDate, rentalDays, message
        // 2. Get the form's action URL from the form's HTML (view source or right-click inspect)
        // 3. Replace 'YOUR_GOOGLE_FORM_URL_HERE' below with your actual URL

        const googleFormURL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'; // REPLACE WITH YOUR FORM URL

        // Create form to submit to Google Forms
        const googleForm = document.createElement('form');
        googleForm.method = 'POST';
        googleForm.action = googleFormURL;
        googleForm.style.display = 'none';

        // Map form fields to Google Form field names
        // Note: These entry IDs need to match your Google Form questions
        const fieldMapping = {
            'vehicleType': 'entry.XXXXXXX', // Replace XXXXXXX with your field ID
            'name': 'entry.XXXXXXX',
            'email': 'entry.XXXXXXX',
            'phone': 'entry.XXXXXXX',
            'rentalDate': 'entry.XXXXXXX',
            'rentalDays': 'entry.XXXXXXX',
            'message': 'entry.XXXXXXX'
        };

        for (const [key, entryId] of Object.entries(fieldMapping)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = entryId;
            input.value = data[key];
            googleForm.appendChild(input);
        }

        document.body.appendChild(googleForm);

        // Show success message before submission
        alert('Thank you! Your booking request has been submitted. We will contact you soon at ' + data.email);

        // Submit the form
        googleForm.submit();

        // Clean up and close modal
        document.body.removeChild(googleForm);
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';

        // Reset form
        bookingForm.reset();
    });
});

