# next-level-assignment-2

# Instruction for how to use this app on a local computer

- First clone the repository to your local computer
- We assume you have VS code and node installed in your computer
- After opening the folder on vs code simply run the below command on your terminal

\*\* use `npm i` to add all the depedencise
\*\* to build use `npm run build`
\*\* to start the app use `npm run start:dev`

<< -- Your app is ready to go !! -->>

# Follow the below instruction to get, update, delete and edit data into database

- To create a user and get all users use the below link with post and get methods

* http://localhost:5000/api/users

- To get, edit, and delete single user use the below link with get, put, and delete methods

* http://localhost:5000/api/users/:userId

- To update and get all orders for a single user use the below link with get and put methods

* http://localhost:5000/api/users/:userId/orders'

- To get a user's all order total price use the below link with get method

* http://localhost:5000/api/users/:userId/orders/total-price'

\*\*\* Please add the .env file from eamil
