
## Description 
Test project that allow to manage user 

1)http://localhost:3000/user/auth - allow to create user
`_curl --location --request POST 'http://localhost:3000/user/auth' \
--header 'Authorization;' \
--header 'Content-Type: application/json' \
--data-raw '{
"login":  "user1",
"password": "root"
}'`

2)http://localhost:3000/user/login - login user into system
`curl --location --request POST 'http://localhost:3000/user/login' \
--header 'Authorization;' \
--header 'Content-Type: application/json' \
--data-raw '{
"login":  "user1",
"password": "root"
}'`

3)http://localhost:3000/user/me - protected API
`curl --location --request GET 'http://localhost:3000/user/me' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXIxIiwidXNlcklkIjoyLCJpYXQiOjE2OTk2MTM3MTEsImV4cCI6MTY5OTYxNzMxMX0.YEO-hYqqr_vRF0-rzmaKps8mF2N-q5L_pc9rbFBaTdc'`

4)http://localhost:3000/user/logout - also protected API allow to logout user 
`curl --location --request GET 'http://localhost:3000/user/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXIxIiwidXNlcklkIjoyLCJpYXQiOjE2OTk2MTM3MTEsImV4cCI6MTY5OTYxNzMxMX0.YEO-hYqqr_vRF0-rzmaKps8mF2N-q5L_pc9rbFBaTdc'`

## application run with docker

```bash

docker-compose build

docker-compose up

```

## application run locally 

```bash
# development
npm run start

# watch mode
npm run start:dev

```

## Migration command

```bash
# migration create
npm run migration:create Name

# migration run
npm run migration:run

# migration rollback
npm run migration:down
```
