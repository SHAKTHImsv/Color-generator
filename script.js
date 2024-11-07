// script.js

const cBox = 
    document.getElementById('color-box');
const cType = 
    document.getElementById('color-type-select');
const cInput = 
    document.querySelectorAll('.color-inputs');
const opaText = 
    document.getElementById('opacity-label');
const opaSlide = 
    document.getElementById('opacity-slider');
cType.addEventListener('change', () => {
    const choseTpe = cType.value;
    cInput.forEach(input => {
        input.style.display = 'none';
    });
    if (choseTpe === 'rgb') {
        document.getElementById('rgb-inputs').style.display = 'block';
        opaText.style.display = 'none';
        opaSlide.style.display = 'none';
    } else if (choseTpe === 'hex') {
        document.getElementById('hex-input').style.display = 'block';
        opaText.style.display = 'none';
        opaSlide.style.display = 'none';
    } else if (choseTpe === 'cmyk') {
        document.getElementById('cmyk-inputs').style.display = 'block';
        opaText.style.display = 'block';
        opaSlide.style.display = 'block';
    }
    colorChange();
});
const slides = document.querySelectorAll('.slider');
const slideVal = document.querySelectorAll('.slider-value');
slides.forEach((slider, index) => {
    slider.addEventListener('input', () => {
        slideVal[index].textContent = slider.value;
        colorChange();
    });
});
const hexColInput = document.getElementById('hex-color');
hexColInput.addEventListener('input', () => {
    colorChange();
});
opaSlide.addEventListener('input', () => {
    colorChange();
});
cType.value = 'rgb';
cType.dispatchEvent(new Event('change'));
function colorChange() {
    const colorType = cType.value;
    if (colorType === 'rgb') {
        const rValue = 
            document.getElementById('red-slider').value;
        const gValue =
            document.getElementById('green-slider').value;
        const bValue = 
            document.getElementById('blue-slider').value;
        const col = `rgb(${rValue}, ${gValue}, ${bValue})`;
        cBox.textContent = col;
        cBox.style.backgroundColor = col;
        document.getElementById('color-code').textContent = col;
    } else if (colorType === 'hex') {
        const hexValue = hexColInput.value;
        cBox.textContent = hexValue;
        cBox.style.backgroundColor = hexValue;
        document.getElementById('color-code').textContent = hexValue;
    } else if (colorType === 'cmyk') {
        const cValue = 
            document.getElementById('cyan-slider').value;
        const mValue =
            document.getElementById('magenta-slider').value;
        const yValue =
            document.getElementById('yellow-slider').value;
        const kValue = 
            document.getElementById('black-slider').value;
        const opacityValue = opaSlide.value;
        const r = 
            Math.round(255 * (1 - cValue / 100) * (1 - kValue / 100));
        const g = 
            Math.round(255 * (1 - mValue / 100) * (1 - kValue / 100));
        const b = 
            Math.round(255 * (1 - yValue / 100) * (1 - kValue / 100));
        const col = 
            `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
        const cmykCol =
            `CMYK(${cValue}%, ${mValue}%, ${yValue}%, ${kValue}%)`;
        cBox.textContent = cmykCol;
        cBox.style.backgroundColor = col;
        document.getElementById('color-code').textContent = cmykCol;
    }
}
const cpBtn = document.getElementById('copy-button');
function cpyColor() {
    const cCode = 
        document.getElementById('color-code').textContent;
    const input = 
        document.createElement('textarea');
    input.value = cCode;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('Color code copied to clipboard: ' + cCode);
}
cpBtn.addEventListener('click', cpyColor);
