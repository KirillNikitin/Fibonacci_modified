window.onload = function(){
    var LowNumbersList = document.getElementById('LowNumbersList');
    var HighNumbersList = document.getElementById('HighNumbersList');
    var LowNumbersButton = document.getElementById('LowNumbersButton');
    var HighNumbersButton = document.getElementById('HighNumbersButton');
    var numberTestInput = document.getElementById('numberTestInput');
    var result = document.getElementById('result');
    var testCount = document.getElementById('testCount');

    var FillLowNumbersList = function(){
        if (LowNumbersList.innerHTML == ""){
            for (var i = 0; i<50; i++) {
                var newElement = document.createElement('li');
                newElement.innerHTML = LowNumbersListArr[i];
                LowNumbersList.appendChild(newElement);
            }
        } else {
            alert('Low numbers list succesfully filled.');
        }

    };
    var FillHighNumbersList = function(){
        if (HighNumbersList.innerHTML == "") {
            for (var i = 0; i<50; i++) {
                var newElement = document.createElement('li');
                newElement.innerHTML = HighNumbersListArr[i];
                HighNumbersList.appendChild(newElement);
            }
        } else {
            alert('High numbers list succesfully filled.');
        }
    };
    var FillingChecker = function(){
      if(LowNumbersList.innerHTML != "") {
          LowNumbersButton.nextElementSibling.innerHTML = "<div class=\'triangle-bottom\'></div> Low numbers list succesfully filled.";
      }
      if(HighNumbersList.innerHTML != "") {
          HighNumbersButton.nextElementSibling.innerHTML = "<div class=\'triangle-bottom\'></div> High numbers list succesfully filled.";
      }
    };
    function setRedBackground(list){
        var counted = 0;
        var elements = list.children;
        var newElement = document.createElement('div');
        newElement.className = 'counted-items';
        list.parentNode.appendChild(newElement);
        Array.prototype.forEach.call(elements, function(el, i){
            el.onclick = function(){
                var bgColor = el.style.backgroundColor;
                if(el.style.backgroundColor != 'rgb(255, 0, 0)'){
                    el.style.backgroundColor = '#ff0000';
                    counted += 1;
                } else {
                    el.style.backgroundColor = '';
                    counted--;
                }
                if(counted == 0){
                    newElement.innerHTML = '';
                }
                else if (counted == 1) {
                    newElement.innerHTML = 'You select ' + counted + ' line in ' + list.title;
                }
                else {
                    newElement.innerHTML = 'You select ' + counted + ' lines in ' + list.title;
                }
            }
        });
    }

    LowNumbersButton.onclick = function() {FillLowNumbersList(); FillingChecker(); setRedBackground(LowNumbersList)};
    HighNumbersButton.onclick = function() {FillHighNumbersList(); FillingChecker(); setRedBackground(HighNumbersList)};
    testCount.onclick = function(){
        var val = numberTestInput.value;
        var valParsedInt = parseInt(val);
        if (val && typeof(valParsedInt) == 'number'){
            result.innerHTML = mfn(valParsedInt);
            numberTestInput.value = valParsedInt;
        }
    };
};
cache = [0, 1];
var LowNumbersListArr = [];
var HighNumbersListArr = [];
function mfn(n) {
    if (n in cache) return cache[n];
    var i = cache.length;
    while (i <= n) { cache[i] = (cache[i-2] + cache[i-1] / i); i++; }
    return cache[n];
}
(function getNumbers(){

    for (var i = 0; i<50; i++) {
        LowNumbersListArr.push(mfn(1e7+i));
    }

    for (var j = 0; j<50; j++) {
        HighNumbersListArr.push(mfn(2e7+j));
    }
}
)();
