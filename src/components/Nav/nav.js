import React from "react";
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import './nav.scss';

const NavList = ({listData}) => {
    return listData ? (
       listData.map((data, i) => {
           return data.externalLink ? (
            <a href={data.navItemUrl} key={i+'_'+data.navItemName} target="_blank" rel="noreferrer">
                {data.navItemLogo?.file.fileName
                    ? (<img src={data.navItemLogo?.file.url} 
                            alt={data.navItemName}
                            width="32"
                            height="32" />) 
                    : null
                }
                {data.navItemLogo?.file ? '' : data.navItemName}
            </a>
           ) : (
            <Link to={data.navItemUrl} key={i+'_'+data.navItemName}>
                {data.navItemLogo?.file.fileName
                    ? (<img src={data.navItemLogo?.file.url} 
                            alt={data.navItemName}
                            width="32"
                            height="32" />) 
                    : null
                }
                {data.navItemLogo?.file ? '' : data.navItemName}
            </Link>
            )
        })
    ) : null;
}

const Nav = () => {
    const navData = useStaticQuery(graphql`
    {
      allContentfulPageNavigationList(filter: {navigationName: {eq: "headerNav"}}) {
        edges {
          node {
            navigationList {
              navItemLogo {
                file {
                  fileName
                  url
                  details {
                    image {
                      height
                      width
                    }
                  }
                }
              }
              navItemName
              navItemUrl
              externalLink
            }
          }
        }
      }
    }`);

    return (
        <nav>
            <NavList listData={navData.allContentfulPageNavigationList.edges[0].node.navigationList} />
        </nav>
    );
}

// use gatsby api to pull in contentful data
export default Nav;