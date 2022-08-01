import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-grid-system';
import { useState, useEffect } from 'react';
import { getFooterLinks } from '../../lib/api';
import styles from './Footer.module.scss';

export default function Footer({ navLinks }) {
  const [footerNavLinks, setFooterNavLinks] = useState([]);

  useEffect(() => {
    const fetchFooterLinks = async () => {
      const footerLinks = await getFooterLinks();

      footerLinks && footerLinks.forEach(link => {
        delete link['metadata'];
        delete link['sys'];
        delete link['fields']['navItemLogo']['metadata'];
        delete link['fields']['navItemLogo']['sys'];
      });

      setFooterNavLinks(footerLinks);
    };

    fetchFooterLinks();
  }, []);

  return (
    <>
      <footer className={styles.container}>
        <Container fluid>
          <Row direction='row' justify='end' wrap='nowrap'>
            <Col>
              {footerNavLinks &&
                footerNavLinks.map((navLink) => {
                  return (
                    <Link
                      href={navLink.fields.navItemUrl}
                      key={navLink.fields.navItemName + "-footer-link"}
                    >
                      <a>
                        {navLink.fields?.navItemLogo?.fields?.file?.fileName ? (
                          <Image
                            src={
                              "/" +
                              navLink.fields.navItemLogo.fields.file.fileName
                            }
                            alt={navLink.fields.navItemLogo.fields.title}
                            width={
                              navLink.fields.navItemLogo.fields.file.details
                                .image.width / 16
                            }
                            height={
                              navLink.fields.navItemLogo.fields.file.details
                                .image.height / 16
                            }
      
                            className={styles.socialImage}
                          />
                        ) : null}
                      </a>
                    </Link>
                  );
                })}
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
