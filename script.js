// ===== ELITE BRIDAL MAKEOVER - Premium Portfolio JS =====

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar scroll effect + Back to Top ---
  const nav = document.querySelector('.nav');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  });

  // --- Mobile menu toggle ---
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // --- Scroll reveal animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Smooth scroll for navigation links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Stagger animation for style cards ---
  const styleCards = document.querySelectorAll('.style-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  styleCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4,0,0.2,1)';
    cardObserver.observe(card);
  });

  // --- Parallax effect on hero image ---
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  // --- Counter animation for stats ---
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 20);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));
});

// ===== ENQUIRY FORM — WhatsApp Handler =====
function handleEnquiry(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value.trim();
  const eventType = document.getElementById('eventType').value;
  const eventDate = document.getElementById('eventDate').value;
  const location = document.getElementById('location').value.trim();
  const message = document.getElementById('message').value.trim();

  // Collect selected services
  const checkboxes = document.querySelectorAll('input[name="services"]:checked');
  const services = Array.from(checkboxes).map(cb => cb.value);

  if (services.length === 0) {
    alert('Please select at least one service.');
    return false;
  }

  // Format the date nicely
  const dateObj = new Date(eventDate);
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Build the WhatsApp message
  let whatsappMsg = `Hello Elite Bridal Makeover,\n\n`;
  whatsappMsg += `I would like to enquire about your services.\n\n`;
  whatsappMsg += `*Name:* ${name}\n`;
  whatsappMsg += `*Event Type:* ${eventType}\n`;
  whatsappMsg += `*Event Date:* ${formattedDate}\n`;
  whatsappMsg += `*Location:* ${location}\n`;
  whatsappMsg += `*Required Services:*\n`;
  services.forEach(s => {
    whatsappMsg += `• ${s}\n`;
  });

  if (message) {
    whatsappMsg += `\n*Additional Details:*\n${message}\n`;
  }

  whatsappMsg += `\nPlease share the details and availability.\n\nThank you.`;

  // Encode and open WhatsApp
  const encodedMsg = encodeURIComponent(whatsappMsg);
  const whatsappURL = `https://wa.me/919014726514?text=${encodedMsg}`;

  window.open(whatsappURL, '_blank');

  // Show confirmation modal
  document.getElementById('enquiryModal').classList.add('active');

  // Reset form
  document.getElementById('enquiryForm').reset();

  return false;
}
