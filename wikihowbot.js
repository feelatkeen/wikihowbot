var TelegramBot = require('node-telegram-bot-api');
var token = 'your token';
var bot = new TelegramBot(token, {polling: true});
var request = require('request')
var fs = require('fs') //планировал делать загрузку изображений на серв
var cheerio = require('cheerio')
function randomimg(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
bot.onText(/\/random/, function (msg, match){
	var fromId  = msg.chat.id;
	request("http://www.wikihow.com/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json", function(error, response, body){
		resp = match[1]
		bodykek = JSON.parse(body)
		console.log(bodykek.query.random[0].title)
		bot.sendMessage(fromId, "How To " + bodykek.query.random[0].title + "?")

	});
});
bot.onText(/\/rndimg/, function (msg, match){
	var fromId  = msg.chat.id;
	request("http://www.wikihow.com/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json", function(error, response, body){
		resp = match[1]
		bodykek = JSON.parse(body)
		pagetitle = bodykek.query.random[0].title
		console.log("http://wikihow.com/" + pagetitle)
		request("http://wikihow.com/" + pagetitle, function(error1,response1,body1){
			var $ = cheerio.load(body1)
			getimg = $('a.image').attr("data-href")
			if (getimg == undefined){
				bot.sendMessage(fromId, "Can't find image, try again")
			} else {
				console.log(getimg)
				mylink = "http://www.wikihow.com" + getimg
				console.log(mylink)
				request(mylink, function(error2, response2, body2){
					var kek = cheerio.load(body2)
					sendimg = kek('img').attr('src')
					console.log(sendimg)
					bot.sendMessage(fromId, sendimg)
				})
			}
		});

	});
});
bot.onText(/\/findimg (.+)/, function (msg, match){
	var fromId  = msg.chat.id;
	var resp = match[1]
	request("http://wikihow.com/" + resp, function(error1,response1,body1){
			var $ = cheerio.load(body1)
			getimg = $('a.image').attr("data-href")
			if (getimg == undefined){
				bot.sendMessage(fromId, "Can't find image, try again")
			} else {
				console.log(getimg)
				mylink = "http://www.wikihow.com" + getimg
				console.log(mylink)
				request(mylink, function(error2, response2, body2){
					var kek = cheerio.load(body2)
					sendimg = kek('img').attr('src')
					console.log(sendimg)
					bot.sendMessage(fromId, sendimg)
				})
			}
		});

});
bot.onText(/\/rurandom/, function (msg, match){
	var fromId  = msg.chat.id;
	console.log(fromId)
	request("http://ru.wikihow.com/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json", function(error, response, body){
		resp = match[1]
		bodykek = JSON.parse(body)
		console.log(bodykek.query.random[0].title)
		bot.sendMessage(fromId, "как " + bodykek.query.random[0].title + "?")

	});
});
bot.onText(/\/utchksend(.+)/, function (msg, match){
	var fromId  = msg.chat.id;
	if ( fromId == 349706902 ){
		request("http://ru.wikihow.com/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json", function(error, response, body){
			resp = match[1]
			bot.sendMessage(-1001139153247, resp )
		});
	}else{
		console.log(fromId + " пробовал че то написать в уточкию")
	};
});