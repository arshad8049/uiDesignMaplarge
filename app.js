// ———————————————————————————
// ROTATE DIAL + FINE‑TUNE
// ———————————————————————————

const dial      = document.getElementById('rotateDial');
const handle    = dial.querySelector('.dial-handle');
const rotateIn  = document.getElementById('rotateInput');
const rotateBtn = document.getElementById('rotateApply');

// keep track of the current angle
let currentAngle = parseInt(rotateIn.value, 10) || 0;
function updateDial(deg) {
  currentAngle = deg;
  handle.style.transform = `rotate(${deg}deg)`;
  rotateIn.value = deg;
}

// when the text box changes, update the dial too cause makes sense
rotateIn.addEventListener('change', () => {
  const val = parseInt(rotateIn.value,10);
  if (!isNaN(val)) updateDial(val);
});

// dragging logic
// this is a bit of a mess, but it works
dial.addEventListener('mousedown', startDrag);
function startDrag(e) {
  e.preventDefault();
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup',   stopDrag);
}
function onDrag(e) {
  const rect = dial.getBoundingClientRect();
  const cx   = rect.left + rect.width/2;
  const cy   = rect.top  + rect.height/2;
  const dx   = e.clientX - cx;
  const dy   = e.clientY - cy;
  let deg    = Math.atan2(dy, dx) * 180/Math.PI + 90;
  if (deg < -180) deg += 360;
  if (deg >  180) deg -= 360;
  updateDial(Math.round(deg));
}
function stopDrag() {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup',   stopDrag);
}

rotateBtn.addEventListener('click', () => {
  alert(`Rotate shape by ${currentAngle}°`);
});


const dilateIn    = document.getElementById('dilateInput');
const dilateMinus = document.getElementById('dilateMinus');
const dilatePlus  = document.getElementById('dilatePlus');
const dilateBtn   = document.getElementById('dilateApply');

// step down / up for folks with tricky trackpads
dilateMinus.addEventListener('click', () => dilateIn.stepDown());
dilatePlus .addEventListener('click', () => dilateIn.stepUp());

dilateBtn.addEventListener('click', () => {
  alert(`Scale shape by ${dilateIn.value}×`);
});


document.getElementById('translateApply')
        .addEventListener('click', () => {
  const dx = document.getElementById('transLng').value;
  const dy = document.getElementById('transLat').value;
  alert(`Translate by Δlng=${dx}, Δlat=${dy}`);
});

document.getElementById('reflectApply')
        .addEventListener('click', () => {
  const axis = document.querySelector('input[name=axis]:checked').value;
  alert(`Reflect across ${axis}`);
});

document.getElementById('resetBtn')
        .addEventListener('click', () => {
  alert('Shape reset!');
});
