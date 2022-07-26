import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getHeaderLinks } from "../../lib/api";

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
        {headerNavLinks.map((navLink) => {
          return (
            <Link
              href={navLink.fields.navItemUrl}
              key={navLink.fields.navItemName}
            >
              <a>
                {navLink.fields?.navItemLogo?.fields?.file?.fileName ? (
                  <Image
                    src={"https:" + navLink.fields.navItemLogo.fields.file.url}
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
          );
        })}
      </nav>
    </>
  );
}
