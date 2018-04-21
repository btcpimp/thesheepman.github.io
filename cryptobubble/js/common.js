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
        url: 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=1000',
        dataType: 'json',
        success: function(response2) {
            console.log('api cmc got')

        }
    });
}


var app = new Vue({

    beforeMount() {
        var self = this;
        // firebaseApi().then(function(response) {

        //Portfolio
        // for (var i = 0; i < self.length; i++) {
        //     self.coins.push(response[i].symbol)
        // }

        for (var i = 0; i < self.coins.length; i++) {


        }

        cmcApi().then(function(response2) {

            for (var i = 0; i < self.icos.length; i++) {
                for (var y = 0; y < response2.length; y++) {
                    if (response2[y].name === self.icos[i].name) {

                        self.icos[i].marketUsd = response2[y].price_usd
                        self.icos[i].marketBtc = response2[y].price_btc

                    }
                }
                if (self.icos[i].marketUsd === '') {
                    self.icos[i].roiusd = '???'
                    self.icos[i].roibtc = '???'
                    self.icos[i].marketUsd = self.icos[i].usdStart
                } else {
                    self.icos[i].roiusd = self.icos[i].marketUsd / self.icos[i].usdStart
                    self.icos[i].roiusd = self.icos[i].roiusd.toFixed(2)
                    self.icos[i].roibtc = self.icos[i].marketBtc / self.icos[i].btcStart
                    self.icos[i].roibtc = self.icos[i].roibtc.toFixed(2)

                }
            }

            for (var i = 0; i < self.coins.length; i++) {

                for (var x = 0; x < self.icos.length; x++) {
                    if (self.coins[i].name === self.icos[x].name) {
                        self.coins[i].symbol = self.icos[x].ticker
                        self.coins[i].price_usd = self.icos[x].marketUsd
                        self.coins[i].percent_change_24h = 0
                        self.coins[i].usdVal = self.coins[i].price_usd * self.coins[i].amount
                        self.coins[i].usdChange = 0;
                        self.totalUsd += self.coins[i].usdVal
                        self.coins[i].current_price = self.coins[i].price_usd + " (ICO Token Price)"
                    }

                }

                for (var y = 0; y < response2.length; y++) {


                    if (self.coins[i].name === response2[y].name) {
                        self.coins[i].symbol = response2[y].symbol
                        self.coins[i].rank = response2[y].rank
                        self.coins[i].price_usd = response2[y].price_usd
                        self.coins[i].percent_change_24h = response2[y].percent_change_24h
                        self.coins[i].current_price = self.coins[i].price_usd
                        self.coins[i].usdVal = response2[y].price_usd * self.coins[i].amount
                        self.coins[i].usdChange = self.coins[i].usdVal / 100 * self.coins[i].percent_change_24h

                        self.totalUsd += self.coins[i].usdVal

                    }
                }

            }
            //share
            for (var i = 0; i < self.coins.length; i++) {
                self.coins[i].share = self.coins[i].usdVal / self.totalUsd * 100
                self.coins[i].share = self.coins[i].share.toFixed(2)

                self.coins[i].pl24 = self.coins[i].usdChange / self.totalUsd * 100
                self.change24fin += self.coins[i].pl24

                if (self.coins[i].percent_change_24h > 0) {
                    self.coins[i].change24Color = '#1f993b'
                } else if (self.coins[i].percent_change_24h < 0) {
                    self.coins[i].change24Color = '#ff5959'
                }
                console.log(self.coins[i].share)
            }

            //Portfolio 24h change
            self.change24fin = self.change24fin.toFixed(2)

            if (self.change24fin > 0) {
                self.activeColor = '#1f993b'
            } else {
                self.activeColor = '#ff5959'
            }

            console.log(self.change24fin)

            //ICO

        })




        // }, function(error) {});

    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 1500)
    },

    data: {
        activeItem: 'portfolio',
        symbol: '',
        change24fin: 0,
        coins: [{
                "name": "Nebulas",
                "amount": 73
            }, {
                "name": "POA Network",
                "amount": 176
            }, {
                "name": "Fusion",
                "amount": 137
            }, {
                "name": "EOS",
                "amount": 37
            }, {
                "name": "Wanchain",
                "amount": 18.7
            }, {
                "name": "Bitcoin",
                "amount": 0.034,
            }, {
                "name": "Ethereum",
                "amount": 0.31
            },
            {
                "name": "Dether",
                "amount": 670
            },
            {
                "name": "Block Collider",
                "amount": 3780
            },
            {
                "name": "YGGDRASH",
                "amount": 18376
            },
            {
                "name": "Lendingblock",
                "amount": 7830
            },
            {
                "name": "Endor",
                "amount": 528
            },
            {
                "name": "Sapien Network",
                "amount": 245
            }

        ],
        totalUsd: 0,
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
                marketUsd: '',
                marketBtc: '',
                btcStart: '',
                usdStart: '',
                roiusd: '',
                roibtc: ''
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
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00000936',
                usdStart: '0.0749',
                roiusd: '',
                roibtc: ''

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
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00000246',
                usdStart: '0.0200',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'Endor',
                status: 'Ended',
                title: 'Hybrid Intellingence',
                url: 'https://www.endor.com',
                whitepaper: 'https://daks2k3a4ib2z.cloudfront.net/59f19167ffa06300013b3a69/5a5e56d3f1856e00018225b0_Endor_Coin_WP.pdf',
                date: '19 FEB – 14 MAR',
                ticker: 'EDR',
                icoprice: '1 EDR = 0.27 USD',
                fundgoal: '45,000,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00002842',
                usdStart: '0.27',
                roiusd: '',
                roibtc: ''
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
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00000082',
                usdStart: '0.0076',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'TomoChain',
                status: 'Ended',
                title: 'Blockchain',
                url: 'https://tomocoin.io',
                whitepaper: 'https://drive.google.com/file/d/1EAs7llLOpQx3YH1onvC4Qb107sIiztcm/view',
                date: '1 MAR - 2 MAR',
                ticker: 'TOMO',
                icoprice: '1 TOMO = 0.25 USD',
                fundgoal: '8,500,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00002384759',
                usdStart: '0.25',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'Dether',
                status: 'Ended',
                title: 'Payments',
                url: 'https://dether.io',
                whitepaper: 'https://whitepaper.dether.io/',
                date: '7 FEB – 9 FEB',
                ticker: 'DTH',
                icoprice: '1 ÐTH = 0.23 USD (0.00026 ETH)',
                fundgoal: '13,400,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00002875',
                usdStart: '0.23',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'Arcblock',
                status: 'Ended',
                title: 'Blockchain Service',
                url: 'https://www.arcblock.io',
                whitepaper: 'https://www.arcblock.io/file/whitepaper/WhitePaperEnV2_en-US.pdf?v=2',
                date: '4 FEB',
                ticker: 'ABT',
                icoprice: '1 ABT = 0.50 USD (0.00053 ETH)',
                fundgoal: '45,000,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00005882',
                usdStart: '0.5',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'Fusion',
                status: 'Ended',
                title: 'Blockchain',
                url: 'https://fusion.org',
                whitepaper: 'https://fusion.org/Content/files/FUSION%20Whitepaper%20V1.0.3.pdf',
                date: '1 FEB – 11 FEB',
                ticker: 'FSN',
                icoprice: '42,200,000 USD (51,200 ETH)',
                fundgoal: '45,000,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00025121',
                usdStart: '2.06',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'Sapien Network',
                status: 'Ended',
                title: 'Social Network',
                url: 'https://www.sapien.network',
                whitepaper: 'https://www.sapien.network/assets/SPNv1_3.pdf',
                date: '31 JAN - 15 FEB',
                ticker: 'SPN',
                icoprice: '1 SPN = 0.11 USD',
                fundgoal: '30,000,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00001294',
                usdStart: '0.11',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'DADI',
                status: 'Ended',
                title: 'Cloud Storage',
                url: 'https://dadi.cloud',
                whitepaper: 'https://docs.google.com/document/d/1t6Sn6uea6UJW4IBxTbSTsTMEzZD3NRtX6Sw6wnf69q4/edit',
                date: '29 JAN',
                ticker: 'DADI',
                icoprice: '1 DADI = 0.50 USD',
                fundgoal: '29,000,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.00004587',
                usdStart: '0.5',
                roiusd: '',
                roibtc: ''
            },
            {
                name: 'BitClave',
                status: 'Ended',
                title: 'Blockchain Service',
                url: 'https://www.bitclave.com',
                whitepaper: 'https://docsend.com/view/j3sp3mh',
                date: '29 NOV – 29 NOV',
                ticker: 'CAT',
                icoprice: '1 CAT = 0.1000 USD',
                fundgoal: '25,500,000 USD',
                marketUsd: '',
                marketBtc: '',
                btcStart: '0.000009',
                usdStart: '0.1',
                roiusd: '',
                roibtc: ''
            }
        ]
    },
    // firebase: {
    //     coins: db.ref("coins")
    // },
    methods: {


    }
})

app.$mount("#app")