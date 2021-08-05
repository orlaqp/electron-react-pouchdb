// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  db: {
    contentLocal: 'content',
    contentRemote: 'http://localhost:5984/kiosk-cache',
    ordersLocal: 'orders',
    ordersRemote: 'http://localhost:5984/kiosk-orders',

  }
};
