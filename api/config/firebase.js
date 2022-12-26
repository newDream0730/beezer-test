const fs = require('firebase-admin');
// import service account file (helps to know the firebase project details)
const serviceAccount = require("../serviceAccountKey.json");
// Intialize the firebase-admin project/account
const db = fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

module.exports = db;