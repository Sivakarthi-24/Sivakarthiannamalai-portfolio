/**
 * ====================================================================
 * MAIN APPLICATION LOGIC
 * Sivakarthi A | ECE Student @ Panimalar Engineering College
 * Subtle animated background + dark/light theme
 * Vanilla JavaScript (ES6+)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Subtle animated background ---
  initAmbientBackground();

  // --- 2. Dark / Light Theme Management with LocalStorage ---
  initTheme();

  // --- 3. Mobile Navigation Drawer ---
  initMobileNav();

  // --- 4. Scrollspy & Smooth Navigation ---
  initScrollspy();

  // --- 5. Interactive Terminal Code Preview ---
  initTerminalRunner();

  // --- 6. Render Data-Driven Skills, Projects, and Certificates ---
  renderPortfolioContent();

  // --- 7. Skills Category Filtering ---
  initSkillFilters();

  // --- 8. Project Details Modal (Accessible Dialog) ---
  initProjectModals();

  // --- 9. Certificate Credential Details ---
  initCertificateActions();

  // --- 10. Contact Form Validation & Dispatcher ---
  initContactForm();

  // --- 11. Dynamic Year & Data Sync ---
  initDataSync();

  // --- 12. Placeholder Link Handlers ---
  initPlaceholderGuards();
});

/* ====================================================================
   SUBTLE AMBIENT PARTICLE BACKGROUND
   ==================================================================== */
function initAmbientBackground() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.4 + 0.5;
      this.speedY = Math.random() * 0.35 + 0.12;
      this.speedX = (Math.random() - 0.5) * 0.28;
      this.type = Math.random() > 0.78 ? 'petal' : 'spark';
      if (this.type === 'petal') this.size += 1.8;
      this.alpha = Math.random() * 0.15 + 0.14;
      this.color = this.type === 'petal'
        ? '#e9a9cb'
        : Math.random() > 0.65 ? '#d6b45a' : '#7b9aff';
      this.rotation = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.006;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.002) * 0.08;
      this.rotation += this.spin;

      if (this.y < -8) {
        this.y = height + 8;
        this.x = Math.random() * width;
      }
      if (this.x < -8 || this.x > width + 8) {
        this.reset();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = this.type === 'petal' ? 9 : 6;
      if (this.type === 'petal') {
        ctx.beginPath();
        ctx.moveTo(0, this.size);
        ctx.bezierCurveTo(this.size * 0.55, this.size * 0.55, this.size, -this.size * 0.4, 0, -this.size);
        ctx.bezierCurveTo(-this.size, -this.size * 0.4, -this.size * 0.55, this.size * 0.55, 0, this.size);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  const particleCount = Math.min(48, Math.ceil(width / 30));
  const particles = Array.from({ length: particleCount }, () => new Particle());

  let isTabVisible = true;
  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
  });

  function renderLoop() {
    if (isTabVisible) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
    }
    requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

/* ====================================================================
   THEME MANAGEMENT (Dark / Light with LocalStorage)
   ==================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('theme') || 'dark';
  } catch (error) {
    console.error('Unable to load the saved theme preference:', error);
    showToast('Theme preference is unavailable in this browser.', 'info');
  }

  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeAria(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlRoot.setAttribute('data-theme', newTheme);
      updateThemeAria(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
        showToast(`Switched to ${newTheme} mode`, 'info');
      } catch (error) {
        console.error('Unable to save the theme preference:', error);
        showToast('Theme changed for this visit, but the preference could not be saved.', 'info');
      }
    });
  }

  function updateThemeAria(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
}

/* ====================================================================
   5. MOBILE NAVIGATION DRAWER
   ==================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !navMenu) return;

  function toggleMenu(isOpen) {
    const open = typeof isOpen === 'boolean' ? isOpen : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', open);
    hamburgerBtn.classList.toggle('active', open);
    hamburgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburgerBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ====================================================================
   6. SCROLLSPY & ACTIVE SECTION HIGHLIGHT
   ==================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
          currentSectionId = section.getAttribute('id');
        }
      });
      setActiveLink(currentSectionId);
    }, { passive: true });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.getAttribute('id'));
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));

  function setActiveLink(id) {
    if (!id) return;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* ====================================================================
   7. INTERACTIVE TERMINAL CODE PREVIEW
   ==================================================================== */
function initTerminalRunner() {
  const runBtn = document.getElementById('run-terminal-btn');
  const outputConsole = document.getElementById('terminal-output');

  if (!runBtn || !outputConsole) return;

  runBtn.addEventListener('click', () => {
    const isVisible = outputConsole.classList.contains('visible');

    if (!isVisible) {
      outputConsole.innerHTML = `
        <div class="terminal-output-prompt">$ gcc sivakarthi_profile.c -o siva &amp;&amp; ./siva</div>
        <div class="terminal-output-line">Program compiled successfully with 0 warnings.</div>
        <div class="terminal-output-line">Status: Ready to learn, build &amp; solve problems.</div>
        <div class="terminal-output-line">${escapeHTML(document.getElementById('terminal-academic-cohort').textContent)}</div>
      `;

      outputConsole.classList.add('visible');
      runBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        <span id="terminal-btn-text">Hide Output</span>
      `;
      showToast('Code preview complete.', 'success');
    } else {
      outputConsole.classList.remove('visible');
      runBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span id="terminal-btn-text">Run Code</span>
      `;
    }
  });
}

/* ====================================================================
   8. DATA-DRIVEN PORTFOLIO CONTENT RENDERING
   ==================================================================== */
function getSkillIconSvg(iconName) {
  const icons = {
    code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    terminal: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
    cpu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>',
    coffee: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>',
    layout: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    palette: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
    zap: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    'git-branch': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>',
    microchip: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line></svg>',
    wifi: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>'
  };
  return icons[iconName] || icons.code;
}

function renderPortfolioContent() {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  // Render Skills Grid
  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid && data.skills) {
    skillsGrid.innerHTML = data.skills.map(skill => `
      <div class="skill-card" data-category="${escapeHTML(skill.category)}">
        <div class="skill-card-top">
          <div class="skill-icon-wrapper">
            ${getSkillIconSvg(skill.icon)}
          </div>
          <span class="skill-badge ${escapeHTML(skill.levelClass || 'learning')}">${escapeHTML(skill.level)}</span>
        </div>
        <h3 class="skill-name">${escapeHTML(skill.name)}</h3>
        <p class="skill-description">${escapeHTML(skill.description)}</p>
        <div class="skill-indicator-track">
          <div class="skill-indicator-fill ${escapeHTML(skill.levelClass || 'learning')}"></div>
        </div>
      </div>
    `).join('');
  }

  // Render Projects Grid
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid && data.projects) {
    projectsGrid.innerHTML = data.projects.map(project => {
      const liveUrl = getSafeHttpUrl(project.liveUrl);
      return `
      <article class="project-card" data-project-id="${escapeHTML(project.id)}">
        <div class="project-card-header">
          <span class="project-status-tag ${escapeHTML(project.statusBadge || 'status-exploring')}">${escapeHTML(project.status || 'In progress')}</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">${escapeHTML(project.title)}</h3>
          <p class="project-card-desc">${escapeHTML(project.shortDescription)}</p>
          <div class="project-tech-list">
            ${(project.technologies || []).map(technology => `<span class="tech-tag">${escapeHTML(technology)}</span>`).join('')}
          </div>
          <div class="project-card-actions">
            <button class="btn btn-secondary btn-sm open-modal-btn" data-project="${escapeHTML(project.id)}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>View Project Details</span>
            </button>
            <button class="btn btn-outline btn-sm github-repo-btn" title="${project.githubUrl ? 'Open repository' : 'Code link will be active once published on GitHub'}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>${project.githubUrl ? 'GitHub Repo' : 'Code [Placeholder]'}</span>
            </button>
            ${liveUrl ? `
              <a class="btn btn-primary btn-sm project-live-btn" href="${escapeHTML(liveUrl)}" target="_blank" rel="noopener noreferrer">
                <span>Play Live</span>
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `;
    }).join('');
  }

  // Render Certificates Grid
  const certificatesGrid = document.getElementById('certificates-grid');
  if (certificatesGrid && data.certificates) {
    certificatesGrid.innerHTML = data.certificates.map(certificate => `
      <article class="cert-card">
        ${certificate.status ? `<span class="cert-badge skill-badge ${escapeHTML(certificate.statusClass || 'learning')}">${escapeHTML(certificate.status)}</span>` : ''}
        <h3 class="cert-title">${escapeHTML(certificate.title)}</h3>
        <div class="cert-issuer">${escapeHTML(certificate.issuer)}</div>
        <div class="cert-date">${escapeHTML(certificate.date)}</div>
        <p class="cert-desc">${escapeHTML(certificate.description || '')}</p>
        <button class="cert-action-btn" data-cert-id="${escapeHTML(certificate.id)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <span>${escapeHTML(certificate.credentialLinkLabel || 'View Credential Details')}</span>
        </button>
      </article>
    `).join('');
  }
}

/* ====================================================================
   9. SKILLS CATEGORY FILTERING
   ==================================================================== */
function initSkillFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      const skillCards = document.querySelectorAll('.skill-card');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });

    });
  });
}

/* ====================================================================
   10. PROJECT DETAILS MODAL (ACCESSIBLE DIALOG)
   ==================================================================== */
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalStatusBadge = document.getElementById('modal-status-badge');
  const modalBody = document.getElementById('modal-project-body');
  const modalGithubAction = document.getElementById('modal-github-action');

  let lastActiveElement = null;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (!btn) return;
    const projectId = btn.getAttribute('data-project');
    openProjectModal(projectId, btn);
  });

  function openProjectModal(projectId, triggerBtn) {
    lastActiveElement = triggerBtn;

    const project = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects)
      ? window.PORTFOLIO_DATA.projects.find(p => p.id === projectId)
      : null;

    if (!project) return;

    modalTitle.textContent = project.title;
    modalStatusBadge.textContent = project.status;
    modalStatusBadge.className = `project-status-tag ${project.statusBadge}`;

    const details = project.modalDetails;
    modalBody.innerHTML = `
      <div>
        <h4 class="modal-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          Project Overview
        </h4>
        <p>${escapeHTML(details.problemStatement)}</p>
      </div>

      <div>
        <h4 class="modal-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          Key Technical Features
        </h4>
        <ul class="modal-list">
          ${details.keyFeatures.map(feat => `<li>${escapeHTML(feat)}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 class="modal-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line></svg>
          System Architecture / Circuit Logic
        </h4>
        <div class="modal-code-box">${escapeHTML(details.circuitOrArchitecture)}</div>
      </div>

      <div>
        <h4 class="modal-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          Foundational Concepts Learned
        </h4>
        <ul class="modal-list">
          ${details.keyLearnings.map(learn => `<li>${escapeHTML(learn)}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 class="modal-section-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
          Future Enhancements &amp; Roadmap
        </h4>
        <ul class="modal-list">
          ${details.futureEnhancements.map(enh => `<li>${escapeHTML(enh)}</li>`).join('')}
        </ul>
      </div>
    `;

    if (project.githubUrl && project.githubUrl.trim() !== '') {
      modalGithubAction.href = project.githubUrl;
      modalGithubAction.target = "_blank";
      modalGithubAction.removeAttribute('disabled');
      modalGithubAction.style.pointerEvents = 'auto';
      modalGithubAction.style.opacity = '1';
    } else {
      modalGithubAction.href = "#";
      modalGithubAction.style.opacity = '0.6';
      modalGithubAction.onclick = (e) => {
        e.preventDefault();
        showToast('Repository link placeholder: Source code will be linked upon GitHub publish.', 'info');
      };
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      modalCloseBtn.focus();
    }, 50);
  }

  function closeModal() {
    if (!modalOverlay.classList.contains('active')) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
  });
}

/* ====================================================================
   11. CERTIFICATE CREDENTIAL DETAILS
   ==================================================================== */
function initCertificateActions() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.cert-action-btn');
    if (!btn) return;
    const certId = btn.getAttribute('data-cert-id');
    const cert = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.certificates)
      ? window.PORTFOLIO_DATA.certificates.find(c => c.id === certId)
      : null;

    if (cert) {
      const credentialUrl = getSafeHttpUrl(cert.credentialUrl);
      if (credentialUrl) {
        window.open(credentialUrl, '_blank', 'noopener,noreferrer');
      } else {
        showToast(`"${cert.title}": ${cert.status} (${cert.issuer}). Official verification link will be added upon completion!`, 'info');
      }
    }
  });
}

/* ====================================================================
   12. CONTACT FORM VALIDATION & DISPATCHER
   ==================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  const feedbackList = document.getElementById('saved-feedback-list');
  const feedbackStatus = document.getElementById('feedback-storage-status');
  const clearFeedbackButton = document.getElementById('clear-feedback-btn');
  const submitButton = document.getElementById('form-submit-btn');
  const submitLabel = submitButton && submitButton.querySelector('span');
  const formNotice = form.querySelector('.form-notice');
  const requiredElements = [
    nameInput, emailInput, subjectInput, messageInput, feedbackList,
    feedbackStatus, clearFeedbackButton, submitButton, submitLabel, formNotice
  ];

  if (requiredElements.some(element => !element)) {
    console.error('Contact form is missing a required field or feedback display element.');
    return;
  }

  const fields = [
    {
      input: nameInput,
      group: document.getElementById('group-name'),
      isValid: value => value.length >= 2 && value.length <= 100
    },
    {
      input: emailInput,
      group: document.getElementById('group-email'),
      isValid: value => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      input: subjectInput,
      group: document.getElementById('group-subject'),
      isValid: value => value.length >= 3 && value.length <= 160
    },
    {
      input: messageInput,
      group: document.getElementById('group-message'),
      isValid: value => value.length >= 10 && value.length <= 5000
    }
  ];

  if (fields.some(field => !field.group)) {
    console.error('Contact form is missing a field group.');
    return;
  }

  const storageKey = 'portfolio-feedback';
  let savedFeedback = [];
  let isSubmitting = false;
  const profile = window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.profile;
  const configuredEndpoint = profile && String(profile.contactEndpoint || '').trim();
  const contactEndpoint = configuredEndpoint ? getSafeHttpUrl(configuredEndpoint) : '';
  const hasInvalidEndpoint = Boolean(configuredEndpoint && !contactEndpoint);

  if (hasInvalidEndpoint) {
    console.error('The configured contact endpoint must be a valid HTTP or HTTPS URL.');
    formNotice.textContent = 'The contact API URL is invalid. Feedback can only be saved in this browser.';
  } else if (contactEndpoint) {
    formNotice.textContent = 'Your name, email, subject, and message will be sent to Sivakarthi through the configured contact API. If delivery fails, your name, subject, and message will be saved in this browser.';
    submitLabel.textContent = 'Send Message';
  }

  function readSavedFeedback() {
    const storedValue = localStorage.getItem(storageKey);
    if (!storedValue) return [];

    const parsedValue = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue) || parsedValue.some(entry =>
      !entry ||
      typeof entry.id !== 'string' ||
      typeof entry.name !== 'string' ||
      typeof entry.subject !== 'string' ||
      typeof entry.message !== 'string' ||
      typeof entry.createdAt !== 'string' ||
      Number.isNaN(Date.parse(entry.createdAt))
    )) {
      throw new Error('Saved feedback has an invalid format.');
    }

    return parsedValue;
  }

  function renderSavedFeedback() {
    feedbackList.replaceChildren();
    clearFeedbackButton.hidden = savedFeedback.length === 0;

    if (savedFeedback.length === 0) {
      const emptyState = document.createElement('li');
      emptyState.className = 'saved-feedback-empty';
      emptyState.textContent = 'No feedback has been saved in this browser.';
      feedbackList.appendChild(emptyState);
      return;
    }

    savedFeedback.slice().reverse().forEach(entry => {
      const item = document.createElement('li');
      item.className = 'saved-feedback-item';

      const heading = document.createElement('h4');
      heading.textContent = entry.subject;

      const attribution = document.createElement('p');
      attribution.className = 'saved-feedback-attribution';
      attribution.textContent = `By ${entry.name} · ${new Date(entry.createdAt).toLocaleString()}`;

      const message = document.createElement('p');
      message.className = 'saved-feedback-message';
      message.textContent = entry.message;

      item.append(heading, attribution, message);
      feedbackList.appendChild(item);
    });
  }

  try {
    savedFeedback = readSavedFeedback();
    renderSavedFeedback();
  } catch (error) {
    feedbackStatus.textContent = 'Saved feedback could not be loaded. Clear the saved data in this browser before submitting again.';
    clearFeedbackButton.hidden = false;
    feedbackList.replaceChildren();
    const unavailableState = document.createElement('li');
    unavailableState.className = 'saved-feedback-empty';
    unavailableState.textContent = 'Saved feedback is unavailable.';
    feedbackList.appendChild(unavailableState);
    console.error('Unable to load saved portfolio feedback:', error);
  }

  fields.forEach(field => {
    field.input.addEventListener('input', () => {
      if (field.group.classList.contains('has-error')) {
        setFieldValidity(field, field.isValid(field.input.value.trim()));
      }
    });
  });

  clearFeedbackButton.addEventListener('click', () => {
    try {
      localStorage.removeItem(storageKey);
      savedFeedback = [];
      feedbackStatus.textContent = 'Saved feedback was cleared from this browser.';
      renderSavedFeedback();
    } catch (error) {
      feedbackStatus.textContent = 'Saved feedback could not be cleared. Check this browser storage settings.';
      console.error('Unable to clear saved portfolio feedback:', error);
    }
  });

  function setFieldValidity(field, isValid) {
    field.group.classList.toggle('has-error', !isValid);
    field.input.setAttribute('aria-invalid', isValid ? 'false' : 'true');
  }

  function saveFeedback(entry) {
    const updatedFeedback = [...readSavedFeedback(), entry];
    localStorage.setItem(storageKey, JSON.stringify(updatedFeedback));
    savedFeedback = updatedFeedback;
    renderSavedFeedback();
  }

  function resetForm() {
    form.reset();
    fields.forEach(field => setFieldValidity(field, true));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    let isValid = true;
    let firstInvalidField = null;
    fields.forEach(field => {
      const fieldIsValid = field.isValid(field.input.value.trim());
      setFieldValidity(field, fieldIsValid);
      if (!fieldIsValid && !firstInvalidField) firstInvalidField = field.input;
      isValid = isValid && fieldIsValid;
    });

    if (!isValid) {
      firstInvalidField.focus();
      showToast('Please correct the highlighted fields.', 'info');
      return;
    }

    const feedbackEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: nameInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
      createdAt: new Date().toISOString()
    };

    isSubmitting = true;
    submitButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    submitLabel.textContent = contactEndpoint ? 'Sending...' : 'Saving...';
    feedbackStatus.textContent = contactEndpoint ? 'Sending your message...' : 'Saving feedback in this browser...';

    try {
      if (contactEndpoint) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        let response;
        let deliveryError;

        try {
          response = await fetch(contactEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: feedbackEntry.name,
              email: emailInput.value.trim(),
              subject: feedbackEntry.subject,
              message: feedbackEntry.message
            }),
            signal: controller.signal
          });
        } catch (error) {
          deliveryError = error;
        } finally {
          clearTimeout(timeoutId);
        }

        if (deliveryError || !response.ok) {
          const error = deliveryError || new Error(`Contact API returned HTTP ${response.status}.`);
          console.error('Unable to send portfolio feedback:', error);
          try {
            saveFeedback(feedbackEntry);
          } catch (storageError) {
            console.error('Unable to save feedback after contact delivery failed:', storageError);
            feedbackStatus.textContent = 'Message could not be sent, and feedback could not be saved in this browser. Please try again or email Sivakarthi directly.';
            showToast('Message could not be sent or saved.', 'info');
            return;
          }
          feedbackStatus.textContent = 'Message could not be sent. Your feedback was saved in this browser only; Sivakarthi was not notified.';
          resetForm();
          showToast('Message could not be sent; feedback was saved locally.', 'info');
          return;
        }

        feedbackStatus.textContent = 'Message sent successfully.';
        resetForm();
        showToast('Your message was sent successfully.', 'success');
        return;
      }

      saveFeedback(feedbackEntry);
      feedbackStatus.textContent = hasInvalidEndpoint
        ? 'The contact API URL is invalid. Feedback was saved in this browser only; Sivakarthi was not notified.'
        : 'Feedback saved in this browser only. Sivakarthi will not receive it.';
      resetForm();
      showToast('Feedback saved on this device only.', 'success');
    } catch (error) {
      feedbackStatus.textContent = 'Feedback could not be saved. Check this browser’s storage settings and try again.';
      console.error('Unable to save portfolio feedback:', error);
      showToast('Feedback could not be saved in this browser.', 'info');
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      form.removeAttribute('aria-busy');
      submitLabel.textContent = contactEndpoint ? 'Send Message' : 'Save Feedback on This Device';
    }
  });
}

/* ====================================================================
   13. DYNAMIC YEAR & DATA SYNC
   ==================================================================== */
function initDataSync() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.profile) {
    const p = window.PORTFOLIO_DATA.profile;
    const academicStatus = getAcademicStatus(p);

    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto && p.photoPath) {
      profilePhoto.src = p.photoPath;
      profilePhoto.alt = `${p.name}'s profile photo`;
    }

    const heroAcademicStatus = document.getElementById('hero-academic-status');
    if (heroAcademicStatus) {
      heroAcademicStatus.textContent = academicStatus.isGraduated
        ? 'ECE Graduate @ Panimalar Engineering College'
        : academicStatus.isIncoming
          ? `Starting ECE in ${academicStatus.startYear} @ Panimalar Engineering College`
          : `${academicStatus.yearLabel}-Year ECE @ Panimalar Engineering College`;
    }

    const aboutAcademicYear = document.getElementById('about-academic-year');
    if (aboutAcademicYear) {
      aboutAcademicYear.textContent = `Class of ${academicStatus.startYear} - ${academicStatus.graduationYear} (${academicStatus.standingText})`;
    }

    const resumeCourseDates = document.getElementById('resume-course-dates');
    if (resumeCourseDates) {
      resumeCourseDates.textContent = `Panimalar Engineering College, Chennai • ${academicStatus.startYear} - ${academicStatus.graduationYear}`;
    }

    const terminalGraduationYear = document.getElementById('terminal-grad-year');
    if (terminalGraduationYear) {
      terminalGraduationYear.textContent = academicStatus.graduationYear;
    }

    const academicCohort = document.getElementById('logo-academic-cohort');
    if (academicCohort) {
      academicCohort.textContent = `ECE '${String(academicStatus.graduationYear).slice(-2)}`;
    }

    const terminalAcademicCohort = document.getElementById('terminal-academic-cohort');
    if (terminalAcademicCohort) {
      terminalAcademicCohort.textContent = `> Panimalar Engineering College (ECE '${String(academicStatus.graduationYear).slice(-2)}) initialized!`;
    }

    const publicEmail = getPublicEmail(p.email);
    const emailLink = document.getElementById('contact-email-link');
    const emailItem = document.getElementById('contact-email-item');
    const footerEmailLink = document.getElementById('footer-email-link');
    if (publicEmail) {
      if (emailItem) emailItem.hidden = false;
      if (emailLink) {
        emailLink.href = `mailto:${publicEmail}`;
        emailLink.textContent = publicEmail;
      }
      if (footerEmailLink) {
        footerEmailLink.hidden = false;
        footerEmailLink.href = `mailto:${publicEmail}`;
        footerEmailLink.textContent = 'Email';
      }
    } else {
      if (emailItem) emailItem.hidden = true;
      if (footerEmailLink) footerEmailLink.hidden = true;
    }

    const linkedinHero = document.getElementById('hero-linkedin-link');
    const linkedinContact = document.getElementById('contact-linkedin-link');
    const linkedinFooter = document.getElementById('footer-linkedin-link');
    const certificatesLinkedin = document.getElementById('certificates-linkedin-link');
    if (p.linkedin) {
      if (linkedinHero) linkedinHero.href = p.linkedin;
      if (linkedinContact) linkedinContact.href = p.linkedin;
      if (linkedinFooter) linkedinFooter.href = p.linkedin;
      if (certificatesLinkedin) certificatesLinkedin.href = p.linkedin;
    }

    const githubHero = document.getElementById('hero-github-link');
    const githubContact = document.getElementById('contact-github-link');
    const githubFooter = document.getElementById('footer-github-link');
    if (p.github) {
      if (githubHero) githubHero.href = p.github;
      if (githubContact) githubContact.href = p.github;
      if (githubFooter) githubFooter.href = p.github;
    }

    const resumeBtn = document.getElementById('download-resume-btn');
    if (resumeBtn && p.resumePath) {
      resumeBtn.href = p.resumePath;
    }
  }
}

function getAcademicStatus(profile) {
  const startYear = Number(profile.studyStartYear);
  const duration = Number(profile.studyDuration);
  const startMonth = Number(profile.studyStartMonth) || 1;
  const currentDate = new Date();
  const academicYearStart = currentDate.getFullYear() - (currentDate.getMonth() + 1 < startMonth ? 1 : 0);
  const currentStudyYear = academicYearStart - startYear + 1;
  const yearWords = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'];
  const isIncoming = currentStudyYear <= 0;
  const isGraduated = currentStudyYear > duration;
  const yearLabel = yearWords[currentStudyYear - 1] || `${currentStudyYear}th`;

  return {
    startYear,
    graduationYear: startYear + duration,
    yearLabel,
    isIncoming,
    isGraduated,
    standingText: isGraduated ? 'Graduated' : isIncoming ? `Starting ${startYear}` : `${yearLabel} Year`
  };
}

/* ====================================================================
   14. PLACEHOLDER REPOSITORY GUARDS
   ==================================================================== */
function initPlaceholderGuards() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.github-repo-btn');
    if (!btn) return;
    e.preventDefault();

    const projectCard = btn.closest('[data-project-id]');
    const projectId = projectCard ? projectCard.getAttribute('data-project-id') : null;
    const project = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects)
      ? window.PORTFOLIO_DATA.projects.find(item => item.id === projectId)
      : null;
    const repositoryUrl = project && project.githubUrl
      ? project.githubUrl
      : btn.getAttribute('data-url');
    const url = getSafeHttpUrl(repositoryUrl);


    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Repository link placeholder: Sivakarthi will publish the source code soon!', 'info');
    }
  });
}

/* ====================================================================
   HELPER FUNCTIONS
   ==================================================================== */
let toastTimeout = null;
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.className = `toast-box show toast-${type}`;

  if (toastTimeout) clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getPublicEmail(value) {
  const email = String(value || '').trim();
  if (!email) return '';
  if (/placeholder|example\.com|your\.email/i.test(email)) return '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}

function getSafeHttpUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(String(value).trim(), window.location.href);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch (error) {
    return '';
  }
}
