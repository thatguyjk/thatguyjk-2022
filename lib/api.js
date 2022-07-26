/* eslint-disable import/no-anonymous-default-export */
const contentful = require('contentful');
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const space = process.env.CONTENTFUL_SPACE_ID;

const client = contentful.createClient({
  accessToken: accessToken,
  space: space,
});

export async function getHeaderLinks() {
  let headerLinks = await client
    .getEntry("2FMNJAVXn7051ExYyWz8uY")
    .then((entry) => {
      return entry.fields.navigationList;
    }).catch(error =>{
      console.log('retrieval error:', error);
    });

  return headerLinks;
}

export async function getFooterLinks() {
    let footerLinks = await client
      .getEntry("vqCL0WVq2MJEQNaBWHmnk")
      .then((entry) => {
        return entry.fields.navigationList;
      }).catch(error => {
        console.log('retrieval error:', error);
      });

      return footerLinks;
}

export async function getFeaturedProjects() {
  let featured = await client.getEntries({
    'sys.contentType.sys.id': 'portfolioItem',
  })
    .then(data => {
      delete data['metadata'];
      delete data['sys'];

      data = data.filter(el => {
        return el.fields.featuredProject === true;
      });

      return data;
    }).catch(error => {
      console.log(error);
    });

    return featured;
}

export async function getAllProjects() {
  let projects = await client.getEntries({
    'sys.contentType.sys.id': 'portfolioItem',
  })
    .then(data => {
      delete data['metadata'];
      delete data['sys'];

      return data;
    }).catch(error => {
      console.log(error);
    });

    return projects;
}

export default { getHeaderLinks, getFooterLinks, getAllProjects, getFeaturedProjects }