import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className='bg-offwhite'>
      <Header />
      <section className='px-3 md:px-12'>
        <main>{children}</main>
      </section>
      <Footer />
    </div>
  );
}
