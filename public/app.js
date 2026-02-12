(function () {
  const yearNode = document.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute('href');
      if (!href) return null;
      const id = href.replace('#', '');
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActiveNav(hash) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === hash;
      link.classList.toggle('is-active', isActive);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          setActiveNav('#' + entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  const initialHash = window.location.hash;
  if (initialHash && initialHash.length > 1) {
    const target = document.querySelector(initialHash);
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNav(initialHash);
      });
    }
  }

  const form = document.querySelector('[data-waitlist-form]');
  if (!form) {
    return;
  }

  const statusNode = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector("button[type='submit']");
  const trackingFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  const params = new URLSearchParams(window.location.search);
  trackingFields.forEach((field) => {
    const input = form.querySelector(`input[name='${field}']`);
    if (!input) {
      return;
    }
    input.value = params.get(field) || '';
  });

  const referrerInput = form.querySelector("input[name='referrer']");
  if (referrerInput) {
    referrerInput.value = document.referrer || 'direct';
  }

  function encode(formElement) {
    return new URLSearchParams(new FormData(formElement)).toString();
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (statusNode) {
      statusNode.textContent = 'Submitting...';
    }
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode(form)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      if (statusNode) {
        statusNode.textContent = 'Thanks. You are on the list.';
      }
    } catch (_error) {
      if (statusNode) {
        statusNode.textContent = 'Submission failed. Please retry in a moment.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
})();
