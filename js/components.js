// 檔名：components.js

function loadHeader() {
    // 這裡是從你剛剛提供的 code 裡剪下來的 Navbar
    const headerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a id="nav-brand-home" class="navbar-brand text-white" href="index.html">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a id="nav-link-novels" class="nav-link text-white disabled" href="novels.html">小說集</a>
            </li>
            <li class="nav-item">
              <a id="nav-link-about" class="nav-link text-white" href="about.html" tabindex="-1"
                aria-disabled="true">關於我</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white language-option" href="#" data-lang="jp">日本語</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white language-option" href="#" data-lang="en">English</a>
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
        // 防呆：如果找不到 slideshow，就插在 body 最前面
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
}

function loadFooter() {
    // 這裡是從你剛剛提供的 code 裡剪下來的 Footer
    const footerHTML = `
    <footer class="footer bg-dark text-white text-center py-10">
      <div class="container">
        <h6 id="footer-copyright">© 2025 Shuttlecock website</h6>
        <h6 class="text-info">shuttlecock0826@gmail.com</h6>
        <p></p>
        <div class="row">
          <div class="col-6 col-md-3">
            <a id="footer-link-other-collab" href="mailto:shuttlecock0826@gmail.com"
              class="text-white footer-link">其他合作</a>
          </div>
          <div class="col-6 col-md-3">
            <a id="footer-link-contact-me" href="mailto:shuttlecock0826@gmail.com" class="text-white footer-link">與我聯絡</a>
          </div>
          <div class="col-6 col-md-3">
            <a id="footer-link-other-platforms" href="https://kevin0826.fanbox.cc/plans"
              class="text-white footer-link">其他平台</a>
          </div>
          <div class="col-6 col-md-3">
            <a id="footer-link-online-shop" href="https://shopee.com/your-shop-link"
              class="text-white footer-link">線上商店</a>
          </div>
        </div>
      </div>
    </footer>
    `;
    
    // 插入到 body 最後面 (但在 script 之前)
    const scriptTag = document.querySelector('script'); // 找第一個 script
    if(scriptTag && scriptTag.parentElement) {
         // 插在最後一個 div .section-divider 之後比較保險，或者直接 append 到 body
         document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
}

// 執行載入
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    
    // 確保 Navbar 互動正常 (因為是動態插入，有時 Bootstrap 初始化會漏掉，這裡手動補強可選)
});