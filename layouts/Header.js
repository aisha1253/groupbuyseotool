"use client";
import { nextUtility } from "@/utility";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import AuthButtons from "@/components/AuthButtons";
const Header = ({ header, single }) => {
  console.log("Header rendering with header type:", header);
  useEffect(() => {
    nextUtility.stickyNav();
  }, []);

  switch (header) {
    case 1:
      return <Header1 single={single} />;
    case 2:
      return <Header2 single={single} />;
    case 3:
      return <Header3 single={single} />;
    case 5:
      return <Header5 single={single} />;
    case 6:
      return <Header6 single={single} />;
    default:
      return <Header6 single={single} />;
  }
};
export default Header;

const Menu = ({ single, menu }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Home page par jo menu items hain - wahi sab jagah show honge
  const { user, isSignedIn } = useUser();
  const [isSeller, setIsSeller] = useState(false);

  // Check seller status from Clerk metadata and database
  useEffect(() => {
    const checkSellerStatus = async () => {
      if (isSignedIn && user) {
        // First check Clerk metadata
        const clerkRole = user?.publicMetadata?.role;
        if (clerkRole === 'SELLER') {
          setIsSeller(true);
          return;
        }

        // If not in metadata, check database with retry
        let retries = 3;
        let delay = 1000; // Start with 1 second delay
        
        while (retries > 0) {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          if (response.ok) {
            const userData = await response.json();
            if (userData.role === 'SELLER') {
              setIsSeller(true);
                return;
              } else {
                setIsSeller(false);
                return;
              }
            } else if (response.status === 404) {
              // User not found in database yet, wait and retry
              if (retries > 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
                retries--;
                continue;
              }
            }
          } catch (error) {
            console.log('Error checking seller status:', error.message);
            if (retries > 1) {
              await new Promise(resolve => setTimeout(resolve, delay));
              delay *= 2;
              retries--;
              continue;
            }
          }
          retries = 0;
        }
      } else {
        setIsSeller(false);
      }
    };

    checkSellerStatus();
  }, [isSignedIn, user]);

  // Home page par jo menu items hain - wahi sab jagah show honge
  const singleMenu = menu
    ? menu
    : [
      // Default menu items removed as requested
    ];

  // Add Seller Dashboard if user is a seller
  if (isSeller && !singleMenu.find(item => item.title === "Seller Dashboard")) {
    singleMenu.push({ id: 99, href: "/seller-dashboard", title: "Seller Dashboard" });
    console.log('Seller Dashboard added to menu', { isSeller, userId: user?.id });
  }

  // Function to get menu link - homepage pe anchor, baaki pages pe homepage with anchor
  const getMenuLink = (href) => {
    if (isHomePage) {
      return `#${href}`;
    }
    return `/#${href}`;
  };

  return (
    <Fragment>
      {single ? (
        <nav id="mobile-menu" className="d-none d-xl-block">
          <ul>
            <li className={isHomePage ? "active" : ""}>
              <Link href="/">
                Home
              </Link>
            </li>
            {singleMenu.map((menu) => (
              <li key={menu.id}>
                {menu.href.startsWith('/') ? (
                  <Link href={menu.href}>{menu.title}</Link>
                ) : (
                  <a href={getMenuLink(menu.href)}>{menu.title}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <nav id="mobile-menu" className="d-none d-xl-block">
          <ul>
            <li className={isHomePage ? "active" : ""}>
              <Link href="/">
                Home
              </Link>
            </li>
            {singleMenu.map((menu) => (
              <li key={menu.id}>
                {menu.href.startsWith('/') ? (
                  <Link href={menu.href}>{menu.title}</Link>
                ) : (
                  <a href={getMenuLink(menu.href)}>{menu.title}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Fragment>
  );
};

const MobileMenu = ({ single, menu }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [activeMenu, setActiveMenu] = useState("");
  const [multiMenu, setMultiMenu] = useState("");
  const activeMenuSet = (value) =>
    setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  const multiMenuSet = (value) =>
    setMultiMenu(multiMenu === value ? "" : value),
    multiMenuActiveLi = (value) =>
      value === multiMenu ? { display: "block" } : { display: "none" };

  // Home page par jo menu items hain - wahi sab jagah show honge
  const { user, isSignedIn } = useUser();
  const [isSeller, setIsSeller] = useState(false);

  // Check seller status from Clerk metadata and database
  useEffect(() => {
    const checkSellerStatus = async () => {
      if (isSignedIn && user) {
        // First check Clerk metadata
        const clerkRole = user?.publicMetadata?.role;
        if (clerkRole === 'SELLER') {
          setIsSeller(true);
          return;
        }

        // If not in metadata, check database with retry
        let retries = 3;
        let delay = 1000; // Start with 1 second delay
        
        while (retries > 0) {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          if (response.ok) {
            const userData = await response.json();
            if (userData.role === 'SELLER') {
              setIsSeller(true);
                return;
              } else {
                setIsSeller(false);
                return;
              }
            } else if (response.status === 404) {
              // User not found in database yet, wait and retry
              if (retries > 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
                retries--;
                continue;
              }
            }
          } catch (error) {
            console.log('Error checking seller status:', error.message);
            if (retries > 1) {
              await new Promise(resolve => setTimeout(resolve, delay));
              delay *= 2;
              retries--;
              continue;
            }
          }
          retries = 0;
        }
      } else {
        setIsSeller(false);
      }
    };

    checkSellerStatus();
  }, [isSignedIn, user]);

  // Home page par jo menu items hain - wahi sab jagah show honge
  const singleMenu = menu
    ? menu
    : [
      // Default menu items removed
    ];

  if (isSeller && !singleMenu.find(item => item.title === "Seller Dashboard")) {
    singleMenu.push({ id: 99, href: "/seller-dashboard", title: "Seller Dashboard" });
    console.log('Seller Dashboard added to mobile menu');
  }

  // Function to get menu link
  const getMenuLink = (href) => {
    if (isHomePage) {
      return `#${href}`;
    }
    return `/#${href}`;
  };

  return (
    <div className="mobile-menu fix mb-3 mean-container d-block d-xl-none">
      <div className="mean-bar">
        <a href="#nav" className="meanmenu-reveal">
          <span>
            <span>
              <span />
            </span>
          </span>
        </a>
        <nav className="mean-nav">
          <ul>
            <li className="active d-xl-none">
              <Link href="/" className="border-none">
                Home
              </Link>
            </li>
            {singleMenu.map((menu) => (
              <li key={menu.id}>
                {menu.href.startsWith('/') ? (
                  <Link href={menu.href}>{menu.title}</Link>
                ) : (
                  <a href={getMenuLink(menu.href)}>{menu.title}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Sidebar = ({ sidebarToggle, close, menu, single }) => {
  return (
    <Fragment>
      <div className="fix-area">
        <div className={`offcanvas__info ${sidebarToggle ? "info-open" : ""}`}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#101828', fontWeight: '700', fontSize: '24px' }}>
                    GroupBuy<span style={{ fontSize: '16px', fontWeight: '500' }}>Tools</span>
                  </Link>
                </div>
                <div className="offcanvas__close" onClick={() => close()}>
                  <button>
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="mobile-menu fix mb-3">
                <MobileMenu single={single} menu={menu} />
              </div>
              <p className="text d-none d-xl-block mb-5">
                Nullam dignissim, ante scelerisque the is euismod fermentum odio
                sem semper the is erat, a feugiat leo urna eget eros. Duis
                Aenean a imperdiet risus.
              </p>
              <div className="offcanvas__contact">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon">
                      <i className="fal fa-map-marker-alt" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" href="#">
                        Main Street, Melbourne, Australia
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-envelope" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="mailto:info@example.com">info@example.com</a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-clock" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" href="#">
                        Mod-friday, 09am -05pm
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="far fa-phone" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+11002345909">+11002345909</a>
                    </div>
                  </li>
                </ul>
                <div className="header-button mt-4">
                  <Link href="contact" className="theme-btn text-center">
                    Contact Us
                  </Link>
                </div>
                <div className="social-icon d-flex align-items-center">
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube" />
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`offcanvas__overlay ${sidebarToggle ? "overlay-open" : ""}`}
        onClick={() => close()}
      />
    </Fragment>
  );
};

const Header1 = ({ single, menu }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <Fragment>
      <header id="header-sticky" className="header-1">
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="sticky-logo">
                <Link href="/">
                  <img
                    src="assets/img/logo/white-logo.svg"
                    alt="logo-img"
                    className="logo-1"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="assets/img/logo/black-logo.svg"
                    alt="logo-img"
                    className="logo-2"
                  />
                </Link>
              </div>
              <div className="header-left">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <Menu single={single} />
                  </div>
                </div>
              </div>
              <div className="header-right d-flex justify-content-end align-items-center">
                <div className="icon-items">
                  <div className="icon">
                    <i className="fas fa-phone-alt" />
                  </div>
                  <div className="content">
                    <p>Make A Call</p>
                    <h4>
                      <a href="tel:+00012345688">+000 (123) 456 88</a>
                    </h4>
                  </div>
                </div>
                <div className="header__hamburger d-xl-block my-auto">
                  <div
                    className="sidebar__toggle"
                    onClick={() => setSidebarToggle(true)}
                  >
                    <i className="far fa-bars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar
        sidebarToggle={sidebarToggle}
        close={() => setSidebarToggle(false)}
        single={single}
      />
    </Fragment>
  );
};


const Header2 = ({ single }) => {
  // Home page par jo menu items hain, wahi sab jagah show honge
  const singleMenu = [];

  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <Fragment>
      <header id="header-sticky" className="header-2">
        <div className="container">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="sticky-logo">
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#101828', fontWeight: '700', fontSize: '24px' }}>
                  GroupBuy<span style={{ fontSize: '16px', fontWeight: '500' }}>Tools</span>
                </Link>
              </div>
              <div className="header-left">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <Menu single={single} menu={singleMenu} />
                  </div>
                </div>
              </div>
              <div className="header-right d-flex justify-content-end align-items-center gap-3">
                <AuthButtons />
                <div className="header__hamburger d-xl-none my-auto">
                  <div
                    className="sidebar__toggle"
                    onClick={() => setSidebarToggle(true)}
                  >
                    <i className="far fa-bars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar
        sidebarToggle={sidebarToggle}
        close={() => setSidebarToggle(false)}
        single={single}
        menu={singleMenu}
      />
    </Fragment>
  );
};

const Header3 = ({ single }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const singleMenu = [];
  return (
    <Fragment>
      <header id="header-sticky" className="header-2">
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="sticky-logo">
                <Link href="/">
                  <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
                </Link>
              </div>
              <div className="header-left">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <Menu single={single} menu={singleMenu} />
                  </div>
                </div>
              </div>
              <div className="header-right d-flex justify-content-end align-items-center">
                <div className="icon-items">
                  <div className="icon">
                    <i className="fas fa-phone-alt" />
                  </div>
                  <div className="content">
                    <p>Make A Call</p>
                    <h4>
                      <a href="tel:+00012345688">+000 (123) 456 88</a>
                    </h4>
                  </div>
                </div>
                <div className="header-button">
                  <Link href="contact" className="theme-btn bg-2">
                    Get A Quote
                  </Link>
                </div>
                <div className="header__hamburger d-xl-none my-auto">
                  <div
                    className="sidebar__toggle"
                    onClick={() => setSidebarToggle(true)}
                  >
                    <i className="far fa-bars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar
        sidebarToggle={sidebarToggle}
        close={() => setSidebarToggle(false)}
        single={single}
        menu={singleMenu}
      />
    </Fragment>
  );
};

const Header5 = ({ single }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const singleMenu = [];
  return (
    <Fragment>
      <header id="header-sticky" className="header-6">
        <div className="container">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="sticky-logo">
                <Link href="/" className="logo-1">
                  <img src="assets/img/logo/white-logo.svg" alt="logo-img" />
                </Link>
                <Link href="/" className="logo-2">
                  <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
                </Link>
              </div>
              <div className="header-left">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <Menu single={single} menu={singleMenu} />
                  </div>
                </div>
              </div>
              <div className="header-right d-flex justify-content-end align-items-center">
                <div className="header__hamburger d-xl-block my-auto">
                  <div
                    className="sidebar__toggle"
                    onClick={() => setSidebarToggle(true)}
                  >
                    <i className="far fa-bars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar
        sidebarToggle={sidebarToggle}
        close={() => setSidebarToggle(false)}
        single={single}
        menu={singleMenu}
      />
    </Fragment>
  );
};

const Header6 = ({ single }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const singleMenu = [];
  return (
    <Fragment>
      <header id="header-sticky" className="header-3">
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="sticky-logo">
                <Link href="/">
                  <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
                </Link>
              </div>
              <div className="header-left">
                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <Menu single={single} menu={singleMenu} />
                  </div>
                </div>
              </div>
              <div className="header-right d-flex justify-content-end align-items-center">
                <div className="header-button">
                  <Link href="contact" className="theme-btn bg-2">
                    Get A Quote
                  </Link>
                </div>
                <div className="header__hamburger d-xl-block my-auto">
                  <div
                    className="sidebar__toggle"
                    onClick={() => setSidebarToggle(true)}
                  >
                    <i className="far fa-bars" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar
        sidebarToggle={sidebarToggle}
        close={() => setSidebarToggle(false)}
        single={single}
        menu={singleMenu}
      />
    </Fragment>
  );
};
