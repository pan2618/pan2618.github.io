// 步驟 1：合約條款
const contractText = document.getElementById('contractText');
const nextStep1 = document.getElementById('nextStep1');
const prevStep1 = document.getElementById('prevStep1');

contractText.addEventListener('scroll', function() {
    if (contractText.scrollTop + contractText.clientHeight >= contractText.scrollHeight) {
        nextStep1.disabled = false;
    }
});

nextStep1.addEventListener('click', function() {
    document.getElementById('contractStep').style.display = 'none';
    document.getElementById('signatureStep').style.display = 'block';
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
});

// "上一步" 按鈕：從簽名返回到合約條款
document.getElementById('prevStep1').addEventListener('click', function() {
    document.getElementById('signatureStep').style.display = 'none';
    document.getElementById('contractStep').style.display = 'block';
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
});


// 步驟 2：簽名
const signaturePad = document.getElementById('signaturePad');
const ctx = signaturePad.getContext('2d');
let drawing = false;

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

document.getElementById('clearSignature').addEventListener('click', () => {
    ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
});

document.getElementById('generatePDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const signatureData = signaturePad.toDataURL('image/png');
    doc.addImage(signatureData, 'PNG', 20, 20, 150, 100);
    doc.save('簽名.pdf');
});

document.getElementById('nextStep2').addEventListener('click', () => {
    document.getElementById('signatureStep').style.display = 'none';
    document.getElementById('completionStep').style.display = 'block';
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
});

// "上一步" 按鈕：從完成返回到簽名
document.getElementById('prevStep2').addEventListener('click', function() {
    document.getElementById('completionStep').style.display = 'none';
    document.getElementById('signatureStep').style.display = 'block';
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step2').classList.add('active');
});

// 支援觸控簽名
signaturePad.addEventListener('touchstart', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.touches[0].clientX - signaturePad.offsetLeft, e.touches[0].clientY - signaturePad.offsetTop);
});

signaturePad.addEventListener('touchmove', (e) => {
    if (drawing) {
        ctx.lineTo(e.touches[0].clientX - signaturePad.offsetLeft, e.touches[0].clientY - signaturePad.offsetTop);
        ctx.stroke();
    }
});

signaturePad.addEventListener('touchend', () => drawing = false);

// 修正觸控座標的準確性
signaturePad.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const rect = signaturePad.getBoundingClientRect(); // 獲取畫布的位置和尺寸
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    drawing = true;
}, false);

signaturePad.addEventListener('touchmove', (e) => {
    if (!drawing) return;
    e.preventDefault();
    const rect = signaturePad.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
}, false);

signaturePad.addEventListener('touchend', () => drawing = false, false);
