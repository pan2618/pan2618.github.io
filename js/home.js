// 檔名：home.js

$(document).ready(function () {

    // ===================================================================
    // 1. 全域變數與函式定義
    // ===================================================================

    var announcements = [];
    var textElement = $('#announcement-text'); // 這是你原本的 ID
    var textArrayIndex = 0;
    var charIndex = 0;
    var typewriterTimeouts = [];
    var currentLanguage = '';
    

    /**
     * 語言翻譯應用函式
     */
    window.applyLanguage = function(lang) { // 掛載到 window 以便全域存取
      let translations = {
        zh: {
          "nav-brand-home": "Home", "nav-link-novels": "小說集", "nav-link-about": "關於我", "hero-title": "Shuttlecock", "hero-progress-label": "目前進度", "intro-title": "精選作品", "intro-desc": "Select the works from the collection that I am personally satisfied with.", "intro-banner-more": "更多", "products-other-channels-heading": "其他通路", "products-subtitle": "Creator’s Other Channels & Platforms", "footer-copyright": "© 2025 Shuttlecock website", "footer-link-other-collab": "其他合作", "footer-link-contact-me": "與我聯絡", "footer-link-other-platforms": "其他平台", "footer-link-online-shop": "線上商店", "news-tag-support": "贊助方案", "news-title-1": "第一次角色投票已開放", "news-badge-1": "NEW", "news-tag-update": "進度更新", "news-title-2": "新增「關於我」頁面",
          "hero_announcements": ["Fanbox 新方案已開放！", "追蹤我的IG來獲取最新消息！",]
        },
        jp: {
          "nav-brand-home": "ホーム", "nav-link-novels": "小説集", "nav-link-about": "私について", "hero-title": "シャトルコック", "hero-progress-label": "現在の進捗", "intro-title": "特選作品", "intro-desc": "私が個人的に満足しているコレクションから作品を選んでください。", "intro-banner-more": "もっと見る", "products-other-channels-heading": "他のチャネル", "products-subtitle": "クリエーターの他のチャンネル＆プラットフォーム", "footer-copyright": "© 2025 Shuttlecock ウェブサイト", "footer-link-other-collab": "他の協力", "footer-link-contact-me": "お問い合わせ", "footer-link-other-platforms": "他のプラットフォーム", "footer-link-online-shop": "オンラインショップ", "news-tag-support": "スポンサープラン", "news-title-1": "第一回キャラクター人気投票開催中", "news-badge-1": "NEW", "news-tag-update": "進捗更新", "news-title-2": "「私について」ページを追加",
          "hero_announcements": ["Fanboxで新しいプランが公開されました！", "インスタをフォローして最新情報をゲット！", ]
        },
        en: {
          "nav-brand-home": "Home", "nav-link-novels": "Novels", "nav-link-about": "About Me", "hero-title": "Shuttlecock", "hero-progress-label": "Current Progress", "intro-title": "Featured Works", "intro-desc": "Select the works from the collection that I am personally satisfied with.", "intro-banner-more": "More", "products-other-channels-heading": "Other Channels", "products-subtitle": "Creator’s Other Channels & Platforms", "footer-copyright": "© 2025 Shuttlecock website", "footer-link-other-collab": "Other Collaboration", "footer-link-contact-me": "Contact Me", "footer-link-other-platforms": "Other Platforms", "footer-link-online-shop": "Online Shop", "news-tag-support": "Sponsorship", "news-title-1": "First Character Poll Now Open", "news-badge-1": "NEW", "news-tag-update": "Update", "news-title-2": "Added \"About Me\" Page",
          "hero_announcements": ["New Fanbox plan now available!", "Follow my IG for the latest updates!", ]
        }
      };

      let t_data = translations[lang] || translations['zh'];
      if (t_data) {
        if (t_data.hero_announcements) { announcements = t_data.hero_announcements; }
        for (const id in t_data) {
          if (typeof t_data[id] === 'string' && $('#' + id).length) {
            $('#' + id).text(t_data[id]);
          }
        }
        $('html').attr('lang', lang === 'zh' ? 'zh-Hant' : lang);
      }
    }

    // --- 打字機函式 ---
    function type() {
      if (!announcements || announcements.length === 0 || !announcements[textArrayIndex]) return;
      if (charIndex < announcements[textArrayIndex].length) {
        textElement.append(announcements[textArrayIndex].charAt(charIndex));
        charIndex++;
        typewriterTimeouts.push(setTimeout(type, 120));
      } else {
        typewriterTimeouts.push(setTimeout(erase, 3000));
      }
    }
    function erase() {
      if (charIndex > 0) {
        textElement.html(textElement.html().slice(0, -1));
        charIndex--;
        typewriterTimeouts.push(setTimeout(erase, 60));
      } else {
        textArrayIndex = (textArrayIndex + 1) % announcements.length;
        typewriterTimeouts.push(setTimeout(type, 500));
      }
    }

    // --- 淡入效果函式 ---
    function triggerFadeIn() {
      $('.fade-in').each(function () {
        if (!$(this).hasClass('fade-in-triggered')) {
          var elementTop = $(this).offset().top;
          var viewportBottom = $(window).scrollTop() + $(window).height();
          if (elementTop < viewportBottom - 50) {
            $(this).addClass('fade-in-triggered');
          }
        }
      });
    }
    function applyInitialStaggeredFadeIn() {
      $('.fade-in').each(function (index) {
        const $el = $(this);
        if (!$el.hasClass('fade-in-triggered')) {
          setTimeout(function () {
            $el.addClass('fade-in-triggered');
          }, index * 1500);
        }
      });
    }

    // ===================================================================
    // 2. 頁面初始化與事件監聽
    // ===================================================================

    // --- 初始設定 ---
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      localStorage.removeItem('language');
    }
    currentLanguage = localStorage.getItem('language') || 'zh';
    applyLanguage(currentLanguage);

    // --- 事件監聽 ---
    // 改為 document 委派，確保 components.js 載入的 navbar 也能觸發事件
    $(document).on('show.bs.collapse', '#navbarNav', () => $('#social-icons').hide());
    $(document).on('hidden.bs.collapse', '#navbarNav', () => $('#social-icons').show());
    $(window).on('scroll', triggerFadeIn);

    // 語言切換按鈕
    $(document).on('click', '.language-option', function (e) {
      e.preventDefault();
      var lang = $(this).data('lang');
      if (lang === currentLanguage) return;

      $('#loading-overlay').css('visibility', 'visible').fadeIn(100);

      setTimeout(function () {
        localStorage.setItem('language', lang);
        currentLanguage = lang;

        // 在更新文字前，先清除舊的打字機動畫
        typewriterTimeouts.forEach(clearTimeout);
        typewriterTimeouts = [];
        textElement.html('');
        charIndex = 0;
        textArrayIndex = 0;

        applyLanguage(lang);

        if (textElement.length) {
          type();
        }

        $('#navbarNav').collapse('hide');

        $('.fade-in').removeClass('fade-in-triggered').css('opacity', 0);
        applyInitialStaggeredFadeIn();
        triggerFadeIn();

        setTimeout(function () {
          $('#loading-overlay').fadeOut(300);
        }, 500);
      }, 500);
    });

    // --- 頁面最終啟動 ---
    setTimeout(function () {
      $('#loading-overlay').fadeOut(300);
    }, 1500);

    applyInitialStaggeredFadeIn();
    setTimeout(triggerFadeIn, 250);

    if (textElement.length) {
      type();
    }
});