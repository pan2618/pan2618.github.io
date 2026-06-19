// 檔名：js/components.js

function loadHeader() {
    const headerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark dynamic-game-nav">
      <div class="container-fluid nav-inner-box">
        <div class="navbar-brand-modern"></div> 
        
        <button class="navbar-toggler-modern" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon-line"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto nav-links-alignment">
            <li class="nav-item">
              <a class="nav-link text-white nav-custom-link" href="https://kevin0826.fanbox.cc/" target="_blank">Fanbox</a>
            </li>
            <li class="nav-item">
              <a data-i18n="nav_jp" class="nav-link text-white nav-custom-link language-option" href="#" data-lang="jp">日本語</a>
            </li>
            <li class="nav-item">
              <a data-i18n="nav_kr" class="nav-link text-white nav-custom-link language-option" href="#" data-lang="kr">한국어</a>
            </li>
            <li class="nav-item">
              <a data-i18n="nav_en" class="nav-link text-white nav-custom-link language-option" href="#" data-lang="en">English</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `;
    
    // 插入到 header#slideshow 的最前面
    const headerContainer = document.getElementById('slideshow');
    if (headerContainer) {
        headerContainer.insertAdjacentHTML('afterbegin', headerHTML);
    } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
}

function loadFooter() {
}

// 執行載入
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    if (typeof loadFooter === 'function') {
        loadFooter();
    }
});
