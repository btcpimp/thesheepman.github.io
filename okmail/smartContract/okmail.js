"use strict";
var okmail = function() {
    LocalContractStorage.defineMapProperty(this, "account")
    LocalContractStorage.defineMapProperty(this, "names")
    LocalContractStorage.defineMapProperty(this, "mail")
    LocalContractStorage.defineMapProperty(this, "contacts")
    LocalContractStorage.defineProperty(this, "mailCounter", null)
}

okmail.prototype = {
    init: function() {
        this.mailCounter = 0
    },
    createAccount: function(name) {
        var from = Blockchain.transaction.from;
        name = name.trim() + "@okmail";
        if (name === "") {
            throw new Error("Name must contain at least 1 symbol.");
        }
        if (this.account.get(from)) {
            throw new Error("You have already created account.");
        }
        if (this.names.get(name)) {
            throw new Error("This name is already taken.");
        }
        this.names.set(name, from)

        this.account.set(from, name)

        from = this.account.get(from)
        this.mail.set(from, { inbox: [], outbox: [] })
        this.contacts.set(from, { contactList: [] })
        return true
    },
    getAccount: function() {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        return this.account.get(from)
    },
    removeAccount: function() {
        var from = Blockchain.transaction.from;
        if (this.account.get(from)) {
            var accountName = this.account.get(from)
            this.account.del(from)
            this.names.del(accountName)
            this.mail.del(accountName)
            this.contacts.del(accountName)
            return true
        } else {
            throw new Error("You haven't created account yet.");
        }
    },
    sendMessage: function(to, title, text) {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        if (!this.names.get(to)) {
            throw new Error("This recipient doesn't exist.");
        }
        var date = new Date();
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        date = day + ' ' + monthNames[monthIndex] + ' ' + year;

        from = this.account.get(from)
        var mailCounter = new BigNumber(this.mailCounter).plus(1)

        this.mailCounter = mailCounter

        var inboxFrom = this.mail.get(from).inbox
        var outboxFrom = this.mail.get(from).outbox

        var inboxTo = this.mail.get(to).inbox
        var outboxTo = this.mail.get(to).outbox

        var msg = {
            id: mailCounter,
            from: from,
            to: to,
            title: title,
            text: text,
            date: date,
            isSpam: false,
            isMarked: false
        }

        inboxTo.push(msg)
        outboxFrom.push(msg)

        this.mail.set(from, { inbox: inboxFrom, outbox: outboxFrom })
        this.mail.set(to, { inbox: inboxTo, outbox: outboxTo })

        return true
    },
    loadMail: function() {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        from = this.account.get(from)

        return this.mail.get(from)

    },
    delMsgById: function(msgId) {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        from = this.account.get(from)

        var inboxFrom = this.mail.get(from).inbox
        var outboxFrom = this.mail.get(from).outbox

        if (inboxFrom.length > 0) {
            for (var i = 0; i < inboxFrom.length; i++) {

                if (inboxFrom[i].id === msgId) {
                    inboxFrom.splice(i, 1)
                    this.mail.set(from, { inbox: inboxFrom, outbox: outboxFrom })
                    return true
                }

            }
        }
        if (outboxFrom.length > 0) {
            for (var i = 0; i < outboxFrom.length; i++) {

                if (outboxFrom[i].id === msgId) {
                    outboxFrom.splice(i, 1)
                    this.mail.set(from, { inbox: inboxFrom, outbox: outboxFrom })
                    return true
                }

            }
        }

    },
    toggleSpamById: function(msgId) {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        from = this.account.get(from)

        var inboxFrom = this.mail.get(from).inbox
        var outboxFrom = this.mail.get(from).outbox

        if (inboxFrom.length > 0) {
            for (var i = 0; i < inboxFrom.length; i++) {

                if (inboxFrom[i].id === msgId) {
                    inboxFrom[i].isSpam = !inboxFrom[i].isSpam
                    this.mail.set(from, { inbox: inboxFrom, outbox: outboxFrom })
                    return true
                }

            }
        }
        if (outboxFrom.length > 0) {
            for (var i = 0; i < outboxFrom.length; i++) {

                if (outboxFrom[i].id === msgId) {
                    outboxFrom[i].isSpam = !outboxFrom[i].isSpam
                    this.mail.set(from, { inbox: inboxFrom, outbox: outboxFrom })
                    return true
                }

            }
        }


    },
    toggleMarkById: function(msgId) {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        from = this.account.get(from)


        var inboxFrom = this.mail.get(from).inbox
        var outboxFrom = this.mail.get(from).outbox

        if (inboxFrom.length > 0) {
            for (var i = 0; i < inboxFrom.length; i++) {

                if (inboxFrom[i].id === msgId) {
                    inboxFrom[i].isMarked = !inboxFrom[i].isMarked
                    this.mail.set(from, { inbox: inboxFrom, outbox: outboxFrom })
                    return true
                }

            }
        }
        if (outboxFrom.length > 0) {
            for (var i = 0; i < outboxFrom.length; i++) {

                if (outboxFrom[i].id === msgId) {
                    outboxFrom[i].isMarked = !outboxFrom[i].isMarked
                    this.mail.set(from, { inbox: inboxFrom, outbox: outboxFrom })
                    return true
                }

            }
        }


    },
    addContact: function(name) {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        from = this.account.get(from)
        if (this.names.get(name)) {
            var contactList = this.contacts.get(from).contactList
            contactList.push(name)
            this.contacts.set(from, { contactList: contactList })
            return true
        } else {
            throw new Error("Account with this name doesn't exist");
        }

    },
    removeContact: function(name) {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        from = this.account.get(from)
        var contactList = this.contacts.get(from).contactList

        if (contactList.length > 0) {
            for (var i = 0; i < contactList.length; i++) {

                if (contactList[i] === name) {
                    contactList.splice(i, 1)
                }

            }
            this.contacts.set(from, contactList)
            return true
        }
    },
    getContacts: function() {
        var from = Blockchain.transaction.from;
        if (!this.account.get(from)) {
            throw new Error("You haven't created account yet.");
        }
        from = this.account.get(from)
        return this.contacts.get(from).contactList
    }
}

module.exports = okmail