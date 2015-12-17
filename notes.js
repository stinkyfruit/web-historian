//Asynchronously append data to a file, creating the file if it does not yet exist. data can be a string or a buffer.

fs.appendFile('message.txt', 'data to append', function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});


//Tests a user's permissions for the file specified by path. mode is an optional integer that specifies the accessibility checks to be performed. The following constants define the possible values of mode. It is possible to create a mask consisting of the bitwise OR of two or more values.

fs.access('/etc/passwd', fs.R_OK | fs.W_OK, function (err) {
  console.log(err ? 'no access!' : 'can read/write');
});
