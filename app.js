/**
 * KJ NEXUS — Karthik Mohan J Developer Portfolio
 * Interactive Core Logic, Cursor-Tracking 3D Character Hero, and Dynamic Components
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData || {};
  const {
    personalInfo = {},
    typingRoles = [],
    aboutCards = [],
    services = [],
    featuredTechStack = [],
    experiences = [],
    skillCategories = [],
    projects = []
  } = data;

  initTypingEffect(typingRoles);
  initCursorTrackingCharacter();
  initCustomCursor();
  renderAboutCards(aboutCards);
  renderServices(services);
  renderTechStrip(featuredTechStack);
  renderSkills(skillCategories);
  renderProjects('all', projects);
  initProjectFilters(projects);
  renderExperiences(experiences);
  initContactForm(personalInfo);
  initNavigation();
  initCopyEmail(personalInfo);
  initModalListeners(projects);
  updateDynamicYear();
  initLucideIcons();
});

/* ==========================================================================
   1. TYPING EFFECT
   ========================================================================== */
function initTypingEffect(roles) {
  const typedSpan = document.getElementById('hero-typed-text');
  if (!typedSpan || !roles || roles.length === 0) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const eraseSpeed = 40;
  const pauseEnd = 2400;
  const pauseStart = 400;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, pauseEnd);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      typedSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, pauseStart);
        return;
      }
      setTimeout(tick, eraseSpeed);
    }
  }

  tick();
}

/* ==========================================================================
   2. CURSOR-TRACKING 3D CHARACTER HERO (CANVAS-BASED RENDERER)
   ========================================================================== */
function initCursorTrackingCharacter() {
  const canvas = document.getElementById('character-canvas');
  const stage = document.getElementById('hero-character-stage');
  const fallbackImg = document.getElementById('character-fallback-img');
  if (!canvas || !stage) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Configuration tuned from the PDF tutorial
  const config = {
    responseFactor: 0.26, // Response factor per PDF
    deadZoneRatio: 0.14,   // Center dead zone (~14% radius) for direct eye contact
    framesDir: 'public/frames/',
    manifestPath: 'public/frames/manifest.json',
    centerFramePath: 'public/frames/center.webp',
    fallbackCenterPath: 'public/character_neutral.webp'
  };

  // State
  let directionalFrames = [];
  let centerFrame = null;
  let hasDirectionalFrames = false;
  let totalFrames = 0;
  let isDeadZone = true;
  let currentAngle = -Math.PI / 2; // Default facing Up / Center
  let targetAngle = -Math.PI / 2;
  let pointerX = window.innerWidth * 0.7;
  let pointerY = window.innerHeight * 0.4;
  let lastTimestamp = performance.now();
  let rafId = null;
  let isTabVisible = true;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Shortest-path angular interpolation helper per PDF
  function lerpAngle(current, target, factor) {
    let diff = (target - current) % (2 * Math.PI);
    if (diff < -Math.PI) diff += 2 * Math.PI;
    if (diff > Math.PI) diff -= 2 * Math.PI;
    return current + diff * factor;
  }

  // Canvas DPI and sizing
  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.round(rect.width);
    const displayHeight = Math.round(rect.height);

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Load neutral center frame
  const loadCenterImage = new Promise((resolve) => {
    const img = new Image();
    img.src = config.centerFramePath;
    img.onload = () => {
      centerFrame = img;
      if (fallbackImg) fallbackImg.style.opacity = '0';
      resolve(true);
    };
    img.onerror = () => {
      // Fallback to secondary neutral image
      const fallback = new Image();
      fallback.src = config.fallbackCenterPath;
      fallback.onload = () => {
        centerFrame = fallback;
        if (fallbackImg) fallbackImg.style.opacity = '0';
        resolve(true);
      };
      fallback.onerror = () => {
        resolve(false);
      };
    };
  });

  // Attempt to load manifest and directional frames
  fetch(config.manifestPath)
    .then(res => res.json())
    .then(manifest => {
      if (manifest && manifest.frameFiles && manifest.frameFiles.length > 0) {
        totalFrames = manifest.frameFiles.length;
        let loadedCount = 0;
        manifest.frameFiles.forEach((filename, idx) => {
          const img = new Image();
          img.src = config.framesDir + filename;
          img.onload = () => {
            loadedCount++;
            directionalFrames[idx] = img;
            if (loadedCount === totalFrames) {
              hasDirectionalFrames = true;
            }
          };
        });
      }
    })
    .catch(() => {
      // Manifest not yet available or awaiting video extraction
      hasDirectionalFrames = false;
    });

  // Pointer position tracker
  function onPointerMove(e) {
    pointerX = e.clientX;
    pointerY = e.clientY;
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // Tab visibility changes
  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
    if (isTabVisible) {
      lastTimestamp = performance.now();
      if (!rafId) rafId = requestAnimationFrame(renderLoop);
    } else {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  });

  // Render loop
  function renderLoop(timestamp) {
    if (!isTabVisible) return;

    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
    lastTimestamp = timestamp;

    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.45;

    const dx = pointerX - centerX;
    const dy = pointerY - centerY;
    const distance = Math.hypot(dx, dy);

    const screenRadius = Math.max(window.innerWidth, window.innerHeight) * 0.5;
    const deadZoneRadius = screenRadius * config.deadZoneRatio;

    isDeadZone = distance < deadZoneRadius;

    if (!isDeadZone) {
      targetAngle = Math.atan2(dy, dx);
    }

    // Time-based interpolation
    const dampingFactor = 1 - Math.pow(1 - config.responseFactor, dt * 60);
    currentAngle = lerpAngle(currentAngle, targetAngle, dampingFactor);

    // Canvas drawing
    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    if (centerFrame && centerFrame.complete) {
      if (hasDirectionalFrames && !isDeadZone && totalFrames > 0) {
        // Clockwise normalized angle starting from Up (-PI/2)
        let clockAngle = currentAngle + Math.PI / 2;
        if (clockAngle < 0) clockAngle += 2 * Math.PI;
        clockAngle = clockAngle % (2 * Math.PI);

        const frameIndex = Math.min(
          totalFrames - 1,
          Math.max(0, Math.floor((clockAngle / (2 * Math.PI)) * totalFrames))
        );

        const activeFrame = directionalFrames[frameIndex] || centerFrame;
        drawContainedImage(ctx, activeFrame, width, height);
      } else {
        // Neutral center pose (direct eye contact) - fixed and properly aligned
        drawContainedImage(ctx, centerFrame, width, height, 0, 0);
      }
    }

    rafId = requestAnimationFrame(renderLoop);
  }

  // Draw image contained and centered with seamless dark background
  function drawContainedImage(context, image, w, h, offX = 0, offY = 0) {
    if (!image || !image.width || !image.height) return;
    const imgRatio = image.width / image.height;
    const targetRatio = w / h;
    let drawW, drawH, drawX, drawY;

    if (imgRatio > targetRatio) {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    } else {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    }

    context.globalAlpha = 1.0;
    context.drawImage(image, drawX + offX, drawY + offY, drawW, drawH);
  }

  loadCenterImage.then(() => {
    lastTimestamp = performance.now();
    rafId = requestAnimationFrame(renderLoop);
  });
}

/* ==========================================================================
   3. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Don't enable on touch or reduced motion
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovering = false;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }, { passive: true });

  function updateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(updateRing);
  }
  requestAnimationFrame(updateRing);

  // Attach hover expand states to interactive elements
  const interactiveSelectors = 'a, button, input, textarea, select, .project-card, .filter-btn, .about-card, .service-card';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover-active');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hover-active');
    });
  });
}

/* ==========================================================================
   4. RENDER ABOUT CARDS (Matching Reference 4 Cards)
   ========================================================================== */
function renderAboutCards(cards) {
  const container = document.getElementById('about-cards-container');
  if (!container || !cards || cards.length === 0) return;

  container.innerHTML = cards.map(c => `
    <div class="about-card">
      <div class="about-card-icon">
        <i data-lucide="${c.icon}"></i>
      </div>
      <h3 class="about-card-title">${c.title}</h3>
      <p class="about-card-desc">${c.description}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   5. RENDER SERVICES SECTION (Matching Reference 4 Desktop Cards)
   ========================================================================== */
function renderServices(servicesList) {
  const container = document.getElementById('services-container');
  if (!container || !servicesList || servicesList.length === 0) return;

  container.innerHTML = servicesList.map(s => `
    <div class="service-card">
      <div class="service-icon-box">
        <i data-lucide="${s.icon}"></i>
      </div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.description}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   6. RENDER TECH STACK (Strip & Categorized Capabilities)
   ========================================================================== */
function renderTechStrip(techList) {
  const container = document.getElementById('tech-strip-container');
  if (!container || !techList) return;

  const iconSvgs = {
    "HTML5": '<i data-lucide="file-code-2"></i>',
    "CSS3": '<i data-lucide="palette"></i>',
    "JavaScript": '<i data-lucide="code-2"></i>',
    "TypeScript": '<i data-lucide="braces"></i>',
    "React": '<i data-lucide="atom"></i>',
    "Next.js": '<i data-lucide="globe"></i>',
    "Node.js": '<i data-lucide="server"></i>',
    "Express.js": '<i data-lucide="network"></i>',
    "Tailwind CSS": '<i data-lucide="wind"></i>',
    "Git": '<i data-lucide="git-branch"></i>',
    "Python": '<i data-lucide="terminal"></i>',
    "MongoDB": '<i data-lucide="database"></i>'
  };

  container.innerHTML = techList.map(t => `
    <div class="tech-tile">
      <div class="tech-tile-icon">
        ${iconSvgs[t.name] || '<i data-lucide="code"></i>'}
      </div>
      <span class="tech-tile-name">${t.name}</span>
    </div>
  `).join('');
}

function renderSkills(skillCategories) {
  const container = document.getElementById('skills-grid');
  if (!container || !skillCategories) return;

  const categoryIcons = {
    "Frontend": "layout",
    "Backend & APIs": "server",
    "Database & Tools": "database",
    "Data & Machine Learning": "cpu"
  };

  container.innerHTML = skillCategories.map(cat => `
    <div class="skill-category-card">
      <div class="category-header">
        <div class="category-icon">
          <i data-lucide="${categoryIcons[cat.category] || 'code-2'}"></i>
        </div>
        <h3 class="category-title">${cat.category}</h3>
      </div>
      <p class="category-description">${cat.description}</p>
      <div class="skills-badge-list">
        ${cat.skills.map(s => `
          <div class="skill-badge ${s.level.toLowerCase().includes('basic') ? 'basic-knowledge' : ''}">
            <span>${s.name}</span>
            <span class="badge-level">${s.level}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   7. RENDER FEATURED PROJECTS (3-Column Grid + Flagship MetricFit + Live Previews)
   ========================================================================== */

function isValidHttpUrl(string) {
  if (!string || typeof string !== 'string') return false;
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function getDisplayHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch (_) {
    return 'live-demo';
  }
}

function renderProjectPreview(p) {
  const isMetricFit = p.id === 'metricfit';
  const hasLiveUrl = isValidHttpUrl(p.liveUrl);

  if (hasLiveUrl) {
    const hostname = getDisplayHostname(p.liveUrl);
    return `
      <div class="project-thumbnail-wrapper has-live-preview" data-live-url="${p.liveUrl}" data-project-id="${p.id}">
        <!-- Browser Window Header -->
        <div class="preview-browser-bar">
          <div class="preview-traffic-dots" aria-hidden="true">
            <span class="preview-dot dot-close"></span>
            <span class="preview-dot dot-min"></span>
            <span class="preview-dot dot-max"></span>
          </div>

          <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="preview-url-bar" title="Open ${p.liveUrl} in new tab">
            <i data-lucide="lock" class="preview-lock-icon"></i>
            <span class="preview-url-domain">${hostname}</span>
          </a>

          <div class="preview-browser-controls">
            <button type="button" class="preview-control-btn preview-interact-toggle" title="Toggle interactive preview mode" aria-label="Toggle interaction for ${p.title}">
              <i data-lucide="mouse-pointer" style="width: 10px; height: 10px;"></i>
              <span class="interact-label">Interact</span>
            </button>
            <span class="preview-status-pill" title="Live Deployment Active">
              <span class="preview-live-dot"></span>
              <span class="preview-live-text">LIVE</span>
            </span>
          </div>
        </div>

        <!-- Live Iframe Viewport -->
        <div class="preview-frame-container">
          <!-- Loading skeleton state -->
          <div class="preview-skeleton">
            <div class="preview-spinner"></div>
            <span class="preview-status-note">Connecting to ${hostname}...</span>
          </div>

          <!-- Embedded Website -->
          <iframe
            data-src="${p.liveUrl}"
            title="${p.title} Live Website Preview"
            class="project-live-frame"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            tabindex="-1"
            aria-label="Live deployed website preview of ${p.title}"
          ></iframe>

          <!-- Fallback view if embedding blocked by host -->
          <div class="preview-fallback-view" style="display: none;">
            <div class="fallback-content">
              <div class="tech-wireframe-mockup in-fallback">
                <div class="wireframe-top">
                  <div class="wf-dot"></div>
                  <div class="wf-dot"></div>
                  <div class="wf-dot"></div>
                  <span style="margin-left: auto; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--secondary-text);">
                    ${p.metrics || p.categoryLabel}
                  </span>
                </div>
                <div class="wireframe-content">
                  <div class="wf-line accent" style="width: 60%;"></div>
                  <div class="wf-line medium"></div>
                  <div class="wf-line short"></div>
                </div>
              </div>
              <div class="fallback-note-wrap">
                <p class="fallback-sub">Preview protected by host security policy.</p>
                <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm fallback-btn">
                  <span>Open Live Demo</span>
                  <i data-lucide="external-link" style="width: 12px; height: 12px;"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Non-interfering Click Shield (Prevents scroll trapping, click to open live site) -->
          <div class="preview-hover-shield" title="Click to open live site in new tab" role="button" tabindex="0" aria-label="Open ${p.title} live demo in new tab">
            <div class="preview-badge-action">
              <span>Open Live Website</span>
              <i data-lucide="external-link" style="width: 12px; height: 12px;"></i>
            </div>
          </div>

          <!-- Delayed Timeout Notice (if slow or blocked) -->
          <div class="preview-timeout-banner" style="display: none;">
            <span>Taking longer to load?</span>
            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Launch Demo ↗</a>
          </div>
        </div>
      </div>
    `;
  }

  // Fallback 1: Project with real image (MetricFit flagship)
  if (p.image) {
    return `
      <div class="project-thumbnail-wrapper">
        <img src="${p.image}" alt="${p.title}" class="project-real-img" loading="lazy" />
        <div class="project-img-overlay"></div>
      </div>
    `;
  }

  // Fallback 2: Project with technical wireframe mockup
  return `
    <div class="project-thumbnail-wrapper">
      <div class="tech-wireframe-mockup">
        <div class="wireframe-top">
          <div class="wf-dot"></div>
          <div class="wf-dot"></div>
          <div class="wf-dot"></div>
          <span style="margin-left: auto; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--secondary-text);">
            ${p.metrics || p.categoryLabel}
          </span>
        </div>
        <div class="wireframe-content">
          <div class="wf-line accent" style="width: 50%;"></div>
          <div class="wf-line medium"></div>
          <div class="wf-line short"></div>
        </div>
      </div>
    </div>
  `;
}

function renderProjects(filterCategory = 'all', projectsList) {
  const container = document.getElementById('projects-container');
  if (!container || !projectsList) return;

  const filtered = filterCategory === 'all' 
    ? projectsList 
    : projectsList.filter(p => p.category === filterCategory);

  container.innerHTML = filtered.map(p => {
    const isMetricFit = p.id === 'metricfit';

    return `
      <div class="project-card ${isMetricFit ? 'flagship-card' : ''}" data-project-id="${p.id}">
        ${renderProjectPreview(p)}

        <div class="project-card-body">
          <div class="project-meta-row">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="project-tag">${p.categoryLabel}</span>
              ${p.formerly ? `<span class="formerly-tag">${p.formerly}</span>` : ''}
            </div>
            ${p.featured ? `<span class="project-tag" style="background: rgba(255, 90, 31, 0.15); border: 1px solid rgba(255, 90, 31, 0.4);">${isMetricFit ? 'Flagship' : 'Featured'}</span>` : ''}
          </div>

          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.shortDesc}</p>

          <div class="project-tags">
            ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <div class="project-actions">
            ${isMetricFit ? `
              <button class="btn btn-primary btn-sm view-details-btn" data-project-id="${p.id}">
                <span>Explore Architecture</span>
                <i data-lucide="layers" style="width: 14px; height: 14px;"></i>
              </button>
            ` : `
              <button class="btn btn-secondary btn-sm view-details-btn" data-project-id="${p.id}">
                <span>View Details</span>
                <i data-lucide="info" style="width: 14px; height: 14px;"></i>
              </button>
              ${p.liveUrl ? `
                <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                  <span>Live Demo</span>
                  <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                </a>
              ` : ''}
              ${p.githubUrl ? `
                <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="GitHub Repository">
                  <span>GitHub</span>
                </a>
              ` : ''}
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
  attachProjectModalTriggers(projectsList);
  initProjectLivePreviews();
}

function initProjectLivePreviews() {
  const wrappers = document.querySelectorAll('.project-thumbnail-wrapper.has-live-preview');
  if (!wrappers.length) return;

  if (window._projectPreviewObserver) {
    window._projectPreviewObserver.disconnect();
  }

  // Lazy loading observer for high performance
  const observerOptions = {
    root: null,
    rootMargin: '250px 0px',
    threshold: 0.01
  };

  window._projectPreviewObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const wrapper = entry.target;
        const iframe = wrapper.querySelector('.project-live-frame');
        const skeleton = wrapper.querySelector('.preview-skeleton');
        const fallback = wrapper.querySelector('.preview-fallback-view');
        const timeoutBanner = wrapper.querySelector('.preview-timeout-banner');

        if (iframe && iframe.dataset.src && !iframe.src) {
          iframe.src = iframe.dataset.src;

          // Timeout check for slow loading or silent host frame blocking
          const loadTimeout = setTimeout(() => {
            if (!wrapper.classList.contains('iframe-loaded') && !wrapper.classList.contains('iframe-failed')) {
              if (timeoutBanner) timeoutBanner.style.display = 'flex';
            }
          }, 7000);

          iframe.addEventListener('load', () => {
            clearTimeout(loadTimeout);
            wrapper.classList.add('iframe-loaded');
            if (skeleton) {
              skeleton.style.opacity = '0';
              setTimeout(() => { skeleton.style.display = 'none'; }, 250);
            }
            if (timeoutBanner) {
              timeoutBanner.style.display = 'none';
            }
          });

          iframe.addEventListener('error', () => {
            clearTimeout(loadTimeout);
            wrapper.classList.add('iframe-failed');
            if (skeleton) skeleton.style.display = 'none';
            if (fallback) fallback.style.display = 'flex';
          });
        }
        observer.unobserve(wrapper);
      }
    });
  }, observerOptions);

  wrappers.forEach(wrap => {
    window._projectPreviewObserver.observe(wrap);

    const shield = wrap.querySelector('.preview-hover-shield');
    const liveUrl = wrap.getAttribute('data-live-url');

    if (shield && liveUrl) {
      shield.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(liveUrl, '_blank', 'noopener,noreferrer');
      });

      shield.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          window.open(liveUrl, '_blank', 'noopener,noreferrer');
        }
      });
    }

    const interactBtn = wrap.querySelector('.preview-interact-toggle');
    const frameWrap = wrap.querySelector('.preview-frame-container');
    if (interactBtn && frameWrap) {
      interactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isInteractive = frameWrap.classList.toggle('interactive-mode');
        const label = interactBtn.querySelector('.interact-label');
        if (isInteractive) {
          interactBtn.classList.add('active');
          if (label) label.textContent = 'Exit';
          interactBtn.title = 'Exit interactive mode (restores smooth scroll)';
        } else {
          interactBtn.classList.remove('active');
          if (label) label.textContent = 'Interact';
          interactBtn.title = 'Toggle interactive preview mode';
        }
      });

      wrap.addEventListener('mouseleave', () => {
        if (frameWrap.classList.contains('interactive-mode')) {
          frameWrap.classList.remove('interactive-mode');
          interactBtn.classList.remove('active');
          const label = interactBtn.querySelector('.interact-label');
          if (label) label.textContent = 'Interact';
        }
      });
    }
  });
}

function initProjectFilters(projectsList) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category, projectsList);
    });
  });
}

/* ==========================================================================
   8. PROJECT MODAL & ARCHITECTURE EXPLORER (With Pricing Engine)
   ========================================================================== */
function attachProjectModalTriggers(projectsList) {
  const detailBtns = document.querySelectorAll('.view-details-btn');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      openProjectModal(projId, projectsList);
    });
  });
}

function openProjectModal(projectId, projectsList) {
  const project = projectsList.find(p => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');

  if (project.id === 'metricfit') {
    modalContent.innerHTML = `
      <div class="modal-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="project-tag" style="background: rgba(255, 90, 31, 0.2); border: 1px solid var(--primary-orange);">Flagship Full-Stack</span>
            <span class="formerly-tag">Formerly KAFitHub</span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--primary-orange); font-weight: 600;">Next.js 16 • React Native • Express 5 • Atlas</span>
        </div>
        <h2 style="font-size: 1.625rem; font-weight: 800; color: #FFFFFF; margin-bottom: 8px;">${project.title}</h2>
        <p style="font-size: 0.9375rem; color: var(--secondary-text); line-height: 1.6;">${project.shortDesc}</p>
      </div>

      <div class="modal-body">
        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">Ecosystem Overview</h4>
          <p style="font-size: 0.9375rem; color: var(--primary-text); line-height: 1.75;">${project.longDesc}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">Three-Layer Technical Architecture</h4>
          <div class="arch-layers-grid">
            ${project.applications.map(app => `
              <div class="arch-layer-card">
                <div class="arch-layer-header">${app.name}</div>
                <div class="arch-layer-badge">${app.stack}</div>
                <p class="arch-layer-desc">${app.details}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">Membership Pricing Engine (Implemented Business Logic)</h4>
          <p style="font-size: 0.875rem; color: var(--secondary-text); margin-bottom: 12px;">
            The platform applies configured base registration fees combined with city-based demographic multipliers and duration plans.
          </p>

          <div class="pricing-calculator-widget">
            <div class="pricing-calc-controls">
              <div>
                <label style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--secondary-text); display: block; margin-bottom: 6px;">SELECT CITY (MULTIPLIER)</label>
                <select id="pricing-city-select" class="pricing-calc-select">
                  <option value="1.15" data-name="Kochi">Kochi (1.15× multiplier)</option>
                  <option value="1.05" data-name="Kozhikode">Kozhikode (1.05× multiplier)</option>
                  <option value="1.05" data-name="Thrissur">Thrissur (1.05× multiplier)</option>
                  <option value="1.00" data-name="Thiruvananthapuram" selected>Thiruvananthapuram (1.00× multiplier)</option>
                  <option value="0.90" data-name="Palakkad">Palakkad (0.90× multiplier)</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--secondary-text); display: block; margin-bottom: 6px;">MEMBERSHIP PLAN</label>
                <select id="pricing-plan-select" class="pricing-calc-select">
                  <option value="999" data-name="Monthly" data-dur="1 month">Monthly — ₹999 (1 month)</option>
                  <option value="2700" data-name="Quarterly" data-dur="3 months">Quarterly — ₹2,700 (3 months)</option>
                  <option value="5100" data-name="Half-Yearly" data-dur="6 months">Half-Yearly — ₹5,100 (6 months)</option>
                  <option value="9600" data-name="Yearly" data-dur="12 months">Yearly — ₹9,600 (12 months)</option>
                </select>
              </div>
            </div>

            <div class="pricing-calc-output">
              <div>
                <div style="font-size: 0.75rem; color: var(--secondary-text); font-family: var(--font-mono);">CALCULATED TOTAL MEMBERSHIP FEE</div>
                <div id="pricing-formula-text" style="font-size: 0.8125rem; color: #E0E0E0; margin-top: 2px;">
                  Base Registration: ₹800 × 1.00 + Plan: ₹999
                </div>
              </div>
              <div class="pricing-total-val" id="pricing-total-display">₹1,799</div>
            </div>

            <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">
              * Note: Implemented dynamic pricing calculation logic. Online payment processing / gateways are not claimed.
            </div>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">MongoDB Atlas Database Models</h4>
          <div class="db-models-grid">
            ${project.databaseModels.map(m => `
              <div class="db-model-pill">
                <span class="db-model-name">${m.name}</span>
                <span class="db-model-desc">${m.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">Deployment Architecture</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
            ${project.deployment.map(d => `
              <div style="background: var(--bg-primary); border: 1px solid var(--border); border-radius: 8px; padding: 10px;">
                <div style="font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 700; color: #FFFFFF;">${d.service}</div>
                <div style="font-size: 0.6875rem; color: var(--secondary-text); margin-top: 2px;">${d.role}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="modal-actions-bar">
          <button class="btn btn-secondary" id="modal-inner-close">Close</button>
        </div>
      </div>
    `;

    setTimeout(initPricingCalculator, 50);

  } else {
    // Standard layout for other genuine projects
    modalContent.innerHTML = `
      <div class="modal-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="project-tag">${project.categoryLabel}</span>
          ${project.metrics ? `<span style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--primary-orange);">${project.metrics}</span>` : ''}
        </div>
        <h2 style="font-size: 1.625rem; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">${project.title}</h2>
        <p style="font-size: 0.9375rem; color: var(--secondary-text); line-height: 1.6;">${project.shortDesc}</p>
      </div>

      <div class="modal-body">
        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">Overview & Architecture</h4>
          <p style="font-size: 0.9375rem; color: var(--primary-text); line-height: 1.75;">${project.longDesc}</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">Key Implementations</h4>
          <ul class="modal-highlights-list">
            ${project.highlights.map(h => `<li class="modal-highlight-item">${h}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 class="modal-section-title">Technologies Used</h4>
          <div class="project-tags">
            ${project.tech.map(t => `<span class="tech-tag" style="font-size: 0.8125rem; padding: 6px 12px;">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-actions-bar">
          ${project.liveUrl ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>Visit Live Deployment</span>
              <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>
            </a>
          ` : ''}
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <span>View GitHub Repository</span>
              <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>
            </a>
          ` : ''}
          <button class="btn btn-secondary" id="modal-inner-close">Close</button>
        </div>
      </div>
    `;
  }

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  initLucideIcons();

  const innerClose = document.getElementById('modal-inner-close');
  if (innerClose) {
    innerClose.addEventListener('click', closeProjectModal);
  }
}

function closeProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initModalListeners(projectsList) {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-trigger');

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

function initPricingCalculator() {
  const citySelect = document.getElementById('pricing-city-select');
  const planSelect = document.getElementById('pricing-plan-select');
  const formulaText = document.getElementById('pricing-formula-text');
  const totalDisplay = document.getElementById('pricing-total-display');

  if (!citySelect || !planSelect || !formulaText || !totalDisplay) return;

  function calculate() {
    const baseFee = 800;
    const mult = parseFloat(citySelect.value) || 1.0;
    const planCost = parseInt(planSelect.value, 10) || 999;
    const cityName = citySelect.options[citySelect.selectedIndex].getAttribute('data-name');
    const planName = planSelect.options[planSelect.selectedIndex].getAttribute('data-name');

    const adjustedBase = Math.round(baseFee * mult);
    const total = adjustedBase + planCost;

    formulaText.textContent = `Base Fee (₹${baseFee} × ${mult.toFixed(2)} in ${cityName}: ₹${adjustedBase.toLocaleString('en-IN')}) + ${planName} Plan (₹${planCost.toLocaleString('en-IN')})`;
    totalDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  citySelect.addEventListener('change', calculate);
  planSelect.addEventListener('change', calculate);
  calculate();
}

/* ==========================================================================
   9. PROFESSIONAL EXPERIENCE SECTION
   ========================================================================== */
function renderExperiences(experiences) {
  const container = document.getElementById('experience-timeline');
  if (!container || !experiences) return;

  container.innerHTML = experiences.map(exp => `
    <div class="experience-card">
      <div class="experience-card-header">
        <div class="exp-company-group">
          <div class="exp-badge-icon">${exp.company.substring(0, 2).toUpperCase()}</div>
          <div>
            <h3 class="exp-company-name">${exp.company}</h3>
            <div class="exp-role-title">${exp.role}</div>
          </div>
        </div>
        <div class="exp-period-badge">
          <i data-lucide="calendar" style="width: 14px; height: 14px;"></i>
          ${exp.period}
        </div>
      </div>

      <ul class="exp-points-list">
        ${exp.details.map(pt => `<li class="exp-point-item">${pt}</li>`).join('')}
      </ul>

      <div class="exp-tech-tags">
        ${exp.skills.map(skill => `<span class="tech-tag">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   10. NAVIGATION & ACTIVE SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', mobileDrawer.classList.contains('open') ? 'true' : 'false');
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   11. CONTACT FORM VALIDATION & LAUNCHER
   ========================================================================== */
function initContactForm(personalInfo) {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('contact-form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    feedback.className = 'form-feedback';
    feedback.textContent = '';

    if (!name || !email || !subject || !message) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill out all required fields before sending.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    const mailtoUri = `mailto:${personalInfo.email || 'karthikmohanj@gmail.com'}?subject=${encodeURIComponent(subject + ' [Portfolio Inquiry from ' + name + ']')}&body=${encodeURIComponent('Hi Karthik,\n\n' + message + '\n\nBest regards,\n' + name + ' (' + email + ')')}`;

    feedback.className = 'form-feedback success';
    feedback.textContent = 'Launching your default email client to send your message directly to Karthik...';

    setTimeout(() => {
      window.location.href = mailtoUri;
      form.reset();
    }, 600);
  });
}

/* ==========================================================================
   12. COPY EMAIL HELPER
   ========================================================================== */
function initCopyEmail(personalInfo) {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn || !personalInfo.email) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      const origText = copyBtn.innerHTML;
      copyBtn.innerHTML = `<i data-lucide="check" style="width: 12px; height: 12px; color: #10B981;"></i> Copied!`;
      initLucideIcons();
      setTimeout(() => {
        copyBtn.innerHTML = origText;
        initLucideIcons();
      }, 2500);
    }).catch(() => {
      window.location.href = `mailto:${personalInfo.email}`;
    });
  });
}

/* ==========================================================================
   13. FOOTER YEAR & LUCIDE ICONS
   ========================================================================== */
function updateDynamicYear() {
  const yearEl = document.getElementById('dynamic-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}
