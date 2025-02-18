# devConnect

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- PATCH /profile/edit
- PATCH /profile/password
- GET /peofile/view

## connectionrequestRouter
- POST /request/send/:status/:userId

- POST /request/send/interested/:userId
- POST /request/send/ignorerd/:userId

- POST /request/review/:status/:requestId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET user/feed
- GET user/connections
- GET user/requests/received
-