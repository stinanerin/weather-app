import { Link } from "react-router-dom";
import logo from "../assets/logo-mini.svg";
import Search from "./Search";

import { onSearchResultClick } from "../models/OnSearchResultClick";

const Header = ({
    onSearchResultClick,
}: {
    onSearchResultClick: onSearchResultClick;
}) => {
    return (
        <header className="header">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo" />
            </Link>
            <Search onSearchResultClick={onSearchResultClick} />
        </header>
    );
};

export default Header;
