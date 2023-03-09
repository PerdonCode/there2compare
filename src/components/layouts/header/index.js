import Head from "next/head";
import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';
import Image from "next/image";
import React, {useState, useEffect, useRef} from "react";
import edit from './/../../../../public/img/log-out.png';
import heart from './/../../../../public/img/log-out.png';
import question from './/../../../../public/img/log-out.png';
import user from './/../../../../public/img/user.png';
import envelope from './/../../../../public/img/log-out.png';
import logout from './/../../../../public/img/log-out.png';



const Header = ( { header }) => {
    

    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    {/* header dynamic menu items*/}
    const {headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon} = header || {};


    {/* react hook for closing dropdown menu if the user click outside the menu*/}
    useEffect(() => {
        let handler = (e)=>{
          if(!menuRef.current.contains(e.target)){
            setOpen(false);
            console.log(menuRef.current);
          }      
        };
        document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
    {/* test var for the if statement for user login*/}
    let text = 'a';

    return <>
   <Head>
            <title>{ siteTitle || 'there2compare' }</title>
            <link rel="icon" href={ favicon || '/favicon.ico' }/>
        </Head>
        <div className="header">
            <nav className="bg-gradient-to-r from-teal-300 to-green-700 p-4" >
                <div className="flex items-center justify-between flex-wrap container  mx-auto max-w-4xl">
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
                        <div> 
                            {/* no user session show login or register */}
                           {text.length > 0 ?
                            <div className="menu-container" ref={menuRef}>
                            <div className="menu-trigger" onClick={()=>setOpen(!open)}>
                                <Image src="/img/Sample_User_Icon.png" width={20} height={10}></Image>
                            </div>
                             <div className={`dropdown-menu border ${open? 'active' : 'inactive'}`} >
                                <h3>Welcome User</h3>
                                <ul>
                                    <DropdownItem img = {login} text = {"Log in"} />
                                    <DropdownItem img = {user} text = {"Register"} />
                                    <DropdownItem img = {envelope} text = {"Contact Us"} />
                                </ul>
                            </div>
                       </div>
                           : 
                           <div className="menu-container" ref={menuRef}>
                            {/* user session show login dropdown menu */}
                                <div className="menu-trigger" onClick={()=>setOpen(!open)}>
                                    <Image src="/img/Sample_User_Icon.png" width={20} height={10}></Image>
                                </div>
                                 <div className={`dropdown-menu border ${open? 'active' : 'inactive'}`} >
                                    <h3>UserName </h3>
                                    <ul>
                                        <DropdownItem img = {user} text = {"My Profile"} />
                                        <DropdownItem img = {edit} text = {"Edit Profile"} />
                                        <DropdownItem img = {heart} text = {"Favorites"} />
                                        <DropdownItem img = {envelope} text = {"Inbox"} />
                                        <DropdownItem img = {question} text = {"contact"}/>
                                        <DropdownItem img = {logout} text = {"logout"} />
                                    </ul>
                                </div>
                           </div>
                         }
                        </div>
                </div>
            </nav>
            <nav>
            <div
                        className="h-0 w-full overflow-hidden lg:h-full flex-grow lg:flex lg:items-center lg:w-auto  mx-auto max-w-4xl">
                            {/* Dynamic navbar */}
                        <div className="text-sm font-medium uppercase lg:flex-grow">
                            { ! isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.slice(0,5).map( menuItem => (
                                (<Link
                                    key={menuItem?.ID}
                                    href={ menuItem?.url || '/' }
                                    className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10"
                                    dangerouslySetInnerHTML={{__html: menuItem.title}}>

                                </Link>)
                            ) ) : null }
                        </div>
                        </div>
            </nav>
        </div>
    </>;
};

function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img}></img>
        <a> {props.text} </a>
      </li>
    );
}

export default Header;