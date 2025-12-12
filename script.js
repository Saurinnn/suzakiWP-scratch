document.addEventListener('DOMContentLoaded', function () {
  const speedMs = 10;
  const texts = document.querySelectorAll('.announce-text');

  // テキストを data-text に保持し、初期化
  texts.forEach(el => {
    el.dataset.text = el.textContent.trim();
    el.textContent = '';
  });

  // IntersectionObserver（.announce-list が見えたら開始）
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startSequentialTyping(texts);  // ★順番に実行
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px"
  });

  observer.observe(document.querySelector('.announce-list'));

  // ★複数の .announce-text を順番に処理する関数
  function startSequentialTyping(elements) {
    let index = 0;

    const next = () => {
      if (index >= elements.length) return; // 全部終わり

      startTyping(elements[index], () => {
        index++;
        next(); // ★終了後に次を実行
      });
    };

    next(); // 最初を開始
  }

  // ★単体のタイピング（完了時 callback を実行）
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
        if (callback) callback(); // ★次を開始
      }
    }, speedMs);
  }

  const images = document.querySelectorAll(".my-cover-text01, .my-cover-text02, .my-cover-text03, .my-cover-info, .my-title-area, .about-article01, .about-image-right01, .about-image-left02, .about-article02, .slide-left-text, .slide-rigit-img, .slide-left-img, .slide-right-text, .inquire-contents,.inquire-text,.inquire-button,.inquire-tel");

  const observer02 = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // 一度表示したら監視を解除
      }
    });
  }, {
    threshold: 0.1 // 画像の10％が見えたら発火
  });

  images.forEach(img => {
    observer02.observe(img);
  });
});
