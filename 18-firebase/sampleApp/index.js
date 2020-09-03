const admin = require("firebase-admin");
const fs = require('fs');

// initialize connection to database
var serviceAccount = require("./credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vtun-5e67a.firebaseio.com"
});
const db = admin.firestore();

console.log('Established connection to database');

// read from stdin
const input = fs.readFileSync(0).toString();

// write to our database, promise chaining to catch
// errors
db.collection('memos').doc().set({
    content: input,
})
.then(r => {
  console.log(`Write completed at: ${new Date()}`);
})
.catch(err => {
  console.error(`Failed to write! ${err}`);
});