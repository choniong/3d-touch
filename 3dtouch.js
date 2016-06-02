var element = document.getElementById('forceMe');
var forceMeBar = document.getElementById('forceMeBar');
var forceValueOutput = document.getElementById('forceValue');
var uniqueTouchOutput = document.getElementById('uniqueTouch');
var totalTouchOutput = document.getElementById('totalTouch');
var background = document.getElementById('background');

document.getElementById('useTransform').checked = false;

addForceTouchToElement(element);

var uniqueTouchRecorder = new Set();
var totalTouchCount = 0;

var shouldUseTransform = false;

function recordTouch(touch) {
  uniqueTouchRecorder.add(touch);
  ++totalTouchCount;
}

function uniqueTouchCount() {
  return uniqueTouchRecorder.size;
}

function onTouchStart(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchMove(e) {
  e.preventDefault();
  checkForce(e);
}

function onTouchEnd(e) {
  e.preventDefault();
  renderElement(0);
}

function checkForce(e) {
  var touch = e.touches[0];
  refreshForceValue(e.touches[0]);
  recordTouch(touch);
  uniqueTouchOutput.innerHTML = uniqueTouchCount();
  totalTouchOutput.innerHTML = totalTouchCount;
}

function checkMacForce(e) {
  // max value for trackpad is 3.0 compare to 1.0 on iOS
  renderElement(e.webkitForce/3);
}

function refreshForceValue(touch) {
  var forceValue = 0;
  if(touch) {
    forceValue = touch.force || 0;
  }

  renderElement(forceValue);
}

function renderElement(forceValue) {
  if (shouldUseTransform) {
    element.style.transform = 'translateX(-50%) translateY(-50%) scale(' + (1 + forceValue * 1.5) + ')';
    // background.style.webkitFilter = 'blur(' + forceValue * 30 + 'px)';
  }
  forceMeBar.style.width = 200 * forceValue + "px";
  forceValueOutput.innerHTML = forceValue.toFixed(4);
}

function addForceTouchToElement(elem) {
  elem.addEventListener('touchstart', onTouchStart, false);
  elem.addEventListener('touchmove', onTouchMove, false);
  elem.addEventListener('touchend', onTouchEnd, false);
  elem.addEventListener('webkitmouseforcewillbegin', checkMacForce, false);
  elem.addEventListener('webkitmouseforcechanged', checkMacForce, false);
}

function handleUseTransformOnClick(checkBox) {
  shouldUseTransform = checkBox.checked;
}
