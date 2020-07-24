Authentication

- [x] Create server
- [x] Add auth to router
- [x] Create user with auth/post - [x] Validate Requiered fields - [x] Check if user is unique - [x] hash password - [x] store new user in db -[x] Login user with auth/login
      [x] Validate
      [x] check if user is in db

Quotes - route
GET http://localhost:5000/quote/:quoteId -> Gets specific quote - NOT PROTECTED
POST http://localhost:5000/quote/createQuote -> Submits to the server a new quote - PROTECTED
PATCH http://localhost:5000/quote/addLike -> Increases the amount of likes by 1 to quoteId
PATCH http://localhost:5000/quote/addview -> Increases the amount of views by 1 to quoteId
DELETE http://localhost:5000/quote/delete -> Deletes quote corresponding to quoteId - PROTECTED
