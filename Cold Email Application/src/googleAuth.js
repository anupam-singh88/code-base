// import config from "./config/index.js";
// console.log("🚀 ~ config:", config)

// const googleAuthData = {
//   type: config.GOOGLE_TYPE,
//   project_id: config.GOOGLE_PROJECT_ID,
//   private_key_id: config.GOOGLE_PRIVATE_KEY_ID,
//   private_key: config.GOOGLE_PRIVATE_KEY_ID,
//   client_email: config.GOOGLE_CLIENT_EMAIL,
//   client_id: config.GOOGLE_CLIENT_ID,
//   auth_uri: config.GOOGLE_AUTH_URI,
//   token_uri: config.GOOGLE_TOKEN_URI,
//   auth_provider_x509_cert_url: config.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: config.GOOGLE_CLIENT_X509_CERT_URL,
//   universe_domain: config.GOOGLE_UNIVERSE_DOMAIN,
// };

// export default googleAuthData;
const googleAuthData = {
  type: "service_account",
  project_id: "cold-emailer-450006",
  private_key_id: "6ae6fe2bf25da0640c8d8ec2e92aa37dc606c906",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeF+UWXnWGBeaq\nZDra/+wtZHVb2NfCGW86rAnTKaKBiqyK8zAnetIwDKlixQEVs7tUmM9E2SAtn9qN\nsSoRo4e9HR5ovtWkbhrvbzcszrn5HWnhthWa/d9S6PSbP/aaa51y8mcOSWRSw7xg\nGGYkHWJbmzbbYytGbBnCf1wBhp1fChsAGYQ84/22S5+ESwXYwOnW3xIHs93A803p\n7KdhVDQ1SFF4xPEEcWB3vvXE1u8i3krU0augVvZaStFVMUMBHQoxeoOf/VjBvV+S\nIziyIMo1rZPaSrPOOgRvTDmEVDremfjylin3/NJewGxQe3pYWsaGDxJZeF9KAVlx\n/Hc/Ng2hAgMBAAECggEAARxODTOCYoHgGtmPHTyhq+kaducXP/foDspogGc+2iRl\nh5y70tFFTCbTwu7QfsFj5WcY1URQcSxGHJL844ZCwLQzFz/Bdu1Jv7kIF7eJATKd\nCC5nFQXvV00wluRSCsfaLcZAcGnTMODjUO1OwsKRUlDA0PJ73vWhijfbM4I1oAoK\ni2zsvVEpx36lg2plscxQnpMNsqFb/lWV6j02g6l3f3lEmjOCXsHrTXl5m7lwTWP7\npLccdaUH7AzB/msdcxNjLlYERCtLEIu8DVySgdrTNyO1Sp3D4JMcCW6jLjpsWwf9\nh5u55S83YrY6oroHnZH2JfTj8ZdTPFZdgNyY3X/+EQKBgQDOzrMX7mSkxlzw9oNu\n8hEUyLUasJf5/cKePqWCs2uxh6TMXTNe1ODLtomMbU6MjUB1BGULM09UB4Lt1mMd\n3HcM6uMiHdQRvXfl996+oKaRu9HjEK/CNWHB+Xdzifjrn9kUoRAsp+duQmvyX0SW\neK4ntfi/lupHCbGjOI4Bi7/QAwKBgQDDss6otBKLTixLVBrbo18oE24GZbhaIrIw\ndHl1UyX8RuXIBjel5ZSE/hoQw6x83gK6as00ZP+qno6CuN3JykKMyZRYWWqhWNMt\nKCp+i0gpnU2g/AQ3DFPXgFAJfrUsObBf7yuMUr+0mBiFD8WiUnVG14GefL0xAvFg\nOfVIypq0iwKBgHOzDl0wIRxSYcLpl2Slhsri8vdInu3ce1o+4Cf8Kx76LUesSMYg\nQNeXeuKWcKCPkeUlnUYj4Zi4Txayn2cgZXZTntkCaRe3sXF2OCbcB/R2aJkpR7tW\nVCfKYnrAUQO5vSAeb8cb9I0qGexSQjQQthY/ZzgAvXcaxEf1pvTUc25zAoGAGqOH\nYA2LDK1qeCKNuWImvNTQQEyuaI6ahOAF/IOCAzI/axf1kT6MFgJk1+1a2HB8HJYX\nMs+gwb/tlDvH7QT8RB/YcqJRUn8918LE7g7VltyTyZskk7241/febTxzOv7rVFPB\nMMu+zr15cPtxoqPo1OjW+xTtx/MnmjqpeewiXPsCgYEArngMg23Q9vZmPKtanBZq\nXWGYqF2n9lCWY36R+8XY7QuO3bcKgxOabnvKdndwrb8rCMPsWfVv3j8DvP4oLAoq\n6D8uW7rcsAW8fn+AGMIookZKM01/h3WlB9Djh954E8He1Q825H+FE5tKX/BQWGAA\nXCSWTgY9/80BbJ+KMp3DvhM=\n-----END PRIVATE KEY-----\n",
  client_email:
    "owner-service-account@cold-emailer-450006.iam.gserviceaccount.com",
  client_id: "117719690379081835709",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/owner-service-account%40cold-emailer-450006.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export default googleAuthData;
