import axios from "axios";

export const fetchData = async (url: string) => {
    try {
        const res = await axios.get(url);
        // console.log(res)
        return res;
    } catch (error) {
        //todo
        console.warn(error);
    }
};

export const getLocation = async (longitude: number, latitude: number) => {
    try {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,weathercode,uv_index,windspeed_10m,winddirection_10m&windspeed_unit=ms&daily=weathercode,sunrise,sunset&current_weather=true&windspeed_unit=ms&timezone=auto&localityLanguage=en`;
        const res = await fetchData(url);
        if (res === undefined) {
            throw new Error();
        }
        // console.log(res)
        return res.data;
    } catch (error) {
        //todo
        console.warn(error);
    }
};