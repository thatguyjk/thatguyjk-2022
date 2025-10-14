/* eslint-disable import/no-anonymous-default-export */
import { createClient } from "contentful";
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const space = process.env.CONTENTFUL_SPACE_ID;

if (!accessToken) {
  throw new Error("CONTENTFUL_ACCESS_TOKEN environment variable is not set");
}

if (!space) {
  throw new Error("CONTENTFUL_SPACE_ID environment variable is not set");
}

const client = createClient({
  accessToken: accessToken as string,
  space: space as string,
});

const constants = require("./CMS_CONSTANTS");

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
      const { metadata, sys, ...rest } = entry;

      return rest.fields.aboutContent;
    });

  return aboutContent;
}

export async function getHomePageAboutContent() {
  let aboutContent = await client
    .getEntry(constants.HOME_PAGE_ABOUT_CONTENT)
    .then((entry) => {
      const { metadata, sys, ...rest } = entry;

      return rest.fields.paragraphContent;
    });

  return aboutContent;
}

export async function getFeaturedProjects() {
  let featured = await client
    .getEntries(constants.FEATURED_PROJECTS)
    .then((data) => {
      delete data["sys"];

      data.items = data.items.filter((el) => {
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
