import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function Layout({ children }) {
  return (
    <div className='bg-offwhite'>
      <Header />
      <section className='px-0 lg:px-12'>
        <main>{children}</main>
      </section>
      <Footer />
    </div>
  );
}
