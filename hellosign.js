const signaturePad = document.getElementById('signaturePad');
const ctx = signaturePad.getContext('2d');
let drawing = false;

// 禁止默認的觸控動作
signaturePad.style.touchAction = 'none';

// 針對手機觸控事件處理
signaturePad.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = signaturePad.getBoundingClientRect();
    const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX - rect.left,
        clientY: touch.clientY - rect.top
    });
    signaturePad.dispatchEvent(mouseEvent);
}, false);

signaturePad.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = signaturePad.getBoundingClientRect();
    const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX - rect.left,
        clientY: touch.clientY - rect.top
    });
    signaturePad.dispatchEvent(mouseEvent);
}, false);

signaturePad.addEventListener('touchend', (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent("mouseup", {});
    signaturePad.dispatchEvent(mouseEvent);
}, false);

// 電腦端的滑鼠事件處理
signaturePad.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

signaturePad.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

signaturePad.addEventListener('mouseup', () => drawing = false);
signaturePad.addEventListener('mouseout', () => drawing = false);

// Scroll up and down functionality
document.getElementById('scrollUp').addEventListener('click', function() {
    window.scrollBy({ top: -200, behavior: 'smooth' });
});

document.getElementById('scrollDown').addEventListener('click', function() {
    window.scrollBy({ top: 200, behavior: 'smooth' });
});
