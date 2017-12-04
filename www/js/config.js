angular.module('app')
.value('config', {
  baseUrl: "http://localhost:8000",

  // serverAPIKey: "AIzaSyARbHwTu42zvQepe-FyD6hpVfF_adaxPZk",
  // appID: "987276700971",
  // oneSignalAppID: "a8731122-4289-4d96-a01e-4771e8089f5a",
})

.value('statusHTTP', {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNAVAIBLE: 503,
});
