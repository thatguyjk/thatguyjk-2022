import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function FeaturedProject({ details }) {
  return (
    <Link href={"projects/" + details.fields.slug} className='w-full'>
      <li className='relative transition-color text-xl text-center md:text-5xl px-3 aspect-[4/3] h-32 md:h-96 w-full flex justify-center items-center cursor-pointer hover:text-white'>
        <span
          className='transition-opacity pointer-events-auto w-full h-full absolute inset-0 opacity-0 hover:opacity-100'
          style={{ backgroundColor: details.fields.primaryColor }}
        ></span>
        <span className={`${roboto.className} z-10 pointer-events-none`}>
          {details.fields.title}
        </span>
      </li>
    </Link>
  );
}
