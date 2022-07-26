/* eslint-disable import/no-anonymous-default-export */
const contentful = require('contentful');
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const space = process.env.CONTENTFUL_SPACE_ID;

const client = contentful.createClient({
  accessToken: accessToken,
  space: space,
});

export async function getFooterLinks() {
    let footerLinks = await client
      .getEntry("vqCL0WVq2MJEQNaBWHmnk")
      .then((entry) => {
        return entry.fields.navigationList;
      });

      return footerLinks;
}

export async function getHeaderLinks() {
    let headerLinks = await client
      .getEntry("2FMNJAVXn7051ExYyWz8uY")
      .then((entry) => {
        return entry.fields.navigationList;
      });

    return headerLinks;
}

export default { getHeaderLinks, getFooterLinks }