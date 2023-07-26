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
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        const res = await fetchData(url);
        if (res === undefined) {
            throw new Error();
        }
        return res.data;
    } catch (error) {
        //todo
        console.warn(error);
    }
};

export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    // Months are 0 based, hence add one
    const month = dateObj.getMonth() + 1;

    return `${day}/${month}`;
};

export const getWeekday = (date: string) => {
    const dateObj = new Date(date)
    const day = dateObj.getDay()
    return weekdays[day]

};

const weekdays = Array.from({ length: 7 }, (e, i) => {
    return new Date(0, 0, i).toLocaleDateString("en", {
        weekday: "long",
    });
});

