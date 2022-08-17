import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getFooterLinks } from '../../lib/api';
// import styles from './Footer.module.scss';

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
      <footer className="font-nunito border-t border-t-black w-full grid grid-rows-1 grid-cols-2 grid-flow-row-dense items-center py-2 pb-0 px-12">
        <div>All rights reserved - Jonathan Kelly</div>
        <div className='justify-self-end'>
        {
          footerNavLinks &&
          footerNavLinks.map((navLink) => {
            return (
              <Link
                href={navLink.fields.navItemUrl}
                key={navLink.fields.navItemName + "-footer-link"}
              >
                <a className="mr-2 inline-block">
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
                    />
                  ) : null}
                </a>
              </Link>
          );
        })}
        </div>
      </footer>
    </>
  );
}
