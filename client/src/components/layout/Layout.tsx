import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='h-full w-full flex flex-col'>
                <Header />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout