import { useState, ChangeEvent, FocusEvent, useRef, useEffect } from "react";

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
    const [showSearchList, setShowSearchList] = useState(false);

    const searchInputRef = useRef<HTMLInputElement>();
    const searchListRef = useRef<HTMLUListElement>();

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("keyup", handleTab);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("keyup", handleTab);
        };
    }, []);

    const handleTab = (e: KeyboardEvent) => {
        const activeElement = document.activeElement as HTMLElement;
        if (
            e.key === "Tab" &&
            searchListRef.current &&
            activeElement !== searchInputRef.current &&
            !searchListRef.current.contains(activeElement)
        ) {
            setShowSearchList(false);
        }
    };

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
        setShowSearchList(true);
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

    const handleDocumentClick = () => {
        const activeElement = document.activeElement;

        if (
            searchInputRef.current &&
            !searchInputRef.current.contains(activeElement) &&
            searchListRef.current &&
            !searchListRef.current.contains(activeElement)
        ) {
            // Click is outside the input field
            setShowSearchList(false);
        }
    };

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
        console.log("inside handleInputBlur");
        if (
            searchListRef.current &&
            !searchListRef.current.contains(e.relatedTarget)
        ) {
            console.log("handleInputBlur dont show list");
            setShowSearchList(false);
        }
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
                onBlur={handleInputBlur}
                ref={searchInputRef as React.RefObject<HTMLInputElement>}
            />
            {showSearchList && searchResult && (
                <SearchList
                    arr={searchResult}
                    onSearchResultClick={handleSearchResult}
                    searchListRef={
                        searchListRef as React.RefObject<HTMLUListElement>
                    }
                />
            )}
        </div>
    );
};

export default Search;
