
export const determineWeatherIcon = (weatherCode: number) => {
    // Should there be a default icon ?????
    if (weatherCode == 0) {
        return "sun"
    } else if (weatherCode > 0 && weatherCode < 3) {
        return "cloud-sun";
    } else if (weatherCode == 3) {
        return "cloud";
    } else if (weatherCode > 3 && weatherCode < 68) {
        return "cloud-rain";
    } else if (weatherCode > 79 && weatherCode < 83) {
        return "cloud-showers-heavy";
    } else if (
        (weatherCode > 70 && weatherCode < 78) ||
        (weatherCode > 84 && weatherCode < 87)
    ) {
        return "snowflake";
    } else if (weatherCode > 94) {
        return "cloud-bolt";
    } else {
        //todo: default icon -
        return "sun";
      }
}

