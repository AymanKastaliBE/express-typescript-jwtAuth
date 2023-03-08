In order to test this API, you have to follow the steps listed below:   
1- Run command `npm install` to install the dependencies and create node_modules folder.
2- Change the value of const accessTokenKey located in `src/utils/jwt.utils.ts` to a random secret key.
3- Change the value of const port located in `srs/index.ts` to a port like (3000 or 4000).
4- Run command `npm run dev` to run the local server.
5- Open postman to test endpoints.
6- Create POST request to URL `localhost:<YOUR-PORT>/api/session`, in the body panel select json from the dropdown menu.
7- Insert this data in the empty area as shown: {"email": "ayman@test.com", "password": "password"}, and hit send.
8- You will get a response as showen below:
{
    "sessionId": "1",
    "email": "ayman@test.com",
    "valid": true,
    "name": "Ayman Kastali"
}.
8- Open cookies on the right side, you will get two cookies: accessToken and refreshToken, those cookies will carry the values of jwt tokens plus some extra details.
9- AccessToken and RefreshToken values will prompted in the console, copy the access token value to use later.
10- Do GET request to URL `localhost:<YOUR-PORT>/api/get-session`, and open Authorization panel then select Bearer Token and paste accessToken value, then hit send.
11- You will get a response as shown below:
{
    "email": "ayman@test.com",
    "name": "Ayman Kastali",
    "sessionId": "1",
    "iat": 1678285238,
    "exp": 1678285248
}.
12- You will still have access to this URL as long as the accessToken in valid, once its expired, a new accessToken will be generated using refreshToken, and you will still have access to this URL until refreshToken is expired (accessToken expires in 10 seconds - refreshToken expires in 20 seconds in this code).
13- Do DELETE request to URL `localhost:<YOUR-PORT>/api/delete-session` to delete the session and empty the values of accessToken and refreshToken, and signout.