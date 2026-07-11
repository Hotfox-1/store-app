import './header.css';



function Header() {
  return (
    <header className="header">
        <nav className="flex justify-between p-2 items-center">
            <a className="navbar-brand flex align-center items-center gap-1" href="/">
            <img className="object-contain w-16" src="/images/header.png" alt="TCC Store" />
                TCC Store
            </a>
            <div className="navbar-nav flex justify-end gap-8">
                <a className="nav-link hover:text-cyan-500 active:underline" href="/">
                    Home
                </a>
                <a className="nav-link hover:text-cyan-500 active:underline" href="/products">
                    Products
                </a>
                <a className="nav-link hover:text-cyan-500 active:underline" href="/about">
                    About
                </a>
                <a className="nav-link hover:text-cyan-500 active:underline" href="/cart">
                    Cart
                </a>
            </div>
        </nav>
    </header>
  );
}

export default Header;