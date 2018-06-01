"use strict";
var oktopus = function() {
    LocalContractStorage.defineMapProperty(this, "bank")
    LocalContractStorage.defineMapProperty(this, "account")
    LocalContractStorage.defineProperty(this, "ranksCounter", null)
}

oktopus.prototype = {
    init: function() {
        this.songsCounter = 0
    },
    createBank: function(name, date, month, year) {
        var from = Blockchain.transaction.from;
        name = name.trim();
        if (name === "") {
            throw new Error("Name must contain at least 1 symbol.");
        }
        if (this.account.get(from)) {
            throw new Error("You have already setup a timer");
        } else {
            var expDate = date + '/' + month + '/' + year
        }
        if (expDate.match(/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/)) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (yyyy > year) {
                throw new Error("you must enter a future date");

            } else if (yyyy === year && mm > month) {
                throw new Error("you must enter a future date");
            } else if (yyyy === year && mm === month && dd > date) {
                throw new Error("you must enter a future date");
            }
            this.account.set(from, { name: name, expDate: expDate, day: date, month: month, year: year })
            var startAmount = new BigNumber(0)
            this.bank.set(from, startAmount)
            return true

        } else {
            throw new Error("Enter date in a dd/mm/yyyy format.");
        }
    },
    addFunds: function() {
        var from = Blockchain.transaction.from;
        var value = Blockchain.transaction.value;
        if (!this.account.get(from)) {
            throw new Error("You haven't created vault yet.");
        }
        if (value <= 0) {
            throw new Error("Your deposit must be more than 0.");
        }

        var newDepo = value.plus(this.bank.get(from))
        this.bank.del(from)
        this.bank.set(from, newDepo)
        return true
    },
    withdraw: function() {
        var from = Blockchain.transaction.from;

        if (this.account.get(from)) {
            if (this.bank.get(from) > 0) {

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!

                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                if (yyyy < this.account.get(from).year) {
                    throw new Error("You should wait until " + this.account.get(from).expDate);

                } else if (yyyy === this.account.get(from).year && mm < this.account.get(from).month) {
                    throw new Error("You should wait until " + this.account.get(from).expDate);

                } else if (yyyy === this.account.get(from).year && mm === this.account.get(from).month && dd < this.account.get(from).day) {
                    throw new Error("You should wait until " + this.account.get(from).expDate);
                }

                var amount = new BigNumber(this.bank.get(from))
                var result = Blockchain.transfer(from, amount);
                if (!result) {
                    throw new Error("transfer failed.");
                }
                this.account.del(from)
                this.bank.del(from)
                return true
            } else {
                throw new Error("You didnt't add funds yet.");
            }
        } else {
            throw new Error("You haven't created vault yet.");
        }
    },
    getBalance: function() {
        var from = Blockchain.transaction.from;
        if (this.bank.get(from)) {
            return this.bank.get(from)
        } else {
            throw new Error("You haven't created vault yet.");
        }

    },
    getInfo: function() {
        var from = Blockchain.transaction.from;
        if (this.account.get(from)) {
            return this.account.get(from)
        } else {
            throw new Error("You haven't created vault yet.");
        }

    }
}

module.exports = oktopus