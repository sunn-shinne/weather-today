// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  openWeather: {
    // Free
    // 60 calls/minute
    // 1,000,000 calls/month
    // Current Weather, 3-hour Forecast 5 days, Basic weather maps, Weather Dashboard, Air Pollution API, Geocoding API, Weather widgets
    API_key: 'a7e393f0a0981631b74787f5b1ea2c52',
  },
  weatherbit: {
    // Non-Commercial use only
    // 500 calls/day
    // 16 day forecasts
    //API_key: 'b2366fc061e14534a702af4f64801473',
    // 500 calls/day
    API_key: '87817d0af3aa492dbfc7eb6ee9bb48bc',
  },
  geoapify: {
    API_key: '0bf19c647a9d45ca82151ca13339a341',
  },
  ipgeolocation: {
    API_key: '32e4db999ed54cdfaa2d17bf5eea3273'
  },
  weatherapi: {
    API_key: 'ce26cda531d7423991d70413222507'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
