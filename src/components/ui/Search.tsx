import { useEffect, useState, ChangeEvent } from "react";

import { fetchData } from "../../utility/api";
import SearchList from "./SearchList";

import { onSearchResultClick } from "../../models/OnSearchResultClick";

const getSearchResult = async (input: string) => {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${input}`;
        const res = await fetchData(url);
        if (res?.status !== 200) {
            //todo
            throw new Error();
        }
        return res?.data.results;
    } catch (error) {
        console.warn("Search result error", error);
        return error;
    }
};

const Search = ({
    onSearchResultClick,
}: {
    onSearchResultClick: onSearchResultClick;
}) => {
    const [searchResult, setSearchResult] = useState<
        | {
              id: number;
              name: string;
              admin1: string;
              country: string;
              latitude: number;
              longitude: number;
          }[]
        | null
    >(null);

    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        // console.log("searchResult in useEffect:", searchResult);
    }, [searchResult]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value)

        // Updates input field with current search value
        setSearchValue(event.target.value);
        // Fetches suggested results
        fetchDataAndSetResult(event.target.value);
    };

    const fetchDataAndSetResult = async (input: string) => {
        const result = await getSearchResult(input);
        // console.log("result", result);
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
