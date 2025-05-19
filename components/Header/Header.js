import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getHeaderLinks } from "@/lib/api";

import { nunito } from "@/styles/fonts";

export default function Header() {
  const [headerNavLinks, setHeaderNavLinks] = useState([]);
  const [currRoute, setCurrRoute] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchHeaderLinks = async () => {
      const headerLinks = await getHeaderLinks();

      headerLinks &&
        headerLinks.forEach((link) => {
          delete link["metadata"];
          delete link["sys"];
        });

      setHeaderNavLinks(headerLinks);
    };

    fetchHeaderLinks();
  }, []);

  useEffect(() => {
    setCurrRoute(router.pathname);
  }, [router]);

  const matchingPath = (linkName) => {
    if (currRoute === "/" && linkName === "Home") return true;

    return currRoute.includes(linkName.toLowerCase());
  };

  return (
    <>
      <nav className='bg-black/70 text-white backdrop-blur-sm fixed z-40 w-full shadow-lg mb-3.5 grid grid-rows-1 grid-cols-2 grid-flow-row-dense items-center px-12 '>
        <div
          className={`justify-self-start ${nunito.className} font-extrabold uppercase`}
        >
          <Link href='/'>THATGUYJK</Link>
        </div>
        <div
          className={
            "grid grid-cols-" +
            headerNavLinks.length +
            " gap-3 justify-self-end"
          }
        >
          {headerNavLinks.map((navLink) => {
            return (
              <div
                className={`inline-block py-3 ${nunito.className}`}
                key={navLink.fields.navItemName}
              >
                <Link legacyBehavior href={navLink.fields.navItemUrl}>
                  <a
                    className={
                      matchingPath(navLink.fields.navItemName)
                        ? "text-red"
                        : "text-white hover:text-red"
                    }
                  >
                    {navLink.fields?.navItemLogo?.fields?.file?.fileName ? (
                      <Image
                        src={
                          "https:" + navLink.fields.navItemLogo.fields.file.url
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
