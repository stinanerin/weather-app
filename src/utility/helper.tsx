


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

export const getMostFrequentNum = (arr: number[]) => {

    let maxcount = 0;
    let element_having_max_freq;

    const n = arr.length

    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (arr[i] == arr[j])
                count++;
        }
 
        if (count > maxcount) {
            maxcount = count;
            element_having_max_freq = arr[i];
        }
    }
 
    return element_having_max_freq;

}