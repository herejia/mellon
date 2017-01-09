var passcode;
document.addEventListener('DOMContentLoaded', () => { passcode = document.getElementById('passcode-input'); });
function openGate() {
  fetch('/open', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "passcode": passcode.value
    })
  })
  .then((response) => {
    if (response.status === 200) {
      accessGranted();
    } else {
      accessDenied();
    }
  });
}
function clearPassword() {
  passcode.value = null;
}
function accessDenied() {
  passcode.classList.add('access-denied');
  setTimeout(function() {
    passcode.classList.remove('access-denied');
    clearPassword();
  }, 2000);
}
function accessGranted() {
  passcode.classList.add('access-granted');
  document.getElementById('progressbar-field').classList.remove('hidden');
  var progressbar = document.querySelector('#progressbar-field progress');
  var gateOpeningTime = 20 * 1000; //ms
  var numberOfSteps = 100;
  var tickingTime = gateOpeningTime / numberOfSteps;
  var valueIncrement = numberOfSteps / 100;
  var interval = setInterval(function() {
    if (progressbar.value === 100) {
      document.querySelector('#progressbar-field h3').classList.remove('hidden');
      clearInterval(interval);
    } else {
      progressbar.value += valueIncrement;
    }
  }, tickingTime);
}
