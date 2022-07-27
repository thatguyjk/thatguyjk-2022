/* eslint-disable import/no-anonymous-default-export */
const contentful = require("contentful");
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const space = process.env.CONTENTFUL_SPACE_ID;

const client = contentful.createClient({
  accessToken: accessToken,
  space: space,
});

function getAssets() {
    client
      .getAssets()
      .then(function (assets) {
        assets.items.map(function (asset) {
          var imageURL = "https:" + asset.fields.file.url;
          console.log(imageURL);
        });
      })
      .catch(function (e) {
        console.log(e);
      });
}

getAssets();