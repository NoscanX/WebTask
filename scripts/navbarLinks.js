document.querySelectorAll('.navbar__link--desktop').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelectorAll('.navbar__link--desktop').forEach(item => {
        item.classList.remove('active');
      });
      
      this.classList.add('active');
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar__container').offsetHeight;
        const offsetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      history.pushState(null, null, targetId);
    });
  });

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 122;
    
    document.querySelectorAll('.navbar__link--desktop').forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });