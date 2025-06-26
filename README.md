Together We Blossom is a donor application portal that allows users to donate money in order to deliver flower bouquets to individuals who may need something to brighten their day. In this application all donations go to hospital patients, teachers, mental health survivors, senior citizens, and paramedics.


The link for this project can be found here: https://blaihrcustom.onrender.com/

____________________________________________________________________________________________________________________________

KEY COMPONENTS:
- User Registration and Login (Node.js/MongoDB): 
Secure user authentication using JWT. All protected routes enforce token verification to ensure privacy and ownership of authenticated users in order to create, view, update, and delete their bouquet donations. 

- User Access Control (Node.js/MongoDB):
All donation information is authenticated to the user's userId to ensure data privacy.

- Donation Creation and Editing (Node.js/MongoDB):
The user is able to:
--- Select from a list of bouquet types

--- Choose a recipient group (Teachers, Hospital Patients)

--- Pick a donation tier (Single Bouquet, Large Spread)

--- Write a personalized message

--- Set a donation status (Order Not Yet Placed, Bouquet Delivered)
***Donations marked as "Order Has Been Placed And Is Being Arranged" or "Bouquet Delivered" cannot be updated or deleted to maintain order integrity.
***All validations are enforced server-side with informative error responses.

- Frontend Interface (HTML/CSS)

_____________________________________________
TECHNOLOGICAL COMPONENTS USED:

- Core Technologies:
--- express: Web framework for handling routes and middleware.
--- mongoose: MongoDB object modeling for schema and data access.
--- dotenv: Loads environment variables from a .env file.

- Authentication & Security:
--- jsonwebtoken: Creates and verifies JWT tokens for secure login.
--- bcryptjs: Password hashing for user credentials.
session: Basic session management.
--- host-csrf: Protection against CSRF attacks.
--- helmet: Sets secure HTTP headers to harden app against common threats.
--- cors: Allows cross-origin requests.
--- xss-clean: Sanitizes user input to prevent cross-site scripting.

- Server Utilities:
--- express-async-errors: Handles async errors in routes without try/catch.
--- http-status-codes: Provides named constants for HTTP response codes.
--- express-rate-limit: Limits repeated requests to public endpoints.