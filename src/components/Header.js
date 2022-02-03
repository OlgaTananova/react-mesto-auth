import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';

function Header({isLoggedIn, email, onLogOut, needToRegister}) {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [showNavigation, setShowNavigation] = useState(screenWidth > 580);


  function traceScreenWidth() {
    setScreenWidth(window.screen.width);
  }

  useEffect(() => {
    window.addEventListener('resize', traceScreenWidth)
    return () => {
      window.removeEventListener('resize', traceScreenWidth)
    }
  })

  useEffect(() => {
    (screenWidth < 580) ? setShowNavigation(false) : setShowNavigation(true);
  }, [screenWidth])


  function handleNavButtonClick() {
    setShowNavigation(true);
  }

  function handleCloseNavButton() {
    setShowNavigation(false)
  }


  function NavigationBar({columnStyle}) {
    if (isLoggedIn && !needToRegister) {
      return (
        <nav className={`header__navigation ${columnStyle && 'header__navigation_column'}`}>
          <span className={'header__emailtag'}>{email}</span>
          <Link className={'header__link'}
                to={'/sign-in'}
                onClick={onLogOut}>Выйти</Link>
        </nav>)
    } else if (!isLoggedIn && needToRegister) {
      return (<Link to={'/sign-in'}
                    className={'header__link'}>
        Вход
      </Link>)
    } else if (!isLoggedIn && !needToRegister) {
      return (<Link to={'/sign-up'}
                    replace
                    className={'header__link'}>
        Регистрация
      </Link>)
    }
  }

  function ShowNavigationBarButton() {
    return (<button type={'button'}
                    className={'header__navigation-button'}
                    onClick={handleNavButtonClick}
                    aria-label={'Кнопка навигации'}>{}</button>)
  }

  function CloseNavigationBarButton() {
    return (<button type={'button'}
                    className={'header__close-navigation-button'}
                    onClick={handleCloseNavButton}
                    aria-label={'Кнопка закрытия окна навигации'}>{}</button>)
  }

  function chooseLayout() {
    if (!isLoggedIn && showNavigation && !needToRegister) {
      return <NavigationBar columnStyle={false}/>
    } else if (!isLoggedIn && showNavigation && needToRegister) {
      return <NavigationBar columnStyle={false}/>
    } else if (!isLoggedIn && !showNavigation && !needToRegister) {
      return <NavigationBar columnStyle={false}/>
    } else if (!isLoggedIn && !showNavigation && needToRegister) {
      return <NavigationBar columnStyle={false}/>
    } else if (isLoggedIn && showNavigation && !needToRegister && screenWidth > 580) {
      return <NavigationBar columnStyle={false}/>
    } else if (isLoggedIn && !showNavigation && !needToRegister && screenWidth < 580) {
      return <ShowNavigationBarButton/>;
    } else if (isLoggedIn && showNavigation && !needToRegister && screenWidth < 580) {
      return <CloseNavigationBarButton/>;
    }
  }

  return (<>
    {(isLoggedIn && showNavigation && !needToRegister && screenWidth < 580) &&
    <NavigationBar columnStyle={true}/>}
    <header className="header page__header">
      <img className="header__logo"
           src={logo}
           alt="Логотип Mesto"/>
      {chooseLayout()}
    </header>
  </>)
}

export default Header