function Header() {
  return (
    <header>
      <div className="header__wrapper">
        <h1 className="header__heading"><span aria-label="Birthday">🎂</span> Emily's Birthday</h1>
        <a href="/" className="header__button button">Get help</a>
        <div className="header__content">
          <p>Welcome to Emily's 29th birthday surprise! I've built this site to gather a collection of warm birthday wishes to piece together for Emily, this way we won't all feel so separated from one another if even for a short moment.</p>
          <p>To get started <strong><span className="click-tap"></span></strong> on <span className="camera"></span> and <span className="record"></span> to begin recording.<br/> <strong>Please note videos are limited to 20 seconds.</strong></p>
        </div>
      </div>
    </header>
  );
}

export default Header;
