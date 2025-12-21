$(document).ready(function() {

    // ---------- A. 顯示 Loading 遮罩並處理淡出 ----------
    // 原始 HTML 中 visibility 是 hidden，但在 JS 載入前我們希望它顯示
    // 這裡直接控制顯示邏輯
    $('#loading-overlay').css('visibility', 'visible');
    
    setTimeout(function() {
        $('#loading-overlay').fadeOut(300, function(){
            $(this).css('visibility', 'hidden'); // 確保完全隱藏
        });
    }, 500); // 模擬載入時間，與原本設定一致

    // ---------- B. 語言處理 ----------
    
    // 翻譯字典
    const translations = {
        zh: {
            "about_nav_brand": "Home",
            "about_nav_novels": "小說集",
            "about_nav_about_me": "關於我",
            "about_main_title": "關於我",
            "about_main_p1": "我是羽球，一位熱愛故事與繪畫的創作者。從小就對文字與影像充滿想像，喜歡在敘事與視覺之間遊走，透過筆下的角色與場景，傳遞情感與溫度。",
            "about_main_p2": "我的作品涵蓋小說、二創與多媒體專案，如果對我的創作有興趣，歡迎透過下方連結與我聯絡！",
            "about_skill_novels": "小說作品",
            "about_skill_digital": "數位專案",
            "about_skill_illustrations": "插畫創作",
            "about_skill_community": "社群追蹤",
            "fanbox_promo_title": "第一次角色投票已開放",
            "fanbox_promo_subtitle": "請創作者喝杯咖啡吧(｡・ω・｡)",
            "fanbox_promo_button": "查看詳情",
            "about_footer_copyright": "© 2025 Shuttlecock 網站",
            "about_footer_collab": "其他合作",
            "about_footer_contact": "與我聯絡",
            "about_footer_platforms": "其他平台",
            "about_footer_shop": "線上商店",
        },
        jp: {
            "about_nav_brand": "ホーム",
            "about_nav_novels": "小説集",
            "about_nav_about_me": "私について",
            "about_main_title": "私について",
            "about_main_p1": "こんにちは、羽球です。物語と絵画を愛するクリエイターです。幼い頃から文字と映像に想像力を膨らませ、物語と視覚の間を行き来し、筆から生まれるキャラクターやシーンを通じて感情と温もりを伝えています。",
            "about_main_p2": "私の作品は小説、二次創作、マルチメディアプロジェクトに及びます。私の創作に興味があれば、以下のリンクからお気軽にご連絡ください！",
            "about_skill_novels": "小説作品",
            "about_skill_digital": "デジタルプロジェクト",
            "about_skill_illustrations": "イラスト制作",
            "about_skill_community": "コミュニティ・フォロワー",
            "fanbox_promo_title": "第一回キャラクター投票開催中",
            "fanbox_promo_subtitle": "クリエイターにコーヒーを一杯どうぞ(｡・ω・｡)",
            "fanbox_promo_button": "詳細を見る",
            "about_footer_copyright": "© 2025 Shuttlecock ウェブサイト",
            "about_footer_collab": "その他の協力",
            "about_footer_contact": "お問い合わせ",
            "about_footer_platforms": "他のプラットフォーム",
            "about_footer_shop": "オンラインショップ",
        },
        en: {
            "about_nav_brand": "Home",
            "about_nav_novels": "Novels",
            "about_nav_about_me": "About Me",
            "about_main_title": "About Me",
            "about_main_p1": "Hello, I'm Shuttlecock, a creator passionate about stories and illustration. Since childhood, I've been fascinated by words and visuals, enjoying the journey between narrative and art, conveying emotions and warmth through my characters and scenes.",
            "about_main_p2": "My work includes novels, fan art, and multimedia projects. If you are interested in my creations, please feel free to contact me via the links below!",
            "about_skill_novels": "Novel Works",
            "about_skill_digital": "Digital Projects",
            "about_skill_illustrations": "Illustrations",
            "about_skill_community": "Community Following",
            "fanbox_promo_title": "First Character Poll Now Open",
            "fanbox_promo_subtitle": "Treat the creator to a coffee (｡・ω・｡)",
            "fanbox_promo_button": "View Details",
            "about_footer_copyright": "© 2025 Shuttlecock website",
            "about_footer_collab": "Other Collaborations",
            "about_footer_contact": "Contact Me",
            "about_footer_platforms": "Other Platforms",
            "about_footer_shop": "Online Store",
        }
    };

    function applyLanguage(lang) {
        $('html').attr('lang', lang === 'zh' ? 'zh-Hant' : lang);

        let currentTranslations = translations[lang] || translations['zh'];
        for (const id in currentTranslations) {
            // 這裡會去抓取 HTML 裡面的 ID 進行替換
            $('#' + id).text(currentTranslations[id]);
        }
    }

    // 優先讀取 localStorage
    var currentLanguage = localStorage.getItem('language') || 'zh';
    applyLanguage(currentLanguage);

    // 點擊事件
    $('.language-option').on('click', function (e) {
        e.preventDefault();
        var newLang = $(this).data('lang');
        localStorage.setItem('language', newLang);
        
        applyLanguage(newLang);
        
        // 關閉手機版選單
        $('#nav.show').collapse('hide');
    });

    // ---------- C. 頁面功能 (淡入、進度環等) ----------

    function scanFade(){
        $('.fade-in:not(.fade-in-triggered)').each(function(){
            const $el=$(this), top=$el.offset().top, view=$(window).scrollTop()+$(window).height();
            if(top < view - 50){ 
                $el.addClass('fade-in-triggered');
            }
        });
    }
    
    // 背景圖設定
    if($('body').hasClass('with-bg')){
        const url=$('body').data('bg');
        if(url) $('body').css('background-image','url('+url+')');
    }

    // 進度條動畫
    let skillStarted=false;
    const skillsStatsSectionEl = document.getElementById('my-skills-stats');
    if (skillsStatsSectionEl && typeof ProgressBar !== 'undefined') {
        const progressBarIo = new IntersectionObserver(entries=>{
            entries.forEach(en=>{
                if(en.isIntersecting && !skillStarted){
                    $('.skill-circle').each(function(){
                        const frac=parseFloat(this.dataset.frac), text=this.dataset.text;
                        const bar=new ProgressBar.Circle(this,{
                            strokeWidth:6, color:'var(--primary)', trailColor:'#e5e5e5',
                            duration:1800, easing:'easeInOut',
                            text:{value:'0',className:'progressbar-text'}
                        });
                        bar.animate(frac,()=>{bar.setText(text);});
                    });
                    skillStarted=true;
                    progressBarIo.disconnect();
                }
            });
        },{threshold:0.4});
        progressBarIo.observe(skillsStatsSectionEl);
    }
    
    // 初始觸發與監聽滾動
    scanFade();
    $(window).on('scroll load resize', scanFade);
});