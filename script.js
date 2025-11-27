
    document.addEventListener('DOMContentLoaded', () => {
      const splash = document.getElementById('splash');
      setTimeout(() => splash.style.display = 'none', 2800);

      /* Intersection Observer for fade-in sections */
      const sections = document.querySelectorAll('.fade-section');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.2 });
      sections.forEach(section => observer.observe(section));

      /* Mobile slide-in panel logic for RTL experience */
      const menuToggle = document.getElementById('menuToggle');
      const menuOverlay = document.getElementById('menuOverlay');
      const mobilePanel = document.getElementById('mobilePanel');
      const closeMenuBtn = document.getElementById('closeMenu');
      const panelLinks = mobilePanel.querySelectorAll('a');
      let menuOpen = false;

      const openMenu = () => {
        menuOpen = true;
        menuToggle.classList.add('open');
        menuOverlay.classList.add('active');
        mobilePanel.classList.add('active');
        document.body.style.overflow = 'hidden';
      };

      const closeMenu = () => {
        menuOpen = false;
        menuToggle.classList.remove('open');
        menuOverlay.classList.remove('active');
        mobilePanel.classList.remove('active');
        document.body.style.overflow = '';
      };

      menuToggle.addEventListener('click', () => {
        menuOpen ? closeMenu() : openMenu();
      });

      closeMenuBtn.addEventListener('click', closeMenu);
      menuOverlay.addEventListener('click', closeMenu);
      panelLinks.forEach(link => link.addEventListener('click', closeMenu));

      window.addEventListener('keyup', (event) => {
        if (event.key === 'Escape' && menuOpen) closeMenu();
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && menuOpen) {
          closeMenu();
        }
      });

      // Reading time calculator (example)
      const articleContent = document.querySelector('.article-content');
      const wordCount = articleContent ? articleContent.textContent.split(/\s+/).length : 0;
      const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
      
      // Update reading time in the article header if exists
      const readingTimeElement = document.querySelector('header span:last-child');
      if (readingTimeElement && readingTimeElement.textContent.includes('زمان مطالعه')) {
        readingTimeElement.textContent = `زمان مطالعه: ${readingTime} دقیقه`;
      }

      // Share buttons functionality
      const shareButtons = document.querySelectorAll('.share-btn');
      shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          // In a real implementation, this would open share dialogs
          alert('امکان اشتراک‌گذاری در این پلتفرم');
        });
      });
    });