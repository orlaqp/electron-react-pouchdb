declare const __BUILD_VERSION__: string;

export const environment = {
  production: false,
  version: __BUILD_VERSION__,
  db: {
    local: 'kiosk-cache-local',
    remote: 'http://localhost:5984/kiosk-cache'
  }
};
