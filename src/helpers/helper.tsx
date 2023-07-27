


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

