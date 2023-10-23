import { useState, ChangeEvent } from "react";

import { fetchData } from "../../utility/api";
import SearchList from "./SearchList";

import { onSearchResultClick } from "../../models/OnSearchResultClick";
import { SearchResult } from "../../models/SearchResult";

interface Props {
    onSearchResultClick: onSearchResultClick;
}

const getSearchResult = async (
    input: string
): Promise<SearchResult[] | null> => {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${input}`;
        const res = await fetchData(url);
        console.log(res?.data);
        if (res?.status !== 200) {
            //todo
            throw new Error();
        }
        return res?.data.results;
    } catch (error) {
        console.warn("Search result error", error);
        return null;
    }
};

const Search = ({ onSearchResultClick }: Props) => {
    const [searchResult, setSearchResult] = useState<SearchResult[] | null>(
        null
    );
    const [searchValue, setSearchValue] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;

        // Updates input field with current search value
        setSearchValue(searchValue);
        // Fetches suggested results
        fetchDataAndSetResult(event.target.value);
    };

    const fetchDataAndSetResult = async (input: string) => {
        const result = await getSearchResult(input);
        setSearchResult(result);
    };

    const handleSearchResult = (
        location: string,
        latitude: number,
        longitude: number
    ) => {
        // Updates app states
        onSearchResultClick(location, latitude, longitude);
        // Hide the search result list when a city is clicked
        setSearchResult(null);
        // Clears the input field after a city is clicked
        setSearchValue("");
    };

    return (
        <div>
            <input
                type="search"
                placeholder="Search locations"
                value={searchValue}
                /* React automatically passes the event object as an argument to
                            the event handlers when they are called,
                            so you can access and interact with the event data
                            within your event handler function. */
                onChange={handleChange}
            />
            {searchResult && (
                <SearchList
                    arr={searchResult}
                    onSearchResultClick={handleSearchResult}
                />
            )}
        </div>
    );
};

export default Search;
