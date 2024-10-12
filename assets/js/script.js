window.addEventListener('scroll', function () {
    var header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Get all links in the navigation
// Select all navigation links and sections
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    // Loop through each section to find which one is in the viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove 'active' from all links and add to the current one
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});


document.getElementById('sendButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages
    document.getElementById('firstNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Get input values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate each field and show error messages
    if (!firstName) {
        document.getElementById('firstNameError').textContent = 'First Name is required.';
        isValid = false;
    }
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }
    if (!subject) {
        document.getElementById('subjectError').textContent = 'Subject is required.';
        isValid = false;
    }
    if (!message) {
        document.getElementById('messageError').textContent = 'Message is required.';
        isValid = false;
    }

    // If all fields are valid, proceed to WhatsApp
    if (isValid) {
        // Construct the WhatsApp message
        const whatsappMessage = `*Contact Form Submission*\n\n` +
            `*First Name:* ${firstName}\n` +
            `*Last Name:* ${lastName}\n` +
            `*Email:* ${email}\n` +
            `*Subject:* ${subject}\n` +
            `*Message:* ${message}`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Set the target WhatsApp number
        const targetNumber = '6285777915465';

        // Redirect to WhatsApp with the message to the specific number
        const whatsappURL = `https://wa.me/${targetNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}