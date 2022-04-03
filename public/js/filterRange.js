let minTxt = document.querySelector('#min-txt');
let maxTxt = document.querySelector('#max-txt');
let minRange = document.querySelector('#min-range');
let maxRange = document.querySelector('#max-range');

// change thumb position fuction
let positionThumbMin = function () {
  minRange.value = Math.min(minRange.value, minRange.parentNode.childNodes[5].value - 1);
  var value = (100 / (parseInt(minRange.max) - parseInt(minRange.min))) * parseInt(minRange.value) - (100 / (parseInt(minRange.max) - parseInt(minRange.min))) * parseInt(minRange.min);
  var children = minRange.parentNode.childNodes[1].childNodes;
  children[1].style.width = value + '%';
  children[5].style.left = value + '%';
  children[7].style.left = value + '%'; children[11].style.left = value + '%';
  children[11].childNodes[1].innerHTML = minRange.value;
}

let positionThumbMax = function () {
  maxRange.value = Math.max(maxRange.value, maxRange.parentNode.childNodes[3].value - (-1));
  var value = (100 / (parseInt(maxRange.max) - parseInt(maxRange.min))) * parseInt(maxRange.value) - (100 / (parseInt(maxRange.max) - parseInt(maxRange.min))) * parseInt(maxRange.min);
  var children = maxRange.parentNode.childNodes[1].childNodes;
  children[3].style.width = (100 - value) + '%';
  children[5].style.right = (100 - value) + '%';
  children[9].style.left = value + '%'; children[13].style.left = value + '%';
  children[13].childNodes[1].innerHTML = maxRange.value;
}