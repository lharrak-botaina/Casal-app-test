// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host : 'http://localhost:3000/',
  API : "http://localhost:3000/api",
  PASSWORK_DOCS_HOST : 'http://localhost:3000/passworks/',
  ASSOCIATIONS_DOCS_HOST : 'http://localhost:3000/associations/',
  JUSTIFICATION_DOCS_HOST : 'http://localhost:3000/youth/justifications/',
  DOCUMENTS_DOCS_HOST : 'http://localhost:3000/documents/',
  YOUNG_PHOTO_HOST : 'http://localhost:3000/youth/photos/',
  COMPANY_LOGO_HOST : 'http://localhost:3000/companies/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
