/**
 * PREMIUM ENHANCED WEBSITE - $100K BUDGET
 * Advanced JavaScript functionality with enterprise-grade features
 * 
 * Features:
 * - Advanced particle system
 * - Premium animations and interactions
 * - Sophisticated search functionality
 * - Enterprise accessibility features
 * - Advanced mobile optimizations
 * - Performance monitoring
 */

class PremiumWebsiteEngine {
  constructor() {
    this.isLoaded = false;
    this.scrollPosition = 0;
    this.isScrolling = false;
    this.searchIndex = [];
    this.modalData = {};
    this.particleSystem = null;
    this.performanceMetrics = {
      loadTime: 0,
      interactionCount: 0,
      scrollEvents: 0
    };
    
    this.init();
  }

  async init() {
    try {
      // Initialize core systems
      await this.initializeLoader();
      this.initializeParticleSystem();
      this.initializeCustomCursor();
      this.initializeScrollEffects();
      this.initializeNavigation();
      this.initializeSearch();
      this.initializeModals();
      this.initializeInteractions();
      this.initializeAccessibility();
      this.initializePerformanceMonitoring();
      
      // Mark as loaded
      this.isLoaded = true;
      this.logPerformance('Website fully initialized');
      
    } catch (error) {
      console.error('Failed to initialize website:', error);
    }
  }

  // ==========================================
  // PREMIUM LOADING EXPERIENCE
  // ==========================================
  
