$(document).ready(function() {
    $(".burger").on("click", function(e) {
        e.preventDefault();
        $("#burger-button").toggleClass("open");
    });
    $(".calc").on("click", function() {
        var m = $(".m").val();
        var n = $(".n").val();
        var result = n * Math.log2(m);
        $(".result1").text("Результат: " + result);
    });
    $(document).ready(function() {
        $('.scrollspy').scrollSpy();
    });
    $("#burger-button").sideNav();

    $(".parseButton").on("click", function() {
        $(".symbolsKeys").text("");

        //text parcer
        var text = $(".text").val();
        var textParsed = text.toLowerCase();
        textParsed = textParsed.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
        var str = textParsed;
        var hist = {};
        for (var si in str) {
            hist[str[si]] = hist[str[si]] ? 1 + hist[str[si]] : 1;
        }

        //text length
        var symbols = textParsed.length;
        $(".length").text("Всего символов: " + symbols);

        //unic symblos
        var unicSymbols = Object.keys(hist).length;
        $(".unicSymbols").text("Уникальных символов: " + unicSymbols);

        //Symbol:amount
        var keys = [];
        for (var k in hist) {
            if (hist.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        var values = Object.values(hist);
        var valuesPercent = [];
        for (var i = 0; i < keys.length; i++) {
            valuesPercent.push(values[i] / symbols);
        }
        for (i = 0; i < keys.length; i++) {
            k = keys[i];
            $(".symbolsKeys").append(k + ":" + hist[k] + "<br>");
        }

        //element entropy calc
        var entropy = [];
        for (var i = 0; i < valuesPercent.length; i++) {
            entropy.push(valuesPercent[i] * Math.log2(1 / valuesPercent[i]));
        }

        //entropy sum
        var entropyResult = 0;
        for (var i = 0; i < entropy.length; i++) {
            entropyResult = entropyResult + entropy[i];
        }
        $(".entropy").text("Энтропия по Шеннону: " + entropyResult);
    });

    $('.cryptButton').on('click', function() {
        var alice = $('.alice').val();
        var bob = $('.bob').val();
        var key = $('.key').val();

        var a = Math.pow(2, alice) % key;
        var b = Math.pow(2, bob) % key;

        var aRes = Math.pow(b, alice) % key;
        var bRes = Math.pow(a, bob) % key;

        $('.forAlice').text('Открытый ключ Alice: '+ a)
        $('.forBob').text('Открытый ключ Bob: '+ b)
        $('.cryptResultA').text('Закрытый ключ Alice: '+ aRes)
        $('.cryptResultB').text('Закрытый ключ Bob: '+ bRes)
    })

});
