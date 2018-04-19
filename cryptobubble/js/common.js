"use strict"

Vue.use(VueMaterial.default)

var config = {
    apiKey: "AIzaSyAX3rbI_9JvYwFGQHsSZm7OdVud5CAlqfA",
    authDomain: "crypto-bubble.firebaseapp.com",
    databaseURL: "https://crypto-bubble.firebaseio.com",
    projectId: "crypto-bubble",
    storageBucket: "crypto-bubble.appspot.com",
    messagingSenderId: "966710373382"
};
var firebase = firebase.initializeApp(config);
var db = firebase.database()
var coinsRef = db.ref('coins');

var firebaseApi = function() {
    return $.ajax({
        type: 'get',
        url: 'https://crypto-bubble.firebaseio.com/coins.json',
        dataType: 'json',
        success: function(response) {
            console.log('api firebase got')

        }
    });
}

var cmcApi = function() {
    return $.ajax({
        type: 'get',
        url: 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=200',
        dataType: 'json',
        success: function(response2) {
            console.log('api cmc got')

        }
    });
}


var app = new Vue({

    beforeMount() {
        var self = this;
        firebaseApi().then(function(response) {

            for (i = 0; i < response.length; i++) {
                self.coins.push(response[i].symbol)
            }

            cmcApi().then(function(response2) {
                for (var i = 0; i < self.coins.length; i++) {
                    for (var y = 0; y < response2.length; y++) {
                        if (response2[y].symbol === self.coins[i]) {
                            self.coinsParsedArray.push(response2[y])
                            self.change24.push(parseInt(response2[y].percent_change_24h))
                        }
                    }
                }

                for (x = 0; x < self.change24.length; x++) {
                    self.change24fin += self.change24[x] / self.change24.length
                }
                self.change24fin = self.change24fin.toFixed(2)
                if (self.change24fin > 0) {
                    self.activeColor = '#1f993b'
                } else {
                    self.activeColor = '#ff5959'
                }
                console.log(self.change24fin)
            })




        }, function(error) {});

    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 1500)
    },

    data: {
        activeItem: 'portfolio',
        symbol: '',
        qw: [],
        change24: [],
        change24fin: 0,
        coins: [],
        activeColor: '',
        isLoading: true,
        coinsParsedArray: [],
        icos: [{
                name: 'Neonexchange',
                status: 'Upcoming',
                title: 'Exchange',
                url: 'https://neonexchange.org',
                whitepaper: 'https://neonexchange.org/pdfs/whitepaper_v2.pdf',
                date: '30 APRIL',
                ticker: 'NEX',
                icoprice: '1 NEX = 1.00 USD',
                fundgoal: '25,000,000 USD',
                roiusd: 'Pending'
            },
            {
                name: 'Block Collider',
                status: 'Ended',
                title: 'Blockchain Service',
                url: 'https://www.blockcollider.org',
                whitepaper: 'https://s3.amazonaws.com/blockcollider/blockcollider_wp.pdf',
                date: '13 APR - 16 APR',
                ticker: 'EMB',
                icoprice: '1 EMB = 0.0749 USD (0.00015 ETH)',
                fundgoal: '7,000,000 USD',
                roiusd: 'Pending'
            },
            {
                name: 'Lendingblock',
                status: 'Ended',
                title: 'Finance',
                url: 'https://lendingblock.com',
                whitepaper: 'https://whitepaper.lendingblock.com/#abstract',
                date: '15 APR - 18 APR',
                ticker: 'LND',
                icoprice: '1 LND = 0.0200 USD',
                fundgoal: '10,000,000 USD',
                roiusd: 'Pending'
            },
            {
                name: 'YGGDRASH',
                status: 'Ended',
                title: 'Blockchain',
                url: 'https://yggdrash.io',
                whitepaper: 'http://cdn.yggdrash.io/docs/Yggdrash_WhitePaper_En.pdf',
                date: '12 MAR - 13 MAR',
                ticker: 'YEED',
                icoprice: '1 YEED = 0.0076 USD (0.00001 ETH)',
                fundgoal: '40,000,000 USD',
                roiusd: 'Pending'
            }
        ]
    },
    // firebase: {
    //     coins: db.ref("coins")
    // },
    methods: {
        // cmcApi: function() {
        //     this.$http.get('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=200').then(function(data) {
        //         this.parseCoins();
        //         for (var i = 0; i < coinsParsed.length; i++) {
        //             for (var y = 0; y < data.body.length; y++) {
        //                 if (data.body[y].symbol === coinsParsed[i]) {
        //                     coinsParsedArray.push(data.body[y])

        //                     var price = data.body[y].price_usd
        //                     price = parseFloat(price).toFixed(2)
        //                     // console.log(coinsParsedArray)
        //                 }
        //             }
        //         }
        //         this.qwe()
        //     })
        // },

        // qwe: function() {
        //     qw = coinsParsedArray
        //     console.log(qw)
        // }

    }
})

app.$mount("#app")