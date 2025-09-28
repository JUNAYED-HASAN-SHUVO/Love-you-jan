const admin = require('firebase-admin');

// 1. EDIT THIS: Change to the actual name of your downloaded key file.
const serviceAccount = require('./your-service-account-key-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 2. EDIT THIS: Change to the email of the user you just signed up.
const adminEmail = 'rjshuvo521@gmail.com';

// This code finds the user and gives them admin powers.
admin.auth().getUserByEmail(adminEmail)
  .then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`✅ Success! ${adminEmail} is now an admin.`);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });