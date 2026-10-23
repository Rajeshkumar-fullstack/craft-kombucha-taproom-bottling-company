/**
 * Bramble & Oak Craft Kombucha Taproom & Bottling Co.
 * Main Application Orchestration
 * Handles Theme (Dark/Light), RTL/LTR, Accessible Navbar & Dropdowns, Mobile Menu, Scroll Effects, and Newsletter.
 */

(function () {
  'use strict';

  // 1. Theme Management
  const THEME_KEY = 'bramble_theme_preference';
  const LEGACY_THEME_KEY = 'zyma_theme_preference';
  const DIR_KEY = 'bramble_direction_preference';
  const LEGACY_DIR_KEY = 'zyma_direction_preference';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark theme for authentic cellar ambiance, or user preference
    const activeTheme = savedTheme || (prefersDark ? 'dark' : 'dark');
    applyTheme(activeTheme);
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    const themeIcons = document.querySelectorAll('.theme-toggle-icon');
    
    if (theme === 'dark') {
      html.classList.add('dark');
      themeIcons.forEach(icon => {
        icon.className = 'theme-toggle-icon fa-solid fa-sun text-[#F4A261]';
      });
    } else {
      html.classList.remove('dark');
      themeIcons.forEach(icon => {
        icon.className = 'theme-toggle-icon fa-solid fa-moon text-[#3A3028]';
      });
    }

    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);

    if (window.brambleCart && typeof window.brambleCart.showToast === 'function') {
      window.brambleCart.showToast(`Switched to ${newTheme === 'dark' ? 'Cellar Dark' : 'Sunlit Light'} mode`, 'info');
    } else if (window.zymaCart && typeof window.zymaCart.showToast === 'function') {
      window.zymaCart.showToast(`Switched to ${newTheme === 'dark' ? 'Cellar Dark' : 'Sunlit Light'} mode`, 'info');
    }
  }

  // 2. RTL / LTR Direction Management
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_KEY) || localStorage.getItem(LEGACY_DIR_KEY) || 'ltr';
    applyDirection(savedDir);
  }

  function applyDirection(dir) {
    const html = document.documentElement;
    html.setAttribute('dir', dir);
    
    const rtlBadges = document.querySelectorAll('.rtl-toggle-text');
    rtlBadges.forEach(badge => {
      badge.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });

    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => {
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right (LTR)' : 'Switch to Right-to-Left (RTL)');
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
    });

    localStorage.setItem(DIR_KEY, dir);
  }

  function toggleDirection() {
    const html = document.documentElement;
    const currentDir = html.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    applyDirection(newDir);

    const toastMsg = `Layout direction switched to ${newDir.toUpperCase()}`;
    if (window.brambleCart && typeof window.brambleCart.showToast === 'function') {
      window.brambleCart.showToast(toastMsg, 'info');
    } else if (window.zymaCart && typeof window.zymaCart.showToast === 'function') {
      window.zymaCart.showToast(toastMsg, 'info');
    }
  }

  // 3. Sticky Glass Navbar & Subnav Toolbar Synchronization on Scroll
  function initStickyNavbar() {
    const nav = document.getElementById('mainNavbar');
    if (!nav) return;

    const catalogBar = document.getElementById('catalogStickyBar');

    const syncNavbarHeight = () => {
      const rect = nav.getBoundingClientRect();
      const h = Math.round(rect.height || nav.offsetHeight || 64);
      document.documentElement.style.setProperty('--navbar-height', `${h}px`);
      return h;
    };

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        syncNavbarHeight();
      });
      ro.observe(nav);
    }

    let isScrolled = false;
    const handleScroll = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      
      // Top navbar scroll animation
      if (scrolled > 15) {
        if (!isScrolled) {
          nav.classList.add('py-2.5', 'shadow-md', 'bg-[#FDFBF7]/95', 'dark:bg-[#17211C]/95', 'backdrop-blur-md', 'border-b', 'border-[#3A3028]/10', 'dark:border-[#FFF8ED]/10');
          nav.classList.remove('py-4', 'bg-transparent', 'border-transparent');
          isScrolled = true;
        }
      } else {
        if (isScrolled) {
          nav.classList.remove('py-2.5', 'shadow-md', 'bg-[#FDFBF7]/95', 'dark:bg-[#17211C]/95', 'backdrop-blur-md', 'border-b', 'border-[#3A3028]/10', 'dark:border-[#FFF8ED]/10');
          nav.classList.add('py-4', 'bg-transparent', 'border-transparent');
          isScrolled = false;
        }
      }

      const currentNavH = syncNavbarHeight();

      // Check if catalog menu navbar is stuck to provide smooth elevation & backdrop
      if (catalogBar) {
        const barRect = catalogBar.getBoundingClientRect();
        // If sticky bar reached top navbar position
        if (barRect.top <= currentNavH + 2) {
          catalogBar.classList.add('is-stuck');
        } else {
          catalogBar.classList.remove('is-stuck');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      syncNavbarHeight();
      handleScroll();
    }, { passive: true });
    nav.addEventListener('transitionend', syncNavbarHeight);

    handleScroll();
    syncNavbarHeight();
    window.addEventListener('load', () => {
      syncNavbarHeight();
      handleScroll();
    });

    // Category filter tabs navigation (Arrow buttons, drag-to-scroll, non-blocking wheel)
    const filterContainer = document.getElementById('categoryFilterContainer');
    if (filterContainer) {
      const prevBtn = document.getElementById('categoryScrollPrev');
      const nextBtn = document.getElementById('categoryScrollNext');
      const wrapper = filterContainer.closest('.category-filter-wrapper') || filterContainer.parentElement;

      const updateScrollControls = () => {
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        const scrollLeft = Math.abs(filterContainer.scrollLeft);
        const maxScroll = Math.max(0, filterContainer.scrollWidth - filterContainer.clientWidth);
        const hasLeft = scrollLeft > 6;
        const hasRight = scrollLeft < (maxScroll - 6);

        if (wrapper) {
          wrapper.classList.toggle('has-scroll-left', isRtl ? hasRight : hasLeft);
          wrapper.classList.toggle('has-scroll-right', isRtl ? hasLeft : hasRight);
        }

        if (prevBtn) {
          const canScrollPrev = isRtl ? hasRight : hasLeft;
          prevBtn.classList.toggle('is-disabled', !canScrollPrev);
          prevBtn.disabled = !canScrollPrev;
        }
        if (nextBtn) {
          const canScrollNext = isRtl ? hasLeft : hasRight;
          nextBtn.classList.toggle('is-disabled', !canScrollNext);
          nextBtn.disabled = !canScrollNext;
        }
      };

      filterContainer.addEventListener('scroll', updateScrollControls, { passive: true });
      window.addEventListener('resize', updateScrollControls, { passive: true });
      setTimeout(updateScrollControls, 150);

      // Prev & Next navigation buttons
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
          const distance = Math.min(240, filterContainer.clientWidth * 0.75);
          filterContainer.scrollBy({ left: isRtl ? distance : -distance, behavior: 'smooth' });
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
          const distance = Math.min(240, filterContainer.clientWidth * 0.75);
          filterContainer.scrollBy({ left: isRtl ? -distance : distance, behavior: 'smooth' });
        });
      }

      // Smooth mouse drag-to-scroll for desktop
      let isDown = false;
      let startX = 0;
      let scrollLeftPos = 0;
      let hasDragged = false;

      filterContainer.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDown = true;
        hasDragged = false;
        startX = e.pageX - filterContainer.offsetLeft;
        scrollLeftPos = filterContainer.scrollLeft;
        filterContainer.classList.add('is-dragging');
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - filterContainer.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 4) {
          hasDragged = true;
          filterContainer.scrollLeft = scrollLeftPos - walk;
        }
      });

      window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        filterContainer.classList.remove('is-dragging');
      });

      filterContainer.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
          hasDragged = false;
        }
      }, true);

      // Non-blocking mouse-wheel handling (allows page vertical scroll to proceed normally!)
      filterContainer.addEventListener('wheel', (e) => {
        if (e.shiftKey) {
          if (filterContainer.scrollWidth > filterContainer.clientWidth) {
            e.preventDefault();
            filterContainer.scrollBy({ left: e.deltaY, behavior: 'auto' });
          }
        }
      }, { passive: false });
    }
  }

  // 4. Accessible Desktop Home Dropdown
  function initDesktopDropdown() {
    const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper, #homeDropdownWrapper');
    
    dropdownWrappers.forEach(wrapper => {
      const dropdownBtn = wrapper.querySelector('#homeDropdownBtn, [data-dropdown-toggle]');
      const dropdownMenu = wrapper.querySelector('#homeDropdownMenu, .nav-dropdown-menu');
      const chevronIcon = dropdownBtn ? dropdownBtn.querySelector('.fa-chevron-down') : null;

      if (!dropdownBtn || !dropdownMenu) return;

      let isOpen = false;
      let hoverTimer = null;

      function openDropdown() {
        isOpen = true;
        dropdownMenu.classList.add('show');
        wrapper.classList.add('is-open');
        dropdownBtn.setAttribute('aria-expanded', 'true');
        if (chevronIcon) chevronIcon.classList.add('rotate-180');
      }

      function closeDropdown() {
        isOpen = false;
        dropdownMenu.classList.remove('show');
        wrapper.classList.remove('is-open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
        if (chevronIcon) chevronIcon.classList.remove('rotate-180');
      }

      function toggleDropdown() {
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      }

      // Explicit click & touch handler on button
      dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown();
      });

      // Keyboard support: Enter / Space / ArrowDown
      dropdownBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          openDropdown();
          const firstLink = dropdownMenu.querySelector('a');
          if (firstLink) firstLink.focus();
        } else if (e.key === 'Escape') {
          closeDropdown();
        }
      });

      // Keyboard arrow navigation inside dropdown menu
      dropdownMenu.addEventListener('keydown', (e) => {
        const links = Array.from(dropdownMenu.querySelectorAll('a'));
        const currentIndex = links.indexOf(document.activeElement);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % links.length;
          links[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + links.length) % links.length;
          links[prevIndex].focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeDropdown();
          dropdownBtn.focus();
        }
      });

      // Desktop hover support (screens >= 1024px)
      wrapper.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) {
          clearTimeout(hoverTimer);
          openDropdown();
        }
      });

      wrapper.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 1024) {
          clearTimeout(hoverTimer);
          hoverTimer = setTimeout(() => {
            closeDropdown();
          }, 180);
        }
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          closeDropdown();
        }
      });

      // Close on global Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDropdown();
        }
      });

      // Close on clicking any link inside
      dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeDropdown();
        });
      });

      // Initial state: ensure closed
      closeDropdown();
    });
  }

  // 5. Accessible Mobile Navigation & Expandable Home Dropdown
  function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenuDropdown');
    const mobileHomeToggle = document.getElementById('mobileHomeSubToggle');
    const mobileHomeSubMenu = document.getElementById('mobileHomeSubMenu');
    const mobileHomeChevron = mobileHomeToggle ? mobileHomeToggle.querySelector('.fa-chevron-down') : null;
    const hamburgerIcon = mobileBtn ? mobileBtn.querySelector('i') : null;

    if (!mobileBtn || !mobileMenu) return;

    function openMobileMenu() {
      mobileMenu.classList.remove('hidden');
      mobileBtn.setAttribute('aria-expanded', 'true');
      if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-xmark');
      }
    }

    function closeMobileMenu() {
      mobileMenu.classList.add('hidden');
      mobileBtn.setAttribute('aria-expanded', 'false');
      if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-xmark');
        hamburgerIcon.classList.add('fa-bars');
      }
    }

    function toggleMobileMenu() {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Expandable Home sub-menu on mobile
    if (mobileHomeToggle && mobileHomeSubMenu) {
      mobileHomeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = mobileHomeSubMenu.classList.contains('hidden');
        if (isHidden) {
          mobileHomeSubMenu.classList.remove('hidden');
          mobileHomeToggle.setAttribute('aria-expanded', 'true');
          if (mobileHomeChevron) mobileHomeChevron.classList.add('rotate-180');
        } else {
          mobileHomeSubMenu.classList.add('hidden');
          mobileHomeToggle.setAttribute('aria-expanded', 'false');
          if (mobileHomeChevron) mobileHomeChevron.classList.remove('rotate-180');
        }
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close mobile menu when a navigation link is clicked
    const allMobileLinks = mobileMenu.querySelectorAll('a');
    allMobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }

  // 6. Active Link Highlighting
  function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop main links
    const navLinks = document.querySelectorAll('.nav-link-item');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('text-warm-orange', 'font-semibold', 'active');
      }
    });

    // Home dropdown items
    const homeBtn = document.getElementById('homeDropdownBtn');
    const dropdownLinks = document.querySelectorAll('#homeDropdownMenu a, #mobileHomeSubMenu a');
    dropdownLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('text-warm-orange', 'font-bold', 'bg-[#F4A261]/10');
        if (homeBtn) {
          homeBtn.classList.add('text-warm-orange', 'font-semibold', 'active');
        }
      }
    });
  }

  // 7. Footer Dynamic Year
  function initYear() {
    const yearEls = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearEls.forEach(el => el.textContent = currentYear);
  }

  // 8. Newsletter Subscription Form
  function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    const isEmailValid = (v) => !/[A-Z]/.test(v) && /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);

    forms.forEach(form => {
      const input = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (input) {
        input.addEventListener('input', () => {
          const val = input.value.trim();
          if (val && isEmailValid(val)) {
            input.classList.remove('form-input-error');
            input.classList.add('form-input-valid');
          } else if (val && /[A-Z]/.test(val)) {
            input.classList.add('form-input-error');
            input.classList.remove('form-input-valid');
          } else {
            input.classList.remove('form-input-valid');
          }
        });

        input.addEventListener('blur', () => {
          const val = input.value.trim();
          if (val && !isEmailValid(val)) {
            input.classList.add('form-input-error');
            input.classList.remove('form-input-valid');
          }
        });
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = input ? input.value.trim() : '';

        if (!email || !isEmailValid(email)) {
          if (input) {
            input.classList.remove('form-input-valid');
            input.classList.add('form-input-error');
            input.focus();
          }
          let warn = 'Please enter a valid email address (e.g. name@example.com).';
          if (/[A-Z]/.test(email)) {
            warn = 'Email address must contain only lowercase letters (no uppercase letters allowed, e.g. name@example.com).';
          }
          if (window.brambleCart && typeof window.brambleCart.showToast === 'function') {
            window.brambleCart.showToast(warn, 'warning');
          } else if (window.zymaCart && typeof window.zymaCart.showToast === 'function') {
            window.zymaCart.showToast(warn, 'warning');
          } else {
            alert(warn);
          }
          return;
        }

        // Valid submission loading state
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Join';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          }
          if (input) {
            input.value = '';
            input.classList.remove('form-input-error', 'form-input-valid');
          }

          const msg = 'Subscribed! Welcome to the Bramble & Oak Fermentation Circle. Check your inbox for 15% off!';
          if (window.brambleCart && typeof window.brambleCart.showToast === 'function') {
            window.brambleCart.showToast(msg, 'success');
          } else if (window.zymaCart && typeof window.zymaCart.showToast === 'function') {
            window.zymaCart.showToast(msg, 'success');
          } else {
            alert(msg);
          }
        }, 500);
      });
    });
  }

  // 9. Intersection Observer Scroll Reveals & Staggered Animations
  function initScrollReveals() {
    // Enable progressive enhancement class
    document.documentElement.classList.add('js-ready');

    const revealSelector = '.fade-up-init, .fade-up-scroll, .zoom-in-scroll, .fade-in-scroll, .img-reveal-card, [data-reveal]';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(revealSelector).forEach(el => {
        el.classList.add('in-view', 'revealed');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      document.querySelectorAll(revealSelector).forEach(el => {
        el.classList.add('in-view', 'revealed');
      });
      return;
    }

    // Auto-stagger grid children if within common card grids
    document.querySelectorAll('.grid, [data-stagger-container]').forEach(grid => {
      const children = Array.from(grid.children).filter(child => 
        child.matches(revealSelector) || child.querySelector(revealSelector)
      );
      children.forEach((child, idx) => {
        const staggerClass = `stagger-delay-${(idx % 4) + 1}`;
        if (child.matches(revealSelector)) {
          child.classList.add(staggerClass);
        } else {
          const target = child.querySelector(revealSelector);
          if (target) target.classList.add(staggerClass);
        }
      });
    });

    const revealElements = document.querySelectorAll(revealSelector);
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.12, 
      rootMargin: '0px 0px -40px 0px' 
    });

    revealElements.forEach(el => observer.observe(el));

    // Global Safety Fallback: after 3 seconds, reveal any remaining elements
    // so nothing is ever stuck hidden if observer fails or doesn't trigger
    setTimeout(() => {
      document.querySelectorAll(revealSelector + ':not(.in-view)').forEach(el => {
        el.classList.add('in-view', 'revealed');
      });
    }, 3000);
  }

  // 10. Subtle Parallax Effect for Hero Images & Banners
  function initSubtleParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;

    const parallaxElements = document.querySelectorAll('.hero-parallax-img, .hero-parallax-bg, .hero-bg-img');
    if (!parallaxElements.length) return;

    let ticking = false;
    const handleParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          // Only calculate if within first 1200px of page
          if (scrolled < 1400) {
            parallaxElements.forEach(el => {
              const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.12;
              const yPos = -(scrolled * speed);
              el.style.transform = `translate3d(0, ${yPos.toFixed(1)}px, 0)`;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        parallaxElements.forEach(el => el.style.transform = 'none');
      }
    }, { passive: true });
  }

  // 11. Image Fallback & Smooth Image Loading Transitions
  function initImageFallbacks() {
    const fallbackSrc = 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=1200';
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Exclude eager hero background images from lazy-fade so they are always 100% visible immediately
    document.querySelectorAll('.hero-bg-img').forEach(heroImg => {
      heroImg.classList.remove('img-lazy-fade');
      heroImg.classList.add('img-loaded');
      heroImg.style.opacity = '1';
    });

    document.querySelectorAll('img:not(.hero-bg-img)').forEach(img => {
      // Smooth fade-in transition on lazy-loaded images
      if (!isReducedMotion) {
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add('img-loaded');
        } else {
          img.classList.add('img-lazy-fade');
          img.addEventListener('load', () => {
            img.classList.add('img-loaded');
          }, { once: true });
        }
      }

        // Fallback for broken image URLs
        img.addEventListener('error', function() {
          const modernFallback = 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=1200';
          if (this.src !== modernFallback) {
            this.src = modernFallback;
            this.classList.add('img-loaded');
          }
        }, { once: true });
      });
    }

    // 11. Hero Image Showcase & Interactive Flavor Switcher
    function initHeroImageShowcase() {
      const heroImg = document.getElementById('heroFeatureImg');
      const heroCaption = document.getElementById('heroImageCaption');
      const thumbBtns = document.querySelectorAll('.hero-thumb-btn');

      if (!heroImg || !thumbBtns.length) return;

      thumbBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const newSrc = btn.getAttribute('data-hero-img');
          const newCaption = btn.getAttribute('data-hero-caption');
          const newAlt = btn.getAttribute('data-hero-alt');

          if (!newSrc) return;

          // Update active state on buttons
          thumbBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Smooth cross-fade transition
          heroImg.style.opacity = '0.15';
          heroImg.style.transform = 'scale(0.97)';

          const temp = new Image();
          temp.onload = () => {
            heroImg.src = newSrc;
            if (newAlt) heroImg.alt = newAlt;
            if (heroCaption && newCaption) heroCaption.textContent = newCaption;

            heroImg.style.opacity = '1';
            heroImg.style.transform = 'scale(1)';
          };
          temp.onerror = () => {
            heroImg.style.opacity = '1';
            heroImg.style.transform = 'scale(1)';
          };
          temp.src = newSrc;
        });
      });
    }

    // 12. Enforce strict lowercase on all email fields: uppercase letters are NOT accepted
    function enforceLowercaseEmailInputs() {
      document.querySelectorAll('input[type="email"]').forEach(input => {
        input.setAttribute('autocapitalize', 'none');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('pattern', '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$');

        input.addEventListener('input', () => {
          if (/[A-Z]/.test(input.value)) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            input.value = input.value.toLowerCase();
            if (start !== null && end !== null) {
              input.setSelectionRange(start, end);
            }
          }
        });
      });
    }

    // Global Initializer
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      initDirection();
      initStickyNavbar();
      initDesktopDropdown();
      initMobileMenu();
      highlightActiveNavLink();
      initYear();
      initNewsletter();
      initScrollReveals();
      initSubtleParallax();
      initImageFallbacks();
      initHeroImageShowcase();
      enforceLowercaseEmailInputs();

    // Bind theme buttons
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => btn.addEventListener('click', toggleTheme));

    // Bind RTL buttons
    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => btn.addEventListener('click', toggleDirection));

    // Initialize AOS if loaded
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        once: true,
        offset: 40,
        easing: 'ease-out-cubic'
      });
    }
  });

  // Global app helpers
  window.brambleApp = {
    toggleTheme,
    toggleDirection,
    initScrollReveals
  };
  window.zymaApp = window.brambleApp; // Backward compatibility
})();
