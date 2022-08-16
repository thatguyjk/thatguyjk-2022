import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { Container, Row, Col } from 'react-grid-system';
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
      <nav className="bg-offwhite backdrop-blur-sm backdrop-opacity-30 fixed z-40 w-full shadow-lg mb-3.5 grid grid-rows-1 grid-cols-2 grid-flow-row-dense items-center px-12">
        <div className="justify-self-start font-nunito font-extrabold uppercase"><Link href="/">THATGUYJK</Link></div>
        <div className="grid grid-cols-3 gap-3 justify-self-end">
          {headerNavLinks.map((navLink) => {
            return (
              <div className="inline-block py-3 font-nunito" key={navLink.fields.navItemName}>
                <Link href={navLink.fields.navItemUrl}>
                  <a className="hover:text-bluegrey active:text-red">
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
              </div>
            );
          })}
          </div>
      </nav>
    </>
  );
}
