/* eslint-disable import/no-anonymous-default-export */
import { createClient } from "contentful";
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const space = process.env.CONTENTFUL_SPACE_ID;

const constants = require("./CMS_CONSTANTS");

const client = createClient({
  accessToken: accessToken,
  space: space,
});

export async function getHeaderLinks() {
  let headerLinks = await client
    .getEntry(constants.HEADER_LINKS)
    .then((entry) => {
      return entry.fields.navigationList;
    })
    .catch((error) => {
      console.log("retrieval error:", error);
    });

  return headerLinks;
}

export async function getFooterLinks() {
  let footerLinks = await client
    .getEntry(constants.FOOTER_LINKS)
    .then((entry) => {
      return entry.fields.navigationList;
    })
    .catch((error) => {
      console.log("retrieval error:", error);
    });

  return footerLinks;
}

export async function getAboutContent() {
  let aboutContent = await client
    .getEntry(constants.ABOUT_CONTENT)
    .then((entry) => {
      delete entry["metadata"];
      delete entry["sys"];

      return entry.fields.aboutContent;
    });

  return aboutContent;
}

export async function getHomePageAboutContent() {
  let aboutContent = await client
    .getEntry(constants.HOME_PAGE_ABOUT_CONTENT)
    .then((entry) => {
      delete entry["metadata"];
      delete entry["sys"];

      return entry.fields.paragraphContent;
    });

  return aboutContent;
}

export async function getFeaturedProjects() {
  let featured = await client
    .getEntries(constants.FEATURED_PROJECTS)
    .then((data) => {
      delete data["metadata"];
      delete data["sys"];

      data = data.items.filter((el) => {
        return el.fields.featuredProject === true;
      });

      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  return featured;
}

export async function getAllProjects() {
  let projects = await client
    .getEntries(constants.ALL_PROJECTS)
    .then((data) => {
      delete data["metadata"];
      delete data["sys"];

      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  return projects;
}

export default {
  getHeaderLinks,
  getFooterLinks,
  getAllProjects,
  getFeaturedProjects,
  getAboutContent,
};
