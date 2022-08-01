/* eslint-disable import/no-anonymous-default-export */
require("dotenv").config();
const contentful = require("contentful");
const fs = require('node:fs');
const request =  require('request');

const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const space = process.env.CONTENTFUL_SPACE_ID;

const client = contentful.createClient({
  accessToken: accessToken,
  space: space,
});

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on("close", callback);
  });
};

function getAssets() {
    client
      .getAssets()
      .then(function (assets) {
        assets.items.forEach((asset) => { 
          let imageFile = "https:" + asset.fields.file.url;

          download(imageFile, `public/${asset.fields.file.fileName}`, (imageFile) => {
            console.log(`Copied ${asset.fields.file.url}`);
          });
        });
      })
      .catch(function (e) {
        console.log(e);
      });
}

getAssets();