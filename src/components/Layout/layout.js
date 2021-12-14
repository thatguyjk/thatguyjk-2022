import * as React from 'react';
import './layout.scss';

const Layout = ({children}) => {
    return (
        /* Add navigation component and footer component here */
        <main className='container'>
            {children}
        </main>
    );
}

export default Layout;