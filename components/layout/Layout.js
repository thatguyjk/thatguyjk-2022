import Header from '../header';
import Footer from '../footer';

export default function Layout({children}) {
    return (
      <div className='bg-offwhite'>
        <Header />
        <section className='container px-12'>
          <main>{children}</main>
        </section>
        <Footer />
      </div>
    );
};
