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

// export const calculateFrequentNum = (arr: number[]) => {

//     let maxcount = 0;
//     let element_having_max_freq;

//     const n = arr.length

//     for (let i = 0; i < n; i++) {
//         let count = 0;
//         for (let j = 0; j < n; j++) {
//             if (arr[i] == arr[j])
//                 count++;
//         }

//         if (count > maxcount) {
//             maxcount = count;
//             element_having_max_freq = arr[i];
//         }
//     }

//     return element_having_max_freq;

// }

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
