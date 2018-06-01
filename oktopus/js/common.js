AOS.init();
var dappAddress = "n1iY3s1mMqdRzHwo8ieKCPG2QjYDGz9tUHt";

var NebPay = require("nebpay");
var nebPay = new NebPay();
if (typeof(webExtensionWallet) === "undefined") {

    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");
    window.addEventListener('message', function(e) {
        // e.detail contains the transferred data (can
        console.log("recived by page:" + e + ", e.data:" + JSON.stringify(e.data));
        if (!!e.data.data) {
            $('.account-address').text(e.data.data.account)
        }
    });
} else {


}


var isWithdraw = false
var isDeposit = false
/** Preload shared songs */
function getBalance() {
    var args = '';
    var func = "getBalance";
    nebPay.simulateCall(dappAddress, 0, func, args, {
        listener: getBalanceResp
    });
}

function getBalanceResp(resp) {
    if (resp.result != "Error: You haven't created vault yet.") {
        var result = eval(JSON.parse(resp.result));
        result = result / 1000000000000000000
        Vue.set(app, 'balance', result)
        if (result <= 0) {
            isWithdraw = false
            Vue.set(app, 'withdraw', false)
        } else {
            isWithdraw = true
            Vue.set(app, 'withdraw', true)
        }
    } else {
        Vue.set(app, 'balance', 0)
    }
}

function getInfo() {
    var args = '';
    var func = "getInfo";
    nebPay.simulateCall(dappAddress, 0, func, args, {
        listener: getInfoResp
    });
}

function getInfoResp(resp) {
    if (resp.result != "Error: You haven't created vault yet.") {
        var result = eval(JSON.parse(resp.result));
        Vue.set(app, 'name', result.name)
        Vue.set(app, 'expDate', result.expDate)
        if (result.name = '') {
            Vue.set(app, 'deposit', false)
            isDeposit = false
        } else {
            Vue.set(app, 'deposit', true)
            isDeposit = true
        }
    } else {
        return false
    }
}


getInfo()
getBalance()

var args = ""



function createMoneybox() {


    createBank();
}


function createBank() {
    var inputDate = $('.md-input').val()
    var name = $('.moneybox-name').val()
    var date = new Date(inputDate);

    var month = date.getMonth() + 1
    var day = date.getDate()
    var year = date.getFullYear()
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    var args2 = '[' + '"' + name + '",' + '"' + day + '",' + '"' + month + '",' + '"' + year + '"' + ']';
    var func = "createBank";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: createBankResp
    });
}

function createBankTrue() {
    var inputDate = $('.md-input').val()
    var name = $('.moneybox-name-input').val()
    var date = new Date(inputDate);

    var month = date.getMonth() + 1
    var day = date.getDate()
    var year = date.getFullYear()
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var args2 = '[' + '"' + name + '",' + '"' + day + '",' + '"' + month + '",' + '"' + year + '"' + ']';
    var func = "createBank";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: createBankRespTrue
    });
}

function createBankResp(resp) {
    if (
        resp.result === "Error: Name must contain at least 1 symbol." || resp.result === "Error: You have already setup a timer" || resp.result === "Error: you must enter a future date" || resp.result === "Error: Enter date in a dd/mm/yyyy format."
    ) {

        $('.add-tooltip').removeClass('hide')
        $('.add-tooltip').addClass('--fail')
        $(".add-tooltip").text(resp.result);
    } else {
        createBankTrue();
    }
}

function createBankRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.add-tooltip').removeClass('hide')
        $('.add-tooltip').removeClass('--fail')
        $(".add-tooltip").text("You have succefully created moneybox.");
        Vue.set(app, 'deposit', true)
    } else {
        $('.add-tooltip').removeClass('hide')
        $('.add-tooltip').addClass('--fail')
        $('.add-tooltip').text("You have rejected transaction.");
    }

}

function deposit() {

    addFunds()
}


function depoActivate(event) {
    if (isDeposit === true) {
        getInfo()
        getBalance()
        Vue.set(app, 'activeItem', 'deposit')
    } else {
        return false
    }

}

function withdrawActivate() {
    if (isWithdraw === true) {
        getInfo()
        getBalance()
        Vue.set(app, 'activeItem', 'withdraw')
    } else {
        return false
    }
}

function addFunds() {
    var inputDate = $('.deposit').val().trim()
    var args2 = ''
    var func = "addFunds";
    nebPay.simulateCall(dappAddress, inputDate, func, args2, {
        listener: addFundsResp
    });
}

function addFundsTrue() {
    var inputDate = $('.deposit').val().trim()
    var args2 = ''
    var func = "addFunds";
    nebPay.call(dappAddress, inputDate, func, args2, {
        listener: addFundsRespTrue
    });
}

function addFundsResp(resp) {
    if (
        resp.result === "Error: You haven't created vault yet." || resp.result === 'Error: Your deposit must be more than 0.'
    ) {
        $('.deposit-tooltip').removeClass('hide')
        $('.deposit-tooltip').addClass('--fail')
        $(".deposit-tooltip").text(resp.result);
    } else {
        addFundsTrue();
    }
}

function addFundsRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.deposit-tooltip').removeClass('hide')
        $('.deposit-tooltip').removeClass('--fail')
        $(".deposit-tooltip").text("You have succefully deposit NAS.");
        Vue.set(app, 'withdraw', true)
        isWithdraw = true
    } else {
        $('.deposit-tooltip').removeClass('hide')
        $('.deposit-tooltip').addClass('--fail')
        $('.deposit-tooltip').text("You have rejected transaction.");
    }


}


function withdrawFunds() {

    withdraw();

}

function withdraw() {
    var args2 = ''
    var func = "withdraw";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: withdrawResp
    });
}

function withdrawTrue() {
    var args2 = ''
    var func = "withdraw";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: withdrawRespTrue
    });
}

function withdrawResp(resp) {
    if (
        resp.result != "true"
    ) {
        $('.withdraw-tooltip').removeClass('hide')
        $('.withdraw-tooltip').addClass('--fail')
        $(".withdraw-tooltip").text(resp.result);
    } else {
        withdrawTrue();
    }
}

function withdrawRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.withdraw-tooltip').removeClass('hide')
        $('.withdraw-tooltip').removeClass('--fail')
        $(".withdraw-tooltip").text("You have succefully withdraw NAS.");
        Vue.set(app, 'deposit', false)
        isWithdraw = false
        isDeposit = false
        setTimeout(Vue.set(app, 'withdraw', false), 5000)
        getInfo()
        getBalance()
    } else {
        $('.withdraw-tooltip').removeClass('hide')
        $('.withdraw-tooltip').addClass('--fail')
        $('.withdraw-tooltip').text("You have rejected transaction.");
    }


}
Vue.use(VueMaterial.default)

var app = new Vue({

    beforeMount() {


    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 1500)
    },

    data: {
        songs: [],
        activeItem: 'start',
        balance: '',
        expDate: '',
        webExt: false,
        name: '',
        withdraw: false,
        deposit: false,
        isLoading: true
    },

    methods: {

    }
})

app.$mount("#app")