"use strict";

self.port.on('show', function(args) {
    var input = document.getElementById("source");
    var output = document.getElementsByClassName("output")[0];
    var closeHandler = document.getElementsByClassName('closer')[0];
    var copyHandler = document.getElementById('copy');

    input.focus();

    input.addEventListener("blur", process, false);
    input.addEventListener("keyup", function(evt) {
        if (evt.keyCode == 13) {
            process();
        }
    }, false);

    closeHandler.addEventListener('click', function() {
        self.port.emit('panel-close');
    });

    copyHandler.addEventListener('click', function(event) {
        self.port.emit('panel-copy', output.innerHTML);
        self.port.emit('panel-close');
    });

    function process(event) {
        var inputStr = input.value;
        var resultStr;

        try {
            resultStr = mapRusToLat(inputStr);
        } catch(err) {
            output.innerHTML = 'Только русские буквы';
            copyHandler.className = 'hidden';
            setTimeout(function() {
                input.focus();
            }, 300);
            return;
        }

        output.innerHTML = resultStr;
        copyHandler.className = '';
    }
});

function mapRusToLat(text) {
    var resultStr = "";
    var inputStrLength = text.length;
    var i = 0;
    var letterIndex;
    var cyrillicLetters = " 1234567890-=!\"№;%:?*()_+йцукенгшщзхъфывапролджэ\/ячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭ/|ЯЧСМИТЬБЮ,";
    var latinLetters = " 1234567890-=!@#$%^&*()_+qwertyuiop[]asdfghjkl;'\<zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:\"|>ZXCVBNM<>?";

    for (i; i < inputStrLength; i++) {
        letterIndex = cyrillicLetters.indexOf(text[i]);
        if (letterIndex === -1) {
            throw 'Bad input data';
        }
        resultStr += latinLetters[letterIndex];
    }

    return resultStr;
}
