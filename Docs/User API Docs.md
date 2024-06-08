User Management API Documentation
=================================

This documentation provides detailed information about the endpoints available in the User Management API. It includes descriptions of the endpoints, the parameters they accept, the expected responses, and any required headers.

Table of Contents
-----------------

###   User Routes

*   [Register a New User](#register-a-new-user)
*   [Login User](#login-user)
*   [View User by ID](#view-user-by-id)
*   [Search User by Username](#search-user-by-username)
*   [Logout User](#logout-user)

###   Admin Routes

*   [View All Users](#view-all-users)
*   [Delete User](#delete-user)
*   [Update User](#update-user)
*   [Get Pass Key](#get-pass-key)

User Routes
-----------

### Register a New User

**Endpoint:** `POST /user/register`

**Description:** Registers a new user.

**Request Body:**

    {
        "fullName": "string",
        "username": "string",
        "orgName": "string",
        "email": "string",
        "password": "string",
        "phoneNumber": "string",
        "role": "string",
        "orders": "array"
    }

**Responses:**

*   **201 Created:** New user created.
*   **500 Internal Server Error:** Unable to create new user.

### Login User

**Endpoint:** `POST /user/login`

**Description:** Logs in a user.

**Request Body:**

    {
        "username": "string",
        "email": "string",
        "password": "string"
    }

**Responses:**

*   **200 OK:** Login successful. Returns a JWT token.
*   **401 Unauthorized:** Invalid credentials.
*   **500 Internal Server Error:** Unable to login.

### View User by ID

**Endpoint:** `GET /user/viewUser/:id`

**Description:** Retrieves a user by their ID.

**Parameters:**

*   `id` (path parameter): The ID of the user to retrieve.

**Responses:**

*   **200 OK:** User retrieved successfully.
*   **404 Not Found:** No user found with the given ID.
*   **500 Internal Server Error:** Unable to fetch user.

### Search User by Username

**Endpoint:** `GET /user/search/:username`

**Description:** Retrieves a user by their username.

**Parameters:**

*   `username` (path parameter): The username of the user to retrieve.

**Responses:**

*   **200 OK:** User retrieved successfully.
*   **404 Not Found:** No user found with the given username.
*   **500 Internal Server Error:** Unable to fetch user.

### Logout User

**Endpoint:** `GET /user/logout`

**Description:** Logs out a user.

**Responses:**

*   **200 OK:** User logged out successfully.
*   **500 Internal Server Error:** Unable to logout user.

Admin Routes
------------

### View All Users

**Endpoint:** `GET /admin/viewUsers`

**Description:** Retrieves all users. Requires authentication.

> Note: Endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Responses:**

*   **200 OK:** All users fetched.
*   **404 Not Found:** No users in the database.
*   **500 Internal Server Error:** Unable to fetch users.

### Delete User

**Endpoint:** `GET /admin/deleteUser/:id`

**Description:** Deletes a user by their ID. Requires authentication.

**Parameters:**

*   `id` (path parameter): The ID of the user to delete.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Responses:**

*   **200 OK:** User deleted successfully.
*   **404 Not Found:** No user found with the given ID.
*   **500 Internal Server Error:** Unable to delete user.

### Update User

**Endpoint:** `POST /admin/updateUser/:id`

**Description:** Updates a user's details. Requires authentication.

**Parameters:**

*   `id` (path parameter): The ID of the user to update.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Request Body:**

    {
        "fullName": "string",
        "username": "string",
        "orgName": "string",
        .
        .
        .
        .
        "orders": "array"
    }

**Responses:**

*   **200 OK:** User details updated successfully.
*   **404 Not Found:** No user found with the given ID.
*   **500 Internal Server Error:** Unable to update user details.

### Get Pass Key

**Endpoint:** `GET /admin/getPassKey`

**Description:** Generates a pass key for admin use. Requires authentication.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Responses:**

*   **200 OK:** Pass key generated successfully.