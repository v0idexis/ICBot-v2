require("dotenv").config();
const venom = require('venom-bot');
const { help } = require("./Features/help");
const { getPriceCrypto, CryptoMmi } = require("./Features/crypto");
const { stockPrice, stockMMI } = require("./Features/stock");
const weather = require("./Features/weather");
const { scrapeVOL } = require("./Features/getvol");
const { exr, currencycodes } = require("./Features/exchangerate");
const { gold, silver } = require("./Features/gold_silver");
const { getnews } = require("./Features/news");
// const getgainers = require("./Features/gainers");
// const prefix = "/";


venom
    .create({
        session: 'session' //name of session
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {
    client.onMessage(async (message) => {
        const command = message.body.slice(1).trim().split(/ +/).shift().toLowerCase();
        const args = message.body.trim().split(/ +/).slice(1);
        // const isCmd = message.body.startsWith(prefix);
        if (message.body === 'Hi' && message.isGroupMsg === false) {
            client
                .sendText(message.from, `Welcome to ICBot, start with /help`)
                .then((result) => {
                    // console.log('Result: ', result); //return object success
                    // console.log(message);
                    console.log(args);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
        switch (command) {
            case "hello": {
                client
                    .sendText(message.from, `hello`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "hi": {
                // reply(`HI ${username}`);
                client
                    .sendText(message.from, `hi`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "help": {
                let s = await help();
                client
                    .sendText(message.from, s)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }

            case "news": {
                let newsObj = await getnews()
                let news = newsObj[0];
                let imgurl = newsObj[1];
                // await conn.sendMessage(from, { url: imgurl }, image, {
                //     mimetype: Mimetype.png,
                //     caption: news + "\n~ICBot",
                // });
                console.log(await getnews());
                await client
                    .sendImage(
                        message.from,
                        imgurl,
                        'poster',
                        `${news}`
                    )
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "crypto": {
                let coin = args[0];
                let s1 = await getPriceCrypto(coin);
                await client
                    .sendText(message.from, `${s1}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "crypto_mmi": {
                let s2 = await CryptoMmi();
                await client
                    .sendImage(
                        message.from,
                        'https://alternative.me/crypto/fear-and-greed-index.png',
                        'poster',
                        `${s2}`
                    )
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }

            case "stocks": {
                let s3 = await stockPrice(args[0].toUpperCase());
                // reply(`${s3}`);
                await client
                    .sendText(message.from, `${s3}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "stock_mmi": {
                let s4 = await stockMMI();
                // reply(`${s4}`);
                await client
                    .sendText(message.from, `${s4}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "weather": {
                let location = args[0];
                let getweather = await weather(location);
                // reply(getweather);
                await client
                    .sendText(message.from, `${getweather}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "exr": {
                if (!args[0]) {
                    client
                        .sendText(message.from, `provide atleast two arguement`)
                        .then((result) => {
                            console.log('Result: ', result); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                }
                if (args[0] && !args[1]) {
                    client
                        .sendText(message.from, `provide secound arguement`)
                        .then((result) => {
                            console.log('Result: ', result); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                }
                let arguement = args;
                let data = await exr(arguement);
                // reply(data);
                client
                    .sendText(message.from, `${data}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "currencycodes": {
                // reply(currencycodes);
                client
                    .sendText(message.from, `${currencycodes}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "goldpr": {
                // reply(await gold());
                let goldpr = await gold();
                client
                    .sendText(message.from, `${goldpr}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "silverpr": {
                // reply(await silver());
                let silverpr = await silver();
                client
                    .sendText(message.from, `${silverpr}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
            case "vol": {
                let volData = await scrapeVOL();
                let CV = volData[0];
                let IV = volData[1];
                client
                    .sendText(message.from, `${CV}\n${IV}`)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                break;
            }
        }
    });
}