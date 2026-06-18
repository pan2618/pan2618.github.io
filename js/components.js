// 檔名：components.js

function loadHeader() {
    // 移除了左側的 Home 標題，保留了一個空的 div 佔位，確保右側選單不會跑版到左邊
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
              <a id="nav-link-novels" class="nav-link text-white nav-custom-link disabled" href="novels.html">小說集</a>
            </li>
            <li class="nav-item">
              <a id="nav-link-about" class="nav-link text-white nav-custom-link" href="about.html">關於我</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white nav-custom-link language-option" href="#" data-lang="jp">日本語</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white nav-custom-link language-option" href="#" data-lang="en">English</a>
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
    // 預留與原有 footer 加載機制同步
}

// 執行載入
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    if (typeof loadFooter === 'function') {
        loadFooter();
    }
});
