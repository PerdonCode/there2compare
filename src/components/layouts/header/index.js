import Head from "next/head";
import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';


const Header = ( { header }) => {

    const {headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon} = header || {};


    return <>
   <Head>
            <title>{ siteTitle || 'there2compare' }</title>
            <link rel="icon" href={ favicon || '/favicon.ico' }/>
        </Head>
        <div className="header">
            <nav className="bg-gradient-to-r from-teal-300 to-green-700 p-4" >
                <div className="flex items-center justify-between flex-wrap container mx-auto max-w-6xl">
                    <div className="flex items-center flex-shrink-0 text-black mr-20">
                        <Link href="/" legacyBehavior>
                                {
                                    siteLogoUrl ? (
                                        <img className="mr-2" src={ siteLogoUrl } alt={ `${ siteTitle } logo` } width="86"
                                             height="86"/>
                                    ) : (
                                        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54"
                                             viewBox="0 0 54 54"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"></path>
                                        </svg> )
                                }
                        </Link>
                        <span>
                            <Link href="/" className="font-semibold text-xl tracking-tight" legacyBehavior>
                                { siteTitle || 'There2Compare' }
                            </Link>
                            { siteDescription ? <p>{ siteDescription }</p> : null }
                        </span>
                    </div>
                    <div className="block lg:hidden">
                        <button
                            className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className="h-0 w-full overflow-hidden lg:h-full flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm font-medium uppercase lg:flex-grow">
                            { ! isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.map( menuItem => (
                                (<Link
                                    key={menuItem?.ID}
                                    href={ menuItem?.url || '/' }
                                    className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10"
                                    dangerouslySetInnerHTML={{__html: menuItem.title}}>

                                </Link>)
                            ) ) : null }
                        </div>
                        <a href="#responsive-header"
                               className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-20 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block m-auto"
                                     fill="none" viewBox="0 0 24 24" width="25" height="auto" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                          d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
                                </svg>
                            </a>
                        <div className="text-sm font-medium">
                            <a href="#responsive-header"
                               className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block m-auto"
                                     fill="none" viewBox="0 0 24 24" width="25" height="auto" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>;
};

export default Header;