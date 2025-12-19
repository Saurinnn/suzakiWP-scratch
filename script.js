document.addEventListener('DOMContentLoaded', function () {
  const speedMs = 10;
  const texts = document.querySelectorAll('.announce-text');

  texts.forEach(el => {
    el.dataset.text = el.textContent.trim();
    el.textContent = '';
  });

  /* =========================
     タイピング用 Observer
  ========================= */
  const announceList = document.querySelector('.announce-list');

  if (announceList && texts.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startSequentialTyping(texts);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });

    observer.observe(announceList);
  }

  function startSequentialTyping(elements) {
    let index = 0;
    const next = () => {
      if (index >= elements.length) return;
      startTyping(elements[index], () => {
        index++;
        next();
      });
    };
    next();
  }

  function startTyping(el, callback) {
    const str = el.dataset.text;
    el.textContent = '';
    el.classList.add('typing');

    let i = 0;
    const timer = setInterval(() => {
      if (i < str.length) {
        el.textContent += str.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        el.classList.remove('typing');
        if (callback) callback();
      }
    }, speedMs);
  }

  /* =========================
     fade-in 用 Observer
  ========================= */
  const images = document.querySelectorAll(
    ".my-cover-text01, .my-cover-text02, .my-cover-text03, .my-cover-info, .my-title-area, .about-article01, .about-image-right01, .about-image-left02, .about-article02, .slide-left-text, .slide-rigit-img, .slide-left-img, .slide-right-text, .inquire-contents,.inquire-text,.inquire-button,.inquire-tel"
  );

  if (images.length > 0) {
    const observer02 = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    images.forEach(img => observer02.observe(img));
  }
});
