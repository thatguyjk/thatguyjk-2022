import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getFooterLinks } from "@/lib/api";

import { nunito } from "@/styles/fonts";

export default function Footer() {
  const [footerNavLinks, setFooterNavLinks] = useState([]);

  useEffect(() => {
    const fetchFooterLinks = async () => {
      const footerLinks = await getFooterLinks();

      footerLinks &&
        footerLinks.forEach((link) => {
          delete link["metadata"];
          delete link["sys"];
          delete link["fields"]["navItemLogo"]["metadata"];
          delete link["fields"]["navItemLogo"]["sys"];
        });

      setFooterNavLinks(footerLinks);
    };

    fetchFooterLinks();
  }, []);

  return (
    <>
      <footer
        className={`${nunito.className} border-t border-t-black w-full grid grid-rows-1 grid-cols-2 grid-flow-row-dense items-center py-2 pb-0 px-12`}
      >
        <div>All rights reserved - Jonathan Kelly</div>
        <div className='justify-self-end'>
          {footerNavLinks &&
            footerNavLinks.map((navLink) => {
              return (
                <Link
                  legacyBehavior
                  href={navLink.fields.navItemUrl}
                  key={navLink.fields.navItemName + "-footer-link"}
                >
                  <a className='mr-2 inline-block'>
                    {navLink.fields?.navItemLogo?.fields?.file?.fileName ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <Image
                        src={
                          "/" + navLink.fields.navItemLogo.fields.file.fileName
                        }
                        alt={navLink.fields.navItemLogo.fields.title}
                        className='h-8 w-auto'
                        width={32}
                        height={32}
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
