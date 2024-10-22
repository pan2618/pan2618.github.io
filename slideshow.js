let slideIndex = 0;
const slides = [
    {
        image: "images/image1.png",
        text: "日語輕鬆學",
        description: "探索我們的 Line Bot 及其功能"
    },
    {
        image: "images/image2.png",
        text: "學習的最佳伙伴",
        description: "我們的 Line Bot 讓學習變得簡單有趣"
    },
    {
        image: "images/image3.png",
        text: "立即加入我們",
        description: "發掘更多的功能並開始學習新語言"
    }
];

function showSlides() {
    const header = document.getElementById('slideshow');
    const textElement = document.getElementById('slideshow-text');
    const descriptionElement = document.getElementById('slideshow-description');
    
    if (!header || !textElement || !descriptionElement) {
        console.error('未找到必要的 HTML 元素。');
        return;
    }

    // 切換背景圖片
    header.style.backgroundImage = `url('${slides[slideIndex].image}')`;

    // 过渡效果
    textElement.style.transition = 'opacity 0.5s ease';
    descriptionElement.style.transition = 'opacity 0.5s ease';
    
    textElement.style.opacity = 0;
    descriptionElement.style.opacity = 0;
    
    setTimeout(() => {
        textElement.textContent = slides[slideIndex].text;
        descriptionElement.textContent = slides[slideIndex].description;

        textElement.style.opacity = 1;
        descriptionElement.style.opacity = 1;
    }, 500); // 避免与背景图片动画的冲突

    // 更新 index
    slideIndex = (slideIndex + 1) % slides.length;

    // 设置下一次的切换
    setTimeout(showSlides, 5000); // 每5秒切换一次
}

// 启动轮播
showSlides();


document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('.fade-in');

    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.classList.add('show');
            smoothScrollTo(p, 6000);  // 設定滾動時間 1000 毫秒 (1 秒)
        }, index * 6000);  // 每行延遲1.1秒
    });

    function smoothScrollTo(element, duration) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
});

document.getElementById('scrollBtn').addEventListener('click', function() {
    this.blur(); // 移除按鈕的焦點
    this.classList.remove('hover'); // 強制移除 hover 樣式
});


const scrollBtn = document.getElementById('scrollBtn');

// 滑鼠移入或手指觸碰時，添加 hover 樣式
scrollBtn.addEventListener('mouseenter', function() {
    scrollBtn.classList.add('hover');
});
scrollBtn.addEventListener('touchstart', function() {
    scrollBtn.classList.add('hover');
});

// 滑鼠移出或手指移開時，移除 hover 樣式
scrollBtn.addEventListener('mouseleave', function() {
    scrollBtn.classList.remove('hover');
});
scrollBtn.addEventListener('touchend', function() {
    scrollBtn.classList.remove('hover');
});

// 點擊按鈕後，解除 hover 狀態並移除焦點
scrollBtn.addEventListener('click', function() {
    scrollBtn.blur(); // 移除按鈕的焦點
    scrollBtn.classList.remove('hover'); // 強制移除 hover 樣式
});

// 監聽點擊漢堡按鈕的事件，點擊後移除 focus 狀態
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    this.blur(); // 移除按鈕的焦點，防止保持 focus 狀態
});






