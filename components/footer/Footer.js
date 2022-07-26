import Link from 'next/link';
import { useEffect } from 'react';

export default function Footer({ navLinks }) {

  useEffect(() => {
    console.log(navLinks);
  });

  return (
    <>
      <h1>Footer</h1>
    </>
  );
}
