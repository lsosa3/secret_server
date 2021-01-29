# Welcome to Secret server!
Secret server implementation. The secret server can be used to store and share secrets using a **random generated URL**. But the secret can be read only a limited number of times after that it will expire and won’t be available. The secret may have a **TTL** (Time to live). After the expiration time the secret won’t be available anymore.

## Install

 - Clone the repo
 - In the root folder - npm install
 - In the client folder - npm install
 - Create .env file in the root folder
	Inside the file:
		Create a MONGO_URI const with **your mongodb connection string**
		Create a SOME_32BYTE_BASE64_STRING 
		Create a SOME_64BYTE_BASE64_STRING 
		Both lasts consts are a base64 strings (a 32-byte `encryptionKey` and a 64-byte `signingKey`).
 - npm run dev

## Usage
To create a secret message fill the form and hit send. (You may set the time to live to 0 so it doesn't have a time limit)
To view a secret message fill the input hash with the **hash** and hit Search.
## Made with

 - NodeJs
 - ExpressJs
 - MongoDb
 - VueJs

## Todo

 - Had a issue with the data encryotion in mongodb could insert the data
   but could't retrieve it
 - Backend tests

## Dependencies

    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "express": "^4.17.1",
    "mongoose": "^5.11.13",
    "mongoose-encryption": "^2.0.3",
    "morgan": "^1.10.0"

# Thank you
