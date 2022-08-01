export interface SunriseSunset {
    location: {
        latitude: number,
        longitude: number
    },
    date: string,
    current_time: string,
    sunrise: string,
    sunset: string,
    sun_status: string,
    solar_noon: string,
    day_length: string,
    sun_altitude: number,
    sun_distance: number,
    sun_azimuth: number,
    moonrise: string,
    moonset: string,
    moon_status: string,
    moon_altitude: number,
    moon_distance: number,
    moon_azimuth: number,
    moon_parallactic_angle: number
}