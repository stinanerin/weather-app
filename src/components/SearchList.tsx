interface Props {
    // Typeannotation
    arr: {
        id: number;
        name: string;
        admin1: string;
        country: string;
        // countryName: string;
        latitude: number;
        longitude: number;
    }[];
    onSearchResultClick: (
        location: string,
        latitude: number,
        longitude: number
    ) => void;
}

const SearchList = ({ arr, onSearchResultClick }: Props) => {

    const formattedSearchResults = arr.map((city) => (
        <li
            key={city.id}
            onClick={() => {
                onSearchResultClick(
                    city.name,
                    // country: city.country || city.countryName,

                    city.latitude,
                    city.longitude
                );
            }}
        >
            {city.name}, {city.admin1}, {city.country}
        </li>
    ));
    return <ul className="search-results">{formattedSearchResults}</ul>;
};

export default SearchList;
