import React from "react";
import Layout from '../components/Layout/layout.js';
import { graphql } from 'gatsby';

const AboutPage = ({data}) => {
  return (
    <Layout>
     {data.contentfulShortParagraph.paragraphContent}
    </Layout>
  )
};

export const query = graphql`
{
  contentfulShortParagraph(content: {eq: "Homepage About"}) {
    id
    paragraphContent
  }
}`;

  export default AboutPage;