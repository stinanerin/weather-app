import logo from '../assets/logo-mini.svg'; 
import Search from "./Search";

interface SearchProps {
  onSearchResultClick: (
      location: string,
      latitude: number,
      longitude: number
  ) => void;
}

const Header = ({onSearchResultClick} : SearchProps) => {
  return (
    <header className="header">

        <img className="logo" src={logo} alt="Logo" />
        <Search onSearchResultClick={onSearchResultClick} />
        
    </header>
  )
}

export default Header