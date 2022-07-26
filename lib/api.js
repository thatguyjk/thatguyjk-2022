/* eslint-disable import/no-anonymous-default-export */
const contentful = require('contentful');
const accessToken = process.env.CONTENTFUL_API;
const space = process.env.CONTENTFUL_SPACE_ID;

const client = contentful.createClient({
  accessToken: accessToken,
  space: space,
});

export async function getFooterLinks() {
    await client
      .getEntries({
        content_type: "headerNavigation",
        "fields.navigationName": "footerNav",
      })
      .then((entry) => {
        console.log(entry);
        return entry.items[0].fields.navigationList;
      });
}

export default { getFooterLinks }