  async initializeLoader() {
    const loader = document.getElementById('premiumLoader');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!loader) return;

    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
          this.startTypewriterEffect();
          this.startCounterAnimations();
        }, 500);
      }
    }, 100);

    // Record load time
    this.performanceMetrics.loadTime = performance.now();
  }

  startTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriterText');
    const cursorElement = document.querySelector('.typewriter-cursor');
    
    if (!typewriterElement) return;

    const text = "And We have sent down to you the Book as a clarification for all things, and as a guidance and mercy and good tidings for those who have submitted.";
    let index = 0;

    const typeWriter = () => {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 30 + Math.random() * 20); // Variable speed for natural feel
      } else {
        if (cursorElement) {
          setTimeout(() => {
            cursorElement.style.display = 'none';
          }, 2000);
        }
      }
    };

    setTimeout(typeWriter, 1000);
  }

  startCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(counter);
    });
  }

  // ==========================================
  // ADVANCED PARTICLE SYSTEM
  // ==========================================
  
  initializeParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `rgba(212, 175, 55, ${this.opacity})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Pulse opacity
        this.opacity += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.01;
        this.opacity = Math.max(0.1, Math.min(0.7, this.opacity));
        this.color = `rgba(212, 175, 55, ${this.opacity})`;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
    this.particleSystem = { canvas, ctx, particles };
  }

  // ==========================================
  // PREMIUM CUSTOM CURSOR
  // ==========================================
  
  initializeCustomCursor() {
    if (window.innerWidth <= 1024) return; // Skip on mobile

    const cursor = document.getElementById('premiumCursor');
    const cursorDot = cursor?.querySelector('.cursor-dot');
    const cursorRing = cursor?.querySelector('.cursor-ring');
    
    if (!cursor || !cursorDot || !cursorRing) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor animation
    const animateCursor = () => {
      // Dot follows immediately
      cursorX = mouseX;
      cursorY = mouseY;
      
      // Ring follows with delay
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .premium-card, .faq-question, input, .nav-link');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // ==========================================
  // ADVANCED SCROLL EFFECTS
  // ==========================================
  
  initializeScrollEffects() {
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    const readingProgress = document.getElementById('readingProgress');
    const backToTop = document.getElementById('backToTop');
    const shareBtn = document.getElementById('shareBtn');
    
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollEffects = () => {
      const scrollY = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / documentHeight) * 100;

      // Header visibility
      if (header) {
        if (scrollY > lastScrollY && scrollY > 200) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
        
        header.classList.toggle('scrolled', scrollY > 50);
      }

      // Progress bars
      if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
      }

      // Reading progress (based on main content)
      const mainContent = document.getElementById('mainContent');
      if (readingProgress && mainContent) {
        const mainRect = mainContent.getBoundingClientRect();
        const mainProgress = Math.max(0, Math.min(100, 
          ((window.innerHeight - mainRect.top) / (mainRect.height + window.innerHeight)) * 100
        ));
        readingProgress.style.transform = `scaleX(${mainProgress / 100})`;
      }

      // Floating buttons
      const showFloating = scrollY > 600;
      if (backToTop) backToTop.classList.toggle('visible', showFloating);
      if (shareBtn) shareBtn.classList.toggle('visible', showFloating);

      // Parallax effects
      this.updateParallaxElements(scrollY);

      // Update metrics
      this.performanceMetrics.scrollEvents++;
      lastScrollY = scrollY;
      ticking = false;
    };

    // Throttled scroll handler
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top functionality
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        this.trackInteraction('back_to_top');
      });
    }

    // Share functionality
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.handleShare();
        this.trackInteraction('share');
      });
    }

    // Intersection Observer for animations
    this.initializeScrollAnimations();
  }

  updateParallaxElements(scrollY) {
    const parallaxElements = document.querySelectorAll('.geometric-patterns, .floating-elements');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.1 + (index * 0.05);
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.premium-card, .contradiction-card, .premium-faq-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  // ==========================================
  // PREMIUM NAVIGATION
  // ==========================================
  
  initializeNavigation() {
    // Mobile menu
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('show');
        mobileToggle.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        this.trackInteraction('mobile_menu_toggle');
      });
    }

    if (mobileMenuClose && mobileMenu) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        mobileToggle?.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (mobileMenu?.classList.contains('show') && 
          !mobileMenu.contains(e.target) && 
          !mobileToggle?.contains(e.target)) {
        mobileMenu.classList.remove('show');
        mobileToggle?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          if (mobileMenu?.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            mobileToggle?.classList.remove('active');
            document.body.style.overflow = '';
          }

          // Update active state
          this.updateActiveNavLink(targetId);
          this.trackInteraction('navigation', { target: targetId });
        }
      });
    });

    // Active section detection
    this.initializeActiveNavDetection();

    // Theme toggle
    this.initializeThemeToggle();
  }

  updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === targetId);
    });
  }

  initializeActiveNavDetection() {
    const sections = document.querySelectorAll('.premium-section, .premium-hero');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = `#${entry.target.id}`;
          this.updateActiveNavLink(sectionId);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px'
    });

    sections.forEach(section => {
      if (section.id) observer.observe(section);
    });
  }

  initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      this.trackInteraction('theme_toggle', { theme: newTheme });
    };

    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', toggleTheme);
    }
  }

  // ==========================================
  // ADVANCED SEARCH FUNCTIONALITY
  // ==========================================
  
  initializeSearch() {
    const searchInput = document.getElementById('premiumSearch');
    const searchBtn = document.getElementById('searchBtn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const faqSearch = document.getElementById('faqSearch');
    
    // Build search index
    this.buildSearchIndex();

    // Main search functionality
    if (searchInput) {
      let searchTimeout;
      
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.performSearch(e.target.value, searchSuggestions);
        }, 300);
      });

      searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
          this.performSearch(searchInput.value, searchSuggestions);
        }
      });

      // Hide suggestions on outside click
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions?.contains(e.target)) {
          searchSuggestions?.classList.remove('show');
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (searchInput?.value.trim()) {
          this.performSearch(searchInput.value, searchSuggestions, true);
          this.trackInteraction('search', { query: searchInput.value });
        }
      });
    }

    // FAQ search
    if (faqSearch) {
      let faqTimeout;
      
      faqSearch.addEventListener('input', (e) => {
        clearTimeout(faqTimeout);
        faqTimeout = setTimeout(() => {
          this.filterFAQs(e.target.value);
        }, 200);
      });
    }

    // FAQ categories
    const faqCategories = document.querySelectorAll('.faq-category-btn');
    faqCategories.forEach(btn => {
      btn.addEventListener('click', () => {
        faqCategories.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterFAQsByCategory(btn.dataset.category);
        this.trackInteraction('faq_category', { category: btn.dataset.category });
      });
    });
  }

  buildSearchIndex() {
    const searchableElements = document.querySelectorAll(
      '.card-title, .card-description, .section-title, .section-description, .faq-question h3, .answer-content p'
    );

    this.searchIndex = Array.from(searchableElements).map(element => ({
      text: element.textContent.toLowerCase(),
      element: element,
      section: this.findParentSection(element),
      type: this.getElementType(element)
    }));
  }

  findParentSection(element) {
    const section = element.closest('.premium-section, .premium-hero');
    return section?.id || 'unknown';
  }

  getElementType(element) {
    if (element.classList.contains('card-title')) return 'card';
    if (element.classList.contains('section-title')) return 'section';
    if (element.closest('.premium-faq-item')) return 'faq';
    return 'content';
  }

  performSearch(query, suggestionsContainer, isExplicitSearch = false) {
    if (!query.trim()) {
      suggestionsContainer?.classList.remove('show');
      return;
    }

    const results = this.searchIndex.filter(item => 
      item.text.includes(query.toLowerCase())
    ).slice(0, 8);

    if (suggestionsContainer) {
      this.displaySearchSuggestions(results, suggestionsContainer, query);
    }

    if (isExplicitSearch && results.length > 0) {
      this.highlightSearchResults(results, query);
    }
  }

  displaySearchSuggestions(results, container, query) {
    if (results.length === 0) {
      container.innerHTML = '<div class="search-suggestion">No results found</div>';
    } else {
      container.innerHTML = results.map(result => `
        <div class="search-suggestion" data-section="${result.section}" data-type="${result.type}">
          <div class="suggestion-type">${result.type}</div>
          <div class="suggestion-text">${this.highlightQuery(result.text, query)}</div>
        </div>
      `).join('');

      // Add click handlers
      container.querySelectorAll('.search-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', () => {
          this.navigateToSearchResult(suggestion.dataset.section, suggestion.dataset.type);
          container.classList.remove('show');
        });
      });
    }

    container.classList.add('show');
  }

  highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  navigateToSearchResult(sectionId, type) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  highlightSearchResults(results, query) {
    // Remove previous highlights
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });

    // Add new highlights
    results.forEach(result => {
      result.element.classList.add('search-highlight');
    });

    // Remove highlights after 5 seconds
    setTimeout(() => {
      document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
      });
    }, 5000);
  }

  filterFAQs(query) {
    const faqItems = document.querySelectorAll('.premium-faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('h3')?.textContent.toLowerCase() || '';
      const answer = item.querySelector('.answer-content')?.textContent.toLowerCase() || '';
      const matches = question.includes(query.toLowerCase()) || answer.includes(query.toLowerCase());
      
      item.style.display = matches || !query.trim() ? 'block' : 'none';
    });
  }

  filterFAQsByCategory(category) {
    const faqItems = document.querySelectorAll('.premium-faq-item');
    
    faqItems.forEach(item => {
      const itemCategory = item.dataset.category;
      const matches = category === 'all' || itemCategory === category;
      
      item.style.display = matches ? 'block' : 'none';
    });
  }

  // ==========================================
  // PREMIUM MODAL SYSTEM
  // ==========================================
  
  initializeModals() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    // Modal data
    this.modalData = {
      'fully-detailed': {
        title: 'The Qur\'an is Fully Detailed',
        content: `
          <div class="modal-section">
            <h3>Divine Completeness</h3>
            <p>The Qur'an explicitly states that it is a complete and detailed book, requiring no external sources for religious guidance.</p>
            
            <blockquote class="modal-quote">
              "A Book whose verses have been perfected and then detailed from [one who is] Wise and Acquainted."
              <cite>— Qur'an 11:1</cite>
            </blockquote>

            <h4>Key Evidence:</h4>
            <ul class="modal-list">
              <li><strong>Complete Guidance:</strong> "We have not neglected in the Book a thing" (6:38)</li>
              <li><strong>Detailed Explanation:</strong> "We have explained everything in detail" (17:12)</li>
              <li><strong>Perfect Completion:</strong> "Today I have perfected your religion for you" (5:3)</li>
            </ul>

            <div class="modal-highlight">
              <h4>Logical Conclusion</h4>
              <p>If Allah claims the Qur'an is complete and detailed, then seeking religious law from other sources implies that Allah's claim is false - which is impossible.</p>
            </div>
          </div>
        `
      },
      'divinely-preserved': {
        title: 'Divine Preservation Guarantee',
        content: `
          <div class="modal-section">
            <h3>Allah's Promise of Protection</h3>
            <p>Unlike any other religious text, the Qur'an comes with a divine guarantee of preservation.</p>
            
            <blockquote class="modal-quote">
              "Indeed, it is We who sent down the Reminder and indeed, We will be its guardian."
              <cite>— Qur'an 15:9</cite>
            </blockquote>

            <h4>Preservation vs. Other Sources:</h4>
            <div class="comparison-table">
              <div class="comparison-row">
                <div class="comparison-label">Qur'an</div>
                <div class="comparison-value success">Divinely Protected</div>
              </div>
              <div class="comparison-row">
                <div class="comparison-label">Hadith</div>
                <div class="comparison-value error">Human Transmission</div>
              </div>
              <div class="comparison-row">
                <div class="comparison-label">Scholarly Opinions</div>
                <div class="comparison-value error">Human Interpretation</div>
              </div>
            </div>

            <div class="modal-highlight">
              <h4>Historical Reality</h4>
              <p>The Qur'an has remained unchanged for over 1400 years, while hadith collections were compiled 200+ years after the Prophet's death and contain numerous contradictions.</p>
            </div>
          </div>
        `
      },
      'only-authority': {
        title: 'The Qur\'an as Sole Authority',
        content: `
          <div class="modal-section">
            <h3>Divine Judgment and Authority</h3>
            <p>The Qur'an establishes itself as the only source of religious authority, rejecting all other sources.</p>
            
            <blockquote class="modal-quote">
              "Shall I seek other than Allah as a judge, when He has sent down to you the Book explained in detail?"
              <cite>— Qur'an 6:114</cite>
            </blockquote>

            <h4>Clear Rejection of Other Sources:</h4>
            <ul class="modal-list">
              <li><strong>No Other Judge:</strong> "And whoever does not judge by what Allah has revealed - then it is those who are the disbelievers" (5:44)</li>
              <li><strong>Complete Authority:</strong> "And We have revealed to you the Book in truth, confirming that which preceded it of the Scripture and as a criterion over it" (5:48)</li>
              <li><strong>Final Word:</strong> "And if you differ in anything among yourselves, refer it to Allah and His Messenger" (4:59) - referring to the Qur'an</li>
            </ul>

            <div class="modal-warning">
              <h4>Warning Against Other Sources</h4>
              <p>The Qur'an warns against following any religious source other than itself, calling such practice "shirk" (associating partners with Allah).</p>
            </div>
          </div>
        `
      },
      'adultery-punishment': {
        title: 'Adultery Punishment: Qur\'an vs Hadith',
        content: `
          <div class="modal-section">
            <h3>Clear Contradiction in Punishment</h3>
            <p>One of the most stark contradictions between the Qur'an and hadith literature concerns the punishment for adultery.</p>
            
            <div class="contradiction-display">
              <div class="source-comparison">
                <div class="source-item quran-source">
                  <h4>Qur'an (Divine Source)</h4>
                  <blockquote>
                    "The woman and the man guilty of adultery or fornication - flog each of them with a hundred stripes."
                    <cite>— Qur'an 24:2</cite>
                  </blockquote>
                  <div class="source-details">
                    <strong>Punishment:</strong> 100 lashes<br>
                    <strong>Authority:</strong> Direct divine command<br>
                    <strong>Certainty:</strong> Absolute (preserved by Allah)
                  </div>
                </div>
                
                <div class="source-item hadith-source">
                  <h4>Hadith (Human Source)</h4>
                  <blockquote>
                    "When an unmarried male commits adultery with an unmarried female, they should receive one hundred lashes and banishment for one year. And in case of married male committing adultery with a married female, they shall receive one hundred lashes and be stoned to death."
                    <cite>— Sahih Muslim</cite>
                  </blockquote>
                  <div class="source-details">
                    <strong>Punishment:</strong> Stoning to death<br>
                    <strong>Authority:</strong> Human narration<br>
                    <strong>Certainty:</strong> Questionable (human transmission)
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-highlight">
              <h4>The Logical Problem</h4>
              <p>If we accept both sources as valid, we have Allah commanding one punishment while the Prophet allegedly commanded a different, more severe punishment. This is impossible, as the Prophet only followed what was revealed to him.</p>
            </div>

            <div class="modal-conclusion">
              <h4>The Only Logical Conclusion</h4>
              <p>Since the Qur'an is divinely preserved and the hadith are human transmissions compiled centuries later, the Qur'anic punishment of 100 lashes is the only authentic divine law.</p>
            </div>
          </div>
        `
      },
      'apostasy-penalty': {
        title: 'Apostasy: Freedom vs Compulsion',
        content: `
          <div class="modal-section">
            <h3>Religious Freedom in Islam</h3>
            <p>The question of apostasy reveals a fundamental contradiction between Qur'anic principles and hadith-based jurisprudence.</p>
            
            <div class="contradiction-display">
              <div class="source-comparison">
                <div class="source-item quran-source">
                  <h4>Qur'an: No Compulsion</h4>
                  <blockquote>
                    "There shall be no compulsion in religion. The right course has become clear from the wrong."
                    <cite>— Qur'an 2:256</cite>
                  </blockquote>
                  <blockquote>
                    "And say, 'The truth is from your Lord, so whoever wills - let him believe; and whoever wills - let him disbelieve.'"
                    <cite>— Qur'an 18:29</cite>
                  </blockquote>
                </div>
                
                <div class="source-item hadith-source">
                  <h4>Hadith: Death for Apostasy</h4>
                  <blockquote>
                    "Whoever changed his Islamic religion, then kill him."
                    <cite>— Sahih Bukhari</cite>
                  </blockquote>
                </div>
              </div>
            </div>

            <h4>Qur'anic Approach to Apostasy:</h4>
            <ul class="modal-list">
              <li><strong>Freedom of Choice:</strong> Multiple verses affirm the right to believe or disbelieve</li>
              <li><strong>No Worldly Punishment:</strong> Consequences are mentioned only in the afterlife</li>
              <li><strong>Continued Dialogue:</strong> The Qur'an encourages reasoning with those who leave faith</li>
            </ul>

            <div class="modal-warning">
              <h4>The Contradiction's Impact</h4>
              <p>The hadith-based death penalty for apostasy has been used to justify religious persecution and has damaged Islam's reputation as a religion of peace and tolerance.</p>
            </div>
          </div>
        `
      },
      'prophet-magic': {
        title: 'The Prophet and Magic: Qur\'an vs Hadith',
        content: `
          <div class="modal-section">
            <h3>Attack on the Prophet's Character</h3>
            <p>One of the most serious contradictions involves the claim that Prophet Muhammad was affected by magic.</p>
            
            <div class="contradiction-display">
              <div class="source-comparison">
                <div class="source-item quran-source">
                  <h4>Qur'an Defends the Prophet</h4>
                  <blockquote>
                    "And the wrongdoers say, 'You follow not but a man affected by magic.'"
                    <cite>— Qur'an 17:47</cite>
                  </blockquote>
                  <p>The Qur'an presents this as a <strong>false accusation</strong> by the Prophet's enemies.</p>
                </div>
                
                <div class="source-item hadith-source">
                  <h4>Hadith Claims Magic Worked</h4>
                  <blockquote>
                    "Magic was worked on Allah's Messenger so that he used to think that he had done something which he had not done."
                    <cite>— Sahih Bukhari</cite>
                  </blockquote>
                  <p>This hadith <strong>confirms</strong> what the Qur'an calls a false accusation.</p>
                </div>
              </div>
            </div>

            <h4>The Serious Implications:</h4>
            <ul class="modal-list">
              <li><strong>Prophetic Reliability:</strong> If the Prophet could be magically influenced, how can we trust any of his teachings?</li>
              <li><strong>Divine Protection:</strong> Why would Allah allow His messenger to be affected by magic?</li>
              <li><strong>Qur'anic Integrity:</strong> Could the Qur'an itself have been revealed while under magical influence?</li>
            </ul>

            <div class="modal-highlight">
              <h4>Character Assassination</h4>
              <p>This hadith essentially validates the accusations of the Prophet's enemies and undermines his credibility as a divine messenger. The Qur'an, however, presents him as having "an exalted standard of character" (68:4).</p>
            </div>
          </div>
        `
      }
    };

    // Modal triggers
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalKey = trigger.dataset.modal;
        this.openModal(modalKey, modalOverlay, modalTitle, modalContent);
        this.trackInteraction('modal_open', { modal: modalKey });
      });
    });

    // Close modal
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        this.closeModal(modalOverlay);
      });
    }

    // Close on overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          this.closeModal(modalOverlay);
        }
      });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay?.classList.contains('show')) {
        this.closeModal(modalOverlay);
      }
    });
  }

  openModal(key, overlay, title, content) {
    const data = this.modalData[key];
    if (!data || !overlay || !title || !content) return;

    title.textContent = data.title;
    content.innerHTML = data.content;
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    const firstFocusable = content.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
  }

  closeModal(overlay) {
    if (!overlay) return;
    
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    this.trackInteraction('modal_close');
  }

  // ==========================================
  // INTERACTIVE FEATURES
  // ==========================================
  
  initializeInteractions() {
    // FAQ interactions
    this.initializeFAQ();
    
    // Filter system
    this.initializeFilters();
    
    // Card interactions
    this.initializeCardEffects();
    
    // Form handling
    this.initializeForms();
  }

  initializeFAQ() {
    const faqItems = document.querySelectorAll('.premium-faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const toggle = item.querySelector('.faq-toggle');
      
      if (question) {
        question.addEventListener('click', () => {
          const isOpen = item.classList.toggle('open');
          
          // Close other FAQ items (accordion behavior)
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('open');
            }
          });
          
          this.trackInteraction('faq_toggle', { 
            question: question.querySelector('h3')?.textContent,
            opened: isOpen 
          });
        });
      }
    });
  }

  initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const sortBtn = document.getElementById('sortBtn');
    const sortOptions = document.getElementById('sortOptions');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Filter tabs
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const filter = tab.dataset.filter;
        this.applyFilter(filter);
        this.trackInteraction('filter', { filter });
      });
    });

    // Sort dropdown
    if (sortBtn && sortOptions) {
      sortBtn.addEventListener('click', () => {
        sortOptions.classList.toggle('show');
      });

      document.addEventListener('click', (e) => {
        if (!sortBtn.contains(e.target) && !sortOptions.contains(e.target)) {
          sortOptions.classList.remove('show');
        }
      });

      const sortOptionBtns = sortOptions.querySelectorAll('.sort-option');
      sortOptionBtns.forEach(option => {
        option.addEventListener('click', () => {
          sortOptionBtns.forEach(o => o.classList.remove('active'));
          option.classList.add('active');
          
          const sortType = option.dataset.sort;
          sortBtn.querySelector('span').textContent = `Sort by ${option.textContent}`;
          sortOptions.classList.remove('show');
          
          this.applySorting(sortType);
          this.trackInteraction('sort', { type: sortType });
        });
      });
    }

    // View toggle
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const view = btn.dataset.view;
        this.applyViewMode(view);
        this.trackInteraction('view_mode', { mode: view });
      });
    });
  }

  applyFilter(filter) {
    const cards = document.querySelectorAll('.contradiction-card');
    
    cards.forEach(card => {
      const category = card.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        card.classList.remove('hidden');
        card.style.display = 'block';
      } else {
        card.classList.add('hidden');
        setTimeout(() => {
          if (card.classList.contains('hidden')) {
            card.style.display = 'none';
          }
        }, 300);
      }
    });

    // Update counts
    this.updateFilterCounts();
  }

  updateFilterCounts() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
      const filter = tab.dataset.filter;
      const count = filter === 'all' 
        ? document.querySelectorAll('.contradiction-card').length
        : document.querySelectorAll(`.contradiction-card[data-category="${filter}"]`).length;
      
      const countElement = tab.querySelector('.tab-count');
      if (countElement) {
        countElement.textContent = count;
      }
    });
  }

  applySorting(sortType) {
    const container = document.getElementById('contradictionsGrid');
    const cards = Array.from(container.querySelectorAll('.contradiction-card'));
    
    cards.sort((a, b) => {
      switch (sortType) {
        case 'alphabetical':
          const titleA = a.querySelector('.card-title')?.textContent || '';
          const titleB = b.querySelector('.card-title')?.textContent || '';
          return titleA.localeCompare(titleB);
        
        case 'severity':
          const severityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          const severityA = a.querySelector('.severity-indicator')?.classList.contains('high') ? 3 :
                           a.querySelector('.severity-indicator')?.classList.contains('medium') ? 2 : 1;
          const severityB = b.querySelector('.severity-indicator')?.classList.contains('high') ? 3 :
                           b.querySelector('.severity-indicator')?.classList.contains('medium') ? 2 : 1;
          return severityB - severityA;
        
        default: // relevance
          return 0;
      }
    });

    // Reorder DOM elements
    cards.forEach(card => container.appendChild(card));
  }

  applyViewMode(mode) {
    const grid = document.getElementById('contradictionsGrid');
    if (!grid) return;

    if (mode === 'list') {
      grid.classList.add('list-view');
    } else {
      grid.classList.remove('list-view');
    }
  }

  initializeCardEffects() {
    const cards = document.querySelectorAll('.premium-card, .contradiction-card');
    
    cards.forEach(card => {
      // Tilt effect on mouse move
      card.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 1024) return; // Skip on mobile
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      // Click animation
      card.addEventListener('mousedown', () => {
        card.style.transform = 'scale(0.98)';
      });
      
      card.addEventListener('mouseup', () => {
        card.style.transform = '';
      });
    });
  }

  initializeForms() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('.newsletter-input').value;
        if (this.validateEmail(email)) {
          this.handleNewsletterSignup(email);
          this.trackInteraction('newsletter_signup', { email: email.split('@')[1] }); // Track domain only for privacy
        } else {
          this.showNotification('Please enter a valid email address', 'error');
        }
      });
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleNewsletterSignup(email) {
    // Simulate API call
    this.showNotification('Thank you for subscribing! We\'ll keep you updated.', 'success');
    
    // Clear form
    const form = document.getElementById('newsletterForm');
    if (form) {
      form.reset();
    }
  }

  // ==========================================
  // ACCESSIBILITY FEATURES
  // ==========================================
  
  initializeAccessibility() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const accessibilityClose = document.getElementById('accessibilityClose');
    
    // Panel toggle
    if (accessibilityToggle && accessibilityPanel) {
      accessibilityToggle.addEventListener('click', () => {
        accessibilityPanel.classList.toggle('show');
        this.trackInteraction('accessibility_panel_toggle');
      });
    }

    if (accessibilityClose && accessibilityPanel) {
      accessibilityClose.addEventListener('click', () => {
        accessibilityPanel.classList.remove('show');
      });
    }

    // Accessibility controls
    this.initializeAccessibilityControls();
    
    // Keyboard navigation
    this.initializeKeyboardNavigation();
    
    // Screen reader support
    this.initializeScreenReaderSupport();
    
    // Load saved accessibility preferences
    this.loadAccessibilityPreferences();
  }

  initializeAccessibilityControls() {
    const fontSizeRange = document.getElementById('fontSize');
    const lineHeightRange = document.getElementById('lineHeight');
    const highContrastToggle = document.getElementById('highContrast');
    const reduceMotionToggle = document.getElementById('reduceMotion');
    const resetBtn = document.getElementById('resetAccessibility');

    // Font size control
    if (fontSizeRange) {
      fontSizeRange.addEventListener('input', (e) => {
        const size = e.target.value;
        document.documentElement.style.fontSize = `${size}px`;
        this.updateRangeValue(fontSizeRange, `${size}px`);
        this.saveAccessibilityPreference('fontSize', size);
      });
    }

    // Line height control
    if (lineHeightRange) {
      lineHeightRange.addEventListener('input', (e) => {
        const height = e.target.value;
        document.body.style.lineHeight = height;
        this.updateRangeValue(lineHeightRange, height);
        this.saveAccessibilityPreference('lineHeight', height);
      });
    }

    // High contrast mode
    if (highContrastToggle) {
      highContrastToggle.addEventListener('change', (e) => {
        document.body.classList.toggle('high-contrast', e.target.checked);
        this.saveAccessibilityPreference('highContrast', e.target.checked);
      });
    }

    // Reduce motion
    if (reduceMotionToggle) {
      reduceMotionToggle.addEventListener('change', (e) => {
        document.body.classList.toggle('reduce-motion', e.target.checked);
        this.saveAccessibilityPreference('reduceMotion', e.target.checked);
      });
    }

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetAccessibilitySettings();
      });
    }
  }

  updateRangeValue(range, value) {
    const valueDisplay = range.parentElement.querySelector('.range-value');
    if (valueDisplay) {
      valueDisplay.textContent = value;
    }
  }

  saveAccessibilityPreference(key, value) {
    const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences') || '{}');
    preferences[key] = value;
    localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
  }

  loadAccessibilityPreferences() {
    const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences') || '{}');
    
    if (preferences.fontSize) {
      const fontSizeRange = document.getElementById('fontSize');
      if (fontSizeRange) {
        fontSizeRange.value = preferences.fontSize;
        document.documentElement.style.fontSize = `${preferences.fontSize}px`;
        this.updateRangeValue(fontSizeRange, `${preferences.fontSize}px`);
      }
    }

    if (preferences.lineHeight) {
      const lineHeightRange = document.getElementById('lineHeight');
      if (lineHeightRange) {
        lineHeightRange.value = preferences.lineHeight;
        document.body.style.lineHeight = preferences.lineHeight;
        this.updateRangeValue(lineHeightRange, preferences.lineHeight);
      }
    }

    if (preferences.highContrast) {
      const highContrastToggle = document.getElementById('highContrast');
      if (highContrastToggle) {
        highContrastToggle.checked = preferences.highContrast;
        document.body.classList.toggle('high-contrast', preferences.highContrast);
      }
    }

    if (preferences.reduceMotion) {
      const reduceMotionToggle = document.getElementById('reduceMotion');
      if (reduceMotionToggle) {
        reduceMotionToggle.checked = preferences.reduceMotion;
        document.body.classList.toggle('reduce-motion', preferences.reduceMotion);
      }
    }
  }

  resetAccessibilitySettings() {
    // Reset to defaults
    document.documentElement.style.fontSize = '';
    document.body.style.lineHeight = '';
    document.body.classList.remove('high-contrast', 'reduce-motion');
    
    // Reset form controls
    const fontSizeRange = document.getElementById('fontSize');
    const lineHeightRange = document.getElementById('lineHeight');
    const highContrastToggle = document.getElementById('highContrast');
    const reduceMotionToggle = document.getElementById('reduceMotion');
    
    if (fontSizeRange) {
      fontSizeRange.value = 16;
      this.updateRangeValue(fontSizeRange, '16px');
    }
    
    if (lineHeightRange) {
      lineHeightRange.value = 1.6;
      this.updateRangeValue(lineHeightRange, '1.6');
    }
    
    if (highContrastToggle) highContrastToggle.checked = false;
    if (reduceMotionToggle) reduceMotionToggle.checked = false;
    
    // Clear saved preferences
    localStorage.removeItem('accessibilityPreferences');
    
    this.showNotification('Accessibility settings reset to defaults', 'success');
  }

  initializeKeyboardNavigation() {
    // Skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--color-accent);
      color: var(--text-inverse);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Close modals with Escape
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.premium-modal-overlay.show');
        const openPanel = document.querySelector('.accessibility-panel.show');
        const openMenu = document.querySelector('.premium-mobile-menu.show');
        
        if (openModal) this.closeModal(openModal);
        if (openPanel) openPanel.classList.remove('show');
        if (openMenu) {
          openMenu.classList.remove('show');
          document.getElementById('mobileToggle')?.classList.remove('active');
          document.body.style.overflow = '';
        }
      }

      // Navigate FAQ with arrow keys
      if (e.target.closest('.premium-faq-item')) {
        const faqItems = Array.from(document.querySelectorAll('.premium-faq-item'));
        const currentIndex = faqItems.indexOf(e.target.closest('.premium-faq-item'));
        
        if (e.key === 'ArrowDown' && currentIndex < faqItems.length - 1) {
          e.preventDefault();
          faqItems[currentIndex + 1].querySelector('.faq-question').focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          e.preventDefault();
          faqItems[currentIndex - 1].querySelector('.faq-question').focus();
        }
      }
    });
  }

  initializeScreenReaderSupport() {
    // Add ARIA labels and descriptions
    const cards = document.querySelectorAll('.premium-card, .contradiction-card');
    cards.forEach((card, index) => {
      card.setAttribute('role', 'article');
      card.setAttribute('tabindex', '0');
      
      const title = card.querySelector('.card-title')?.textContent;
      if (title) {
        card.setAttribute('aria-label', `Card: ${title}`);
      }
    });

    // FAQ accessibility
    const faqItems = document.querySelectorAll('.premium-faq-item');
    faqItems.forEach((item, index) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const toggle = item.querySelector('.faq-toggle');
      
      if (question && answer && toggle) {
        const questionId = `faq-question-${index}`;
        const answerId = `faq-answer-${index}`;
        
        question.setAttribute('id', questionId);
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        question.setAttribute('tabindex', '0');
        
        answer.setAttribute('id', answerId);
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', questionId);
        
        // Update aria-expanded when FAQ opens/closes
        const observer = new MutationObserver(() => {
          const isOpen = item.classList.contains('open');
          question.setAttribute('aria-expanded', isOpen.toString());
          toggle.setAttribute('aria-label', isOpen ? 'Collapse answer' : 'Expand answer');
        });
        
        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
      }
    });

    // Live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(liveRegion);
    
    this.liveRegion = liveRegion;
  }

  announceToScreenReader(message) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
      setTimeout(() => {
        this.liveRegion.textContent = '';
      }, 1000);
    }
  }

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  
  handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'The Qur\'an: The Pure Path',
        text: 'Discover the pure path of Islam through the Qur\'an alone',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showNotification('Link copied to clipboard!', 'success');
      }).catch(() => {
        this.showNotification('Unable to copy link', 'error');
      });
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'});
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: var(--z-toast);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);

    // Announce to screen readers
    this.announceToScreenReader(message);
  }

  // ==========================================
  // PERFORMANCE MONITORING
  // ==========================================
  
  initializePerformanceMonitoring() {
    // Track Core Web Vitals
    this.trackCoreWebVitals();
    
    // Monitor frame rate
    this.monitorFrameRate();
    
    // Track user interactions
    this.trackUserEngagement();
  }

  trackCoreWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      entryList.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  monitorFrameRate() {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFPS = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          console.warn('Low frame rate detected:', fps, 'fps');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  trackUserEngagement() {
    let startTime = Date.now();
    let isActive = true;
    
    // Track time on page
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - startTime;
      console.log('Time spent on page:', Math.round(timeSpent / 1000), 'seconds');
    });

    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        if (!isActive) {
          isActive = true;
          startTime = Date.now();
        }
      }, { passive: true });
    });

    // Track inactivity
    let inactivityTimer;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        isActive = false;
      }, 30000); // 30 seconds of inactivity
    };

    document.addEventListener('mousemove', resetInactivityTimer, { passive: true });
    document.addEventListener('keypress', resetInactivityTimer, { passive: true });
    resetInactivityTimer();
  }

  trackInteraction(action, data = {}) {
    this.performanceMetrics.interactionCount++;
    
    // Log interaction for analytics
    console.log('User interaction:', {
      action,
      data,
      timestamp: Date.now(),
      url: window.location.href
    });
  }

  logPerformance(message) {
    console.log(`[Performance] ${message}:`, {
      loadTime: this.performanceMetrics.loadTime,
      interactionCount: this.performanceMetrics.interactionCount,
      scrollEvents: this.performanceMetrics.scrollEvents,
      memory: performance.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576)
      } : 'Not available'
    });
  }
}

// Initialize the website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.premiumWebsite = new PremiumWebsiteEngine();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, pause non-essential animations
    document.body.classList.add('page-hidden');
  } else {
    // Page is visible, resume animations
    document.body.classList.remove('page-hidden');
  }
});

// Handle online/offline status
window.addEventListener('online', () => {
  console.log('Connection restored');
});

window.addEventListener('offline', () => {
  console.log('Connection lost');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PremiumWebsiteEngine;
}
