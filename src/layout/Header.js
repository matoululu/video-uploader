import Logo from '../images/logo.png';

function Header() {
  return (
    <header>
      <div className="header__wrapper">
        <div className="header__logo-wrapper">
          <img className="header__logo" src={ Logo } alt="Emily's Birthday website"/>
          <h1 className="header__heading">Emily's Birthday</h1>
        </div>
        <a href="/">Get help</a>
      </div>
    </header>
  );
}

export default Header;
