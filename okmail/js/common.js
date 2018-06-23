AOS.init();
var dappAddress = "n1gGBTN9a8zcvVGKpNMxSrvzM6i7YuNPaCh";

var NebPay = require("nebpay");
var nebPay = new NebPay();

/** Preload shared songs */
function getAccount() {
    var args = '';
    var func = "getAccount";
    nebPay.simulateCall(dappAddress, 0, func, args, {
        listener: getAccountResp
    });
}

function getAccountResp(resp) {
    if (resp.result != "Error: You haven't created account yet.") {
        Vue.set(app, 'activeItem', 'dashboard')
        var result = resp.result
        result = result.replace(/^"(.+(?="$))"$/, '$1');

        Vue.set(app, 'accountName', result)
    }
}

function loadMail() {
    var args = '';
    var func = "loadMail";
    nebPay.simulateCall(dappAddress, 0, func, args, {
        listener: loadMailResp
    });
}

function loadMailResp(resp) {
    if (resp.result != "Error: You haven't created account yet.") {
        var result = eval(JSON.parse(resp.result));
        var spam = []
        var marked = []
        for (var i = 0; i < result.inbox.length; i++) {
            if (result.inbox[i].isSpam === true) {
                spam.push(result.inbox[i])
            } else if (result.inbox[i].isMarked === true) {
                marked.push(result.inbox[i])
            }
        }
        Vue.set(app, 'spam', spam)
        Vue.set(app, 'marked', marked)
        Vue.set(app, 'mail', result)
    }
}

function getContacts() {
    var args = '';
    var func = "getContacts";
    nebPay.simulateCall(dappAddress, 0, func, args, {
        listener: getContactsResp
    });
}

function getContactsResp(resp) {
    if (resp.result != "Error: You haven't created account yet.") {
        var result = eval(JSON.parse(resp.result));
        Vue.set(app, 'contacts', result)
    }
}
getContacts()
loadMail()
getAccount()

function loadData() {
    loadMail()
    getAccount()
    getContacts()
}

setInterval(function() {
    loadData()
}, 10000)


var args = ""
var currId = ""


function createAccount() {
    var name = $('.createAccount').val()
    var args2 = '[' + '"' + name + '"' + ']';
    var func = "createAccount";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: createAccountResp
    });
}

function createAccountTrue() {
    var name = $('.createAccount').val()
    var args2 = '[' + '"' + name + '"' + ']';
    var func = "createAccount";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: createAccountRespTrue
    });
}

function createAccountResp(resp) {
    if (
        resp.result === "Error: Name must contain at least 1 symbol." || resp.result === "Error: You have already created account." || resp.result === "Error: This name is already taken."
    ) {

        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $(".notify").text(resp.result);
    } else {
        createAccountTrue();
    }
}

function createAccountRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $(".notify").text("You have succefully created mailbox.");
    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
    }

}


function removeAccount() {
    var args2 = '[' + '"' + '"' + ']';
    var func = "removeAccount";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: removeAccountResp
    });
}

function removeAccountTrue() {
    var args2 = '[' + '"' + '"' + ']';
    var func = "removeAccount";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: removeAccountRespTrue
    });
}

function removeAccountResp(resp) {
    if (
        resp.result === "Error: You haven't created account yet."
    ) {

        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $(".notify").text(resp.result);
    } else {
        removeAccountTrue();
    }
}

function removeAccountRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $(".notify").text("Your account has beed succefully deleted.");
    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
    }

}


function clickAddSpam(id) {
    currId = id
    toggleSpamById();
}

function toggleSpamById() {
    var args2 = '["' + currId + '"]';
    var func = "toggleSpamById";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: toggleSpamByIdResp
    });
}

function toggleSpamByIdTrue() {
    var args2 = '["' + currId + '"]';
    var func = "toggleSpamById";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: toggleSpamByIdRespTrue
    });
}

function toggleSpamByIdResp(resp) {
    $('.notify-wrapper').removeClass('hide')
    if (
        resp.result === "Error: You haven't created account yet."
    ) {
        $('.notify').addClass('--fail')
        $('.notify').text(resp.result);
    } else {
        toggleSpamByIdTrue();
    }
}

function toggleSpamByIdRespTrue(resp) {

    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $('.notify').text("Message has beed succefully added to spam.");

    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
    }

}





function clickRemoveContact(id) {
    currId = id
    removeContact();
}

function removeContact() {
    var args2 = '["' + currId + '"]';
    var func = "removeContact";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: removeContactTrueResp
    });
}

function removeContactTrue() {
    var args2 = '["' + currId + '"]';
    var func = "removeContact";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: removeContactTrueRespTrue
    });
}

