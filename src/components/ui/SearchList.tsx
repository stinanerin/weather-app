import { onSearchResultClick } from "../../models/OnSearchResultClick";
import { SearchResult } from "../../models/SearchResult";

interface Props {
    arr: SearchResult[];
    onSearchResultClick: onSearchResultClick;
    searchListRef: React.RefObject<HTMLUListElement>;
}

const SearchList = ({ arr, onSearchResultClick, searchListRef }: Props) => {
    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLLIElement>,
        city: SearchResult
    ) => {
        if (event.key === "Enter") {
            onSearchResultClick(city.name, city.latitude, city.longitude);
        }
    };

    const formattedSearchResults = arr.map((city) => (
        <li
            tabIndex={0}
            key={city.id}
            onClick={() => {
                onSearchResultClick(
                    city.name,
                    // country: city.country || city.countryName,
                    city.latitude,
                    city.longitude
                );
            }}
            onKeyDown={(event) => handleKeyPress(event, city)}
        >
            {city.name}, {city.admin1}, {city.country}
        </li>
    ));

    return (
        <ul ref={searchListRef} className="search-results">
            {formattedSearchResults}
        </ul>
    );
};

export default SearchList;
