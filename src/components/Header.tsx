import logo from '../assets/logo-mini.svg'; 



const Header = () => {
  return (
    <header className="header">

        <img className="logo" src={logo} alt="Logo" />
        <div>Search</div>
        
    </header>
  )
}

export default Header