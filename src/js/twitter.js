const http = require('http');
const https = require('https');
const querystring = require('querystring');
const url = require('url');
const fs = require('fs');
const Twit = require('twit');

var client = new Twit({
    consumer_key: 'g0HENpibCeDfDdQLsce2nysCA',
    consumer_secret: 'u5f9EIG15hs02n8QvpIJDpGCoEl39tA296sriUo1XnjJrkSOZ7',
    access_token: '1052093037692821504-TM5deyTnTZ2EF9GIN3ktSrexMyq2cg',
    access_token_secret: 'XGM8mpL4LKQofLflMqjomtV3KKLhTzszqxkH9zJWk2mQK'
});

var params = {screen_name: 'nodejs'};

const uploadImage = (imageEncoded, callback) => {
    client.post('media/upload', {media_data: imageEncoded}, function (error, data, response) {
        if (error) {
            console.log('Upload image', error);
        }
        callback(data.media_id_string);
    });
}

const sendTweet = (message, imageURL) => {
    const file = fs.createWriteStream("tmp_image.gif");
    const request = https.get(imageURL, response => {
        let data;

        response.pipe(file);

        response.on('end', () => {
            const imageData = fs.readFileSync('tmp_image.gif', {encoding: 'base64'});

            uploadImage(imageData, (mediaId) => {
                console.log(mediaId);
                client.post('statuses/update', {
                    status: message,
                    media_ids: [mediaId]
                }, function (error, tweet, response) {
                    if (error) {
                        console.log('3', error);
                    }
                });
            });
        });
    });

    request.end();
}

const server = http.createServer();

server.on('request', (req, res) => {
    const parse = url.parse(req.url);
    const queries = querystring.parse(parse.query);

    res.setHeader('Access-Control-Allow-Origin', '*');

    switch (parse.pathname) {
        case '/': {
            const stream = fs.createReadStream(__dirname + '/../html/test.html');
            stream.on('data', (chunk) => res.write(chunk));
            stream.on('end', () => res.end());
            break;
        }
        case '/tweet': {
            sendTweet(queries.message, queries.imageURL);
            break;
        }

        default: {
            const path = __dirname + '/../' + req.url;
            if (fs.existsSync(path)) {
                const stream = fs.createReadStream(path);
                stream.on('data', (chunk) => res.write(chunk));
                stream.on('end', () => res.end());
            } else {
                res.statusCode = 404;
                res.end();
            }

        }
    }
});

server.listen(8080);