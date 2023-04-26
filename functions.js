// Learn to transform a JavaScript Object to an array
let scrimbaUsers = {
  "00": "sindre@scrimba.com",
  "01": "per@scrimba.com",
  "02": "frode@scrimba.com",
};

// That's what we want ⬇️
// console.log(Object.keys(scrimbaUsers));
// console.log(Object.values(scrimbaUsers));
// console.log(Object.entries(scrimbaUsers));

// Challenge: Create a let variable called 'scrimbaUsersEmails' and use one of Object methods to set it equal to an array with the values

let scrimbaUsersEmails = Object.values(scrimbaUsers);

// Challenge: Create a let variable called 'scrimbaUsersIDs' and use one of Object methods to set it equal to an array with the keys

let scrimbaUsersIDs = Object.keys(scrimbaUsers);

// Challenge: Create a let variable called 'scrimbaUsersEntries' and use one of Object methods to set it equal to an array with the both the keys and values

scrimbaUsersEntires = Object.entries(scrimbaUsers);
