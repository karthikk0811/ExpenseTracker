
# Expense Tracker

Follow the below steps to run the app on your local server.

1.Clone the mentioned repository.(https://github.com/NitinReddy01/ExpenseTracker) 
```bash
  git clone https://github.com/NitinReddy01/ExpenseTracker
```
2.Run command `npm install` to install all the packages in both client ans server.

3.You need to create a .env file in server directory and add these
```bash
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
MONGO_URL=
PORT=
```
4.Add your mongodb url and port number in .env file .

5.For access token and refresh token type the following commands terminal to generate token secrets, copy those values without quotes. Run it twice for access and refresh token. 
```bash
node

require('crypto').randomBytes(64).toString('hex')
```
6.In client in src/components/api change your base url ans also in server/config/origins add that base url.

7.Run the command `node or nodemon index.js` in server and `npm start` in client to run on your local browser.

"# ExpenseTracker" 
"# ExpenseTracker" 
