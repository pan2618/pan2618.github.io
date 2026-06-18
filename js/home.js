// 檔名：home.js

$(document).ready(function () {

    // ===================================================================
    // 全域變數與 DICT 定義
    // ===================================================================
    var announcements = [];
    var textElement = $('#announcement-text'); 
    var textArrayIndex = 0;
    var charIndex = 0;
    var typewriterTimeouts = [];
    var currentLanguage = '';
    
    const translationsDictionary = {
      zh: { // 國際通用版
        "nav_gallery": "作品迴廊", "nav_jp": "日本語", "nav_kr": "한국어", "nav_en": "English", "site_title": "Shuttlecock Art", "site_hero_title": "Shuttlecock", "hero_progress_label": "目前進度", "myworks_header": "Featured Works", "myworks_header_sub": "精選作品", "gallery_card1_desc": "從自己作品集中，精選出令我滿意的創作，希望您也會喜歡", "gallery_card_more": "更多", "tag_ba": "Blue Archive", "tag_original": "Original", "tag_ba_p": "蔚藍檔案", "tag_fgi": "Original - Fgi", "card_marie_title": "伊落マリー", "card_lilith_title": "リリス", "products_news_heading": "最新動態", "products_news_subtitle": "Latest News & Updates", "news_tag1": "進度更新", "news_title1": "第一次角色投票已開放", "tag_new": "NEW", "news_tag2": "開發進度", "news_title2": "新增「作品迴廊」頁面", "view_more_fanbox": "View more on Fanbox", "footer_other_collab": "其他合作", "footer_contact": "與我聯絡", "footer_platforms": "其他平台", "footer_shop": "線上商店", "footer_copyright": "© 2026 Shuttlecock website. All rights reserved.", "loading_text": "LOADING...", "scroll_down": "向下捲動",
        "hero_announcements": ["Fanbox 新方案已開放！", "追蹤我的IG來獲取最新消息！"]
      },
      en: { // English
        "nav_gallery": "Gallery", "nav_jp": "日本語", "nav_kr": "한국어", "nav_en": "English", "site_title": "Shuttlecock Art", "site_hero_title": "Shuttlecock", "hero_progress_label": "Current Progress", "myworks_header": "Featured Works", "myworks_header_sub": "Collection", "gallery_card1_desc": "Selection of works I am personally satisfied with.", "gallery_card_more": "More", "tag_ba": "Blue Archive", "tag_original": "Original", "tag_ba_p": "Blue Archive", "tag_fgi": "Original - Fgi", "card_marie_title": "Marie", "card_lilith_title": "Lilith", "products_news_heading": "Latest News", "products_news_subtitle": "News & Updates", "news_tag1": "Updates", "news_title1": "First character poll now open", "tag_new": "NEW", "news_tag2": "Dev Progress", "news_title2": "Added \"Gallery Corridor\" page", "view_more_fanbox": "View more on Fanbox", "footer_other_collab": "Collaboration", "footer_contact": "Contact", "footer_platforms": "Platforms", "footer_shop": "Shop", "footer_copyright": "© 2026 Shuttlecock website. All rights reserved.", "loading_text": "LOADING...", "scroll_down": "Scroll down",
        "hero_announcements": ["New Fanbox plan is now open!", "Follow me on IG for the latest updates!"]
      },
      jp: { // 日本語 
        "nav_gallery": "作品回廊", "nav_jp": "日本語", "nav_kr": "한국어", "nav_en": "English", "site_title": "Shuttlecock Art", "site_hero_title": "シャトルコック", "hero_progress_label": "現在の進捗状況", "myworks_header": "特選作品", "myworks_header_sub": "おすすめ作品", "gallery_card1_desc": "私が個人的に満足している作品のおすすめコレクション", "gallery_card_more": "もっと見る", "tag_ba": "ブルーアーカイブ", "tag_original": "オリジナル", "tag_ba_p": "ブルーアーカイブ", "tag_fgi": "オリジナル - Fgi", "card_marie_title": "伊落マリー", "card_lilith_title": "リリス", "products_news_heading": "最新情報", "products_news_subtitle": "Latest News & Updates", "news_tag1": "進捗状況の更新", "news_title1": "第一回キャラクター人気投票受付中", "tag_new": "NEW", "news_tag2": "開發進捗", "news_title2": "「作品回廊」ページを追加", "view_more_fanbox": "View more on Fanbox", "footer_other_collab": "連携と協業", "footer_contact": "お問い合わせ", "footer_platforms": "その他のプラットフォーム", "footer_shop": "オンラインショップ", "footer_copyright": "© 2026 Shuttlecock ウェブサイト", "loading_text": "LOADING...", "scroll_down": "下にスクロール",
        "hero_announcements": ["Fanboxの新プランが公開されました！", "インスタをフォローして最新情報をゲット！"]
      },
      kr: { // 한국어 
        "nav_gallery": "작품 회랑", "nav_jp": "日本語", "nav_kr": "한국어", "nav_en": "English", "site_title": "Shuttlecock Art", "site_hero_title": "셔틀콕", "hero_progress_label": "진행 상황", "myworks_header": "추천 작품", "myworks_header_sub": "컬렉션", "gallery_card1_desc": "제가 개인적으로 만족하는 작품의 추천 컬렉션", "gallery_card_more": "더 보기", "tag_ba": "블루 아카이브", "tag_original": "오리지널", "tag_ba_p": "블루 아카이브", "tag_fgi": "오리지널 - Fgi", "card_marie_title": "마리", "card_lilith_title": "릴리스", "products_news_heading": "최신 소식", "products_news_subtitle": "News & Updates", "news_tag1": "진행 상황 업데이트", "news_title1": "제1회 캐릭터 인기투표 접수 중", "tag_new": "NEW", "news_tag2": "개발 진행 상황", "news_title2": "「작품 회랑」 페이지 추가", "view_more_fanbox": "View more on Fanbox", "footer_other_collab": "기타 협업", "footer_contact": "문의하기", "footer_platforms": "기타 플랫폼", "footer_shop": "온라인 숍", "footer_copyright": "© 2026 Shuttlecock 웹사이트", "loading_text": "LOADING...", "scroll_down": "아래로 스크롤",
        "hero_announcements": ["Fanbox 새 플랜이 오픈되었습니다!", "IG를 팔로우하여 최신 소식을 확인하세요!"]
      }
    };

    window.applyLanguage = function(lang) {
      let t_data = translationsDictionary[lang] || translationsDictionary['zh'];
      
      if (t_data) {
        if (t_data.hero_announcements) { announcements = t_data.hero_announcements; }

        $('[data-i18n]').each(function () {
          const key = $(this).data('i18n');
          if (t_data[key]) {
            $(this).text(t_data[key]);
          }
        });
        
        let properLangAttr = lang === 'zh' ? 'zh-Hant' : (lang === 'kr' ? 'ko' : lang); 
        $('html').attr('lang', properLangAttr);
      }
    }

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
          }, index * 150); 
        }
      });
    }

    // ===================================================================
    // 頁面初始化與事件監聽
    // ===================================================================
    function fixMobileParallax() {
        if ($(window).width() <= 768) {
            $('.junction-hero-banner').css('background-attachment', 'scroll');
        } else {
            $('.junction-hero-banner').css('background-attachment', 'fixed');
        }
    }
    fixMobileParallax();
    $(window).on('resize', fixMobileParallax);

    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      localStorage.removeItem('language');
    }
    currentLanguage = localStorage.getItem('language') || 'zh';
    applyLanguage(currentLanguage);

    $(document).on('show.bs.collapse', '#navbarNav', () => $('#social-icons').stop().fadeOut(200));
    $(document).on('hidden.bs.collapse', '#navbarNav', () => $('#social-icons').stop().fadeIn(200));
    $(window).on('scroll', triggerFadeIn);

    $(document).on('click', '.language-option', function (e) {
      e.preventDefault();
      var lang = $(this).data('lang');
      if (lang === currentLanguage) return;

      $('#loading-overlay').css('visibility', 'visible').fadeIn(200);

      setTimeout(function () {
        localStorage.setItem('language', lang);
        currentLanguage = lang;

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
          $('#loading-overlay').fadeOut(400);
        }, 500);
      }, 500);
    });

    setTimeout(function () {
      $('#loading-overlay').fadeOut(400);
    }, 1000);

    applyInitialStaggeredFadeIn();
    setTimeout(triggerFadeIn, 250);

    if (textElement.length) {
      type();
    }
});
