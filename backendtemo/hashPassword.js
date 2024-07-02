const bcrypt = require('bcryptjs');

const password = "ywjtest"; // Replace this with the password you want to hash
const saltRounds = 10; // Number of salt rounds for hashing

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error hashing password:", err);
        return;
    }
    console.log("Hashed Password:", hash);
    // You can now use this hash to insert into your database
});
