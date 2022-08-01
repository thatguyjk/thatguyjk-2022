import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col } from 'react-grid-system';
import { getHeaderLinks } from "../../lib/api";
import styles from './Header.module.scss';

export default function Header() {
  const [headerNavLinks, setHeaderNavLinks] = useState([]);

  useEffect(() => {
    const fetchHeaderLinks = async () => {
      const headerLinks = await getHeaderLinks();

      headerLinks && headerLinks.forEach((link) => {
        delete link["metadata"];
        delete link["sys"];
       // delete link["fields"]["navItemLogo"]["metadata"];
       // delete link["fields"]["navItemLogo"]["sys"];
      });

      setHeaderNavLinks(headerLinks);
    };

    fetchHeaderLinks();
  }, []);

  return (
    <>
      <nav>
        <Container>
          <Row>
            {headerNavLinks.map((navLink) => {
              return (
                <Col key={navLink.fields.navItemName}>
                  <Link href={navLink.fields.navItemUrl}>
                    <a>
                      {navLink.fields?.navItemLogo?.fields?.file?.fileName ? (
                        <Image
                          src={
                            "https:" +
                            navLink.fields.navItemLogo.fields.file.url
                          }
                          alt={navLink.fields.navItemLogo.fields.title}
                          width={
                            navLink.fields.navItemLogo.fields.file.details.image
                              .width / 16
                          }
                          height={
                            navLink.fields.navItemLogo.fields.file.details.image
                              .height / 16
                          }
                        />
                      ) : null}
                      {navLink.fields.navItemName}
                    </a>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </nav>
    </>
  );
}
