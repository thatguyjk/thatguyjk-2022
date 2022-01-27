import * as React from 'react';
import './layout.scss';

import Nav from '../Nav/nav.js';
import Footer from '../Footer/footer.js';

const Layout = ({children}) => {
    return (
        /* Add navigation component and footer component here */
        <main className='container'>
            <Nav />
            {children}
            <Footer />
        </main>
    );
}

export default Layout;