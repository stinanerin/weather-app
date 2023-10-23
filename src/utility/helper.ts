import { getLocationData } from "./api";

export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    // Months are 0 based, hence add one
    const month = dateObj.getMonth() + 1;

    return `${day}/${month}`;
};

export const getWeekday = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    return weekdays[day];
};

const weekdays = Array.from({ length: 7 }, (e, i) => {
    return new Date(0, 0, i).toLocaleDateString("en", {
        weekday: "long",
    });
});

export const datesAreEqual = (d1: Date, d2: Date) => {
    return d1.toDateString() === d2.toDateString();
};

export const calculateMean = (arr: number[]) => {
    const sum = arr.reduce((acc, num) => acc + num, 0);

    const mean = sum / arr.length;

    return mean;
};

export const toUpperCaseStr = (str: string) =>
    str
        .split(" ")
        .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        })
        .join(" ");

export const getLocation = async (latitude: number, longitude: number) => {
    try {
        if (latitude !== null && longitude !== null) {
            const locationData = await getLocationData(longitude, latitude);
            return locationData.city;
        }
    } catch (error) {
        console.warn("Error while fetching location data", error);
    }
};