function removeContactResp(resp) {
    $('.notify-wrapper').removeClass('hide')
    if (
        resp.result === "Error: You haven't created account yet."
    ) {
        $('.notify').addClass('--fail')
        $('.notify').text(resp.result);
    } else {
        removeContactTrue();
    }
}

function removeContactRespTrue(resp) {

    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $('.notify').text("Message has beed succefully added to spam.");
    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
    }

}

function clickAddMark(id) {
    currId = id
    toggleMarkById();
}

function toggleMarkById() {
    var args2 = '["' + currId + '"]';
    var func = "toggleMarkById";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: toggleMarkByIdResp
    });
}

function toggleMarkByIdTrue() {
    var args2 = '["' + currId + '"]';
    var func = "toggleMarkById";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: toggleMarkByIdRespTrue
    });
}

function toggleMarkByIdResp(resp) {
    $('.notify-wrapper').removeClass('hide')
    if (
        resp.result === "Error: You haven't created account yet."
    ) {
        $('.notify').addClass('--fail')
        $('.notify').text(resp.result);
    } else {
        toggleMarkByIdTrue();
    }
}

function toggleMarkByIdRespTrue(resp) {

    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $('.notify').text("Message has beed succefully marked.");
        Vue.set(app, 'deposit', true)
    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
    }

}

function clickDelMsg(id) {
    currId = id
    delMsgById();
}

function delMsgById() {
    var args2 = '["' + currId + '"]';
    var func = "delMsgById";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: delMsgByIdResp
    });
}

function delMsgByIdTrue() {
    var args2 = '["' + currId + '"]';
    var func = "delMsgById";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: delMsgByIdRespTrue
    });
}

function delMsgByIdResp(resp) {
    $('.notify-wrapper').removeClass('hide')
    if (
        resp.result === "Error: You haven't created account yet."
    ) {
        $('.notify').addClass('--fail')
        $('.notify').text(resp.result);
    } else {
        delMsgByIdTrue();
    }
}

function delMsgByIdRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $('.notify').text("Message has beed succefully succefully deleted.");
    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
    }
}

function closeNotify() {
    $('.notify-wrapper').addClass('hide')
    $('.notify').removeClass('--fail')
}


function sendMessage() {
    var to = $('.send-to').val()
    var title = $('.send-title').val()
    var text = $('.send-text').val()
    var args2 = '[' + '"' + to + '",' + '"' + title + '",' + '"' + text + '"' + ']';
    var func = "sendMessage";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: sendMessageResp
    });
}

function sendMessageTrue() {
    var to = $('.send-to').val()
    var title = $('.send-title').val()
    var text = $('.send-text').val()
    var args2 = '[' + '"' + to + '",' + '"' + title + '",' + '"' + text + '"' + ']';
    var func = "sendMessage";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: sendMessageRespTrue
    });
}

function sendMessageResp(resp) {
    if (
        resp.result === "Error: You haven't created account yet." || resp.result === "This recipient doesn't exist."
    ) {

        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $(".notify").text(resp.result);
    } else {
        sendMessageTrue();
    }
}

function sendMessageRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $(".notify").text("Your message has been succefully sent.");
    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
    }

}




function addContact() {
    var contact = $('.new-contact').val()
    var args2 = '[' + '"' + contact +'"' + ']';
    var func = "addContact";
    nebPay.simulateCall(dappAddress, 0, func, args2, {
        listener: addContactResp
    });
}

function addContactTrue() {
    var contact = $('.new-contact').val()
    var args2 = '[' + '"' + contact +'"' + ']';
    var func = "addContact";
    nebPay.call(dappAddress, 0, func, args2, {
        listener: addContactRespTrue
    });
}

function addContactResp(resp) {
    if (
        resp.result === "Error: You haven't created account yet." || resp.result === "Error: Account with this name doesn't exist"
    ) {

        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $(".notify").text(resp.result);
    } else {
        addContactTrue();
    }
}

function addContactRespTrue(resp) {
    if (resp != "Error: Transaction rejected by user") {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').removeClass('--fail')
        $(".notify").text("Contact succefully added.");
    } else {
        $('.notify-wrapper').removeClass('hide')
        $('.notify').addClass('--fail')
        $('.notify').text("You have rejected transaction.");
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
        preview: 'inbox',
        current: 'start',
        currentId: 0,
        balance: '',
        expDate: '',
        webExt: false,
        name: '',
        withdraw: false,
        deposit: false,
        isLoading: true,
        accountName: '',
        mail: '',
        marked: '',
        spam: '',
        contacts: ''
    },

    methods: {

    }
})

app.$mount("#app")