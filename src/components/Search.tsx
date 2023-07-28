import { useEffect, useState, ChangeEvent } from "react";

import { fetchData } from "../utility/api";
import SearchList from "./SearchList";

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

const Search = () => {
    const [searchResult, setSearchResult] = useState<{ name: string; admin1: string; country: string }[] | null>(null);

    useEffect(() => {
        console.log("searchResult in useEffect:", searchResult);
    }, [searchResult]);
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value)
        fetchDataAndSetResult(event.target.value);
    };
    
    const fetchDataAndSetResult = async (input: string) => {
        const result = await getSearchResult(input);
        console.log("result", result)
        setSearchResult(result);
    };

    return (
        <>
            <label htmlFor="">
                <input
                    type="search"
                    placeholder="Search locations"
                    /* React automatically passes the event object as an argument to
                            the event handlers when they are called,
                            so you can access and interact with the event data
                            within your event handler function. */
                    onChange={handleChange}
                />
            </label>
            {searchResult && <SearchList arr={searchResult} /> }
            
        </>
    );
};

export default Search;
