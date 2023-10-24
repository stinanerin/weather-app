import { Link } from "react-router-dom";
import logo from "../../assets/logo-mini.svg";
import Search from "../ui/Search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { onSearchResultClick } from "../../models/OnSearchResultClick";
import { useWeatherContext } from "../../utility/useWeatherContext";
import { Bookmark } from "../icons/Bookmark";

import SkeletonElement from "../skeletons/SkeletonElement";

const Header = ({
    onSearchResultClick,
}: {
    onSearchResultClick: onSearchResultClick;
}) => {
    const { weatherData } = useWeatherContext();

    //todo: add button around bookmark - implement favorite funcitonality

    return (
        <header className="header">
            <div className="row">
                <Link to="/" className="link">
                    <img className="logo" src={logo} alt="Logo" />
                </Link>
                {weatherData ? (
                    <p className="row">
                        <FontAwesomeIcon icon="location-dot" />
                        {
                            // <Bookmark filled={true} />
                        }
                        <span className="heading"> {weatherData.location}</span>
                    </p>
                ) : (
                    <div className="skeleton-location">
                        <SkeletonElement type={"paragraph"} />
                    </div>
                )}
            </div>

            <Search onSearchResultClick={onSearchResultClick} />
        </header>
    );
};

export default Header;
