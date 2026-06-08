const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('[data-form-note]');

if (year) year.textContent = new Date().getFullYear();

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const projectType = (formData.get('project_type') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      if (formNote) {
        formNote.textContent = 'Please complete Name, Email, and Project Details before sending.';
      }
      return;
    }

    const subject = encodeURIComponent(`Estimate Request - ${projectType || 'General Project'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '(214) XXX-XXXX'}\nProject Type: ${projectType}\n\nProject Details:\n${message}`
    );

    window.location.href = `mailto:hello@m4constructiongroup.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = 'Your email app should open with this request prefilled. If it does not, email hello@m4constructiongroup.com directly.';
    }
  });
}
