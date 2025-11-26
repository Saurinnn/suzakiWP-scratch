document.addEventListener('DOMContentLoaded', function () {
  const speedMs = 100; // 1文字あたり0.1秒
  const targets = document.querySelectorAll('.announce-text');

  // 元のテキストを data-text に保存して空にする
  targets.forEach(el => {
    const fullText = el.textContent.trim();
    el.dataset.text = fullText;  // 保存
    el.textContent = '';         // 初期は非表示
  });

  // IntersectionObserver：announce-list が見えたら発火
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target.querySelector('.announce-text');
        startTyping(el);
        observer.unobserve(entry.target); // 一度だけ
      }
    });
  }, {
    threshold: 0.2,             // 要素の20%が見えたら発火
    rootMargin: "0px 0px -10% 0px" // 画面にしっかり入ってから発火
  });

  document.querySelectorAll('.announce-list').forEach(list => {
    observer.observe(list);
  });

  // 一文字ずつ表示する関数
  function startTyping(el) {
    const str = el.dataset.text;  // 保存した元テキストを取得
    el.textContent = '';
    el.classList.add('typing');

    let index = 0;
    const timer = setInterval(() => {
      if (index < str.length) {
        el.textContent += str.charAt(index);
        index++;
      } else {
        clearInterval(timer);
        el.classList.remove('typing');
      }
    }, speedMs);
  }
});
