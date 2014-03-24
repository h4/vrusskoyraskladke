"use strict";

self.port.on('show', function(args) {
    var input = document.getElementById("source");
    var output = document.getElementsByClassName("output")[0];
    var closeHandler = document.getElementsByClassName('closer')[0];
    var copyHandler = document.getElementById('copy');
    var cyrillicLetters = " 1234567890-=!\"№;%:?*()_+йцукенгшщзхъфывапролджэ\/ячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭ/|ЯЧСМИТЬБЮ,";
    var latinLetters = " 1234567890-=!@#$%^&*()_+qwertyuiop[]asdfghjkl;'\<zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:\"|>ZXCVBNM<>?";

    input.focus();

    input.addEventListener("blur", function (evt) {
        var inputStr = input.value;
        var resultStr = "";
        var inputStrLength = inputStr.length;
        var i = 0;
        var letterIndex;

        for (i; i < inputStrLength; i++) {
            letterIndex = cyrillicLetters.indexOf(inputStr[i]);
            if (letterIndex === -1) {
                output.innerHTML = 'Только русские буквы';
                copyHandler.className = 'hidden';
                setTimeout(function() {
                    input.focus();
                }, 300);
                return;
            }
            resultStr += latinLetters[letterIndex];
        }

        output.innerHTML = resultStr;

        copyHandler.className = '';
    }, false);

    closeHandler.addEventListener('click', function() {
        self.port.emit('panel-close');
    });

    copyHandler.addEventListener('click', function(event) {
        self.port.emit('panel-copy', output.innerHTML);
        self.port.emit('panel-close');
    });
});
