import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getFooterLinks } from '../../lib/api';

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
      <footer>
        {footerNavLinks && footerNavLinks.map((navLink) => {
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
      </footer>
    </>
  );
}
