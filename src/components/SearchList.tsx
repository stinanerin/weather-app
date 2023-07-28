
interface Props {
    // Typeannotation
    arr: { name: string; admin1: string; country: string }[];
}


const SearchList = (({arr}: Props) => {
    

    const formattedSearchResults = arr.map((city, index) => (
        <li key={index}>
            {city.name}, {city.admin1}, {city.country}
        </li>
    ));
    return <ul className="search-results">{formattedSearchResults}</ul>;
});

export default SearchList;
