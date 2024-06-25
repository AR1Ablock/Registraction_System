const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InVzZXIiLCJpYXQiOjE3MTY5NzMyNjYsImV4cCI6MTcxNzA1OTY2Nn0.fzVGAMPKl1wMWS7q6D7JbTxBPD6CEJxYCjEPPvU1pWE';const decoded = jwt.decode(token);

console.log(decoded);
