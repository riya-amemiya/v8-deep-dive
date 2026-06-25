// 目次のスクロール追従ハイライト
document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const sections = Array.from(document.querySelectorAll('article.chapter'));

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    let currentId = null;
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    }
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === '#' + currentId) {
        link.style.background = 'rgba(194, 65, 12, 0.15)';
        link.style.color = 'var(--accent-dark)';
        link.style.fontWeight = '700';
      } else {
        link.style.background = '';
        link.style.color = '';
        link.style.fontWeight = '';
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // コードブロックに言語ラベルを表示
  document.querySelectorAll('pre code[class^="language-"]').forEach(function(code) {
    const lang = code.className.replace('language-', '').toUpperCase();
    const pre = code.parentElement;
    if (pre.tagName === 'PRE') {
      pre.setAttribute('data-lang', lang);
    }
  });
});
