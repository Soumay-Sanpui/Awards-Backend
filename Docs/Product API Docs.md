API Documentation
=================

User Management Endpoints
-------------------------

### Register User

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
        "orders": []
    }

**Responses:**

*   **201 Created:** New user created successfully.
*   **500 Internal Server Error:** Unable to create a new user.

### Login User

**Endpoint:** `POST /user/login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**

    {
        "username": "string",
        "email": "string",
        "password": "string"
    }

**Responses:**

*   **200 OK:** Login successful, returns JWT token.
*   **401 Unauthorized:** Invalid credentials.
*   **500 Internal Server Error:** Unable to login.

### View Single User

**Endpoint:** `GET /user/viewUser/:id`

**Description:** Fetches a user by ID.

*   `id` (path parameter): The ID of the user to fetch.

**Responses:**

*   **200 OK:** User fetched successfully.
*   **404 Not Found:** No user found with the given ID.
*   **500 Internal Server Error:** Unable to fetch user.

### View User by Username

**Endpoint:** `GET /user/search/:username`

**Description:** Fetches a user by username.

*   `username` (path parameter): The username of the user to fetch.

**Responses:**

*   **200 OK:** User fetched successfully.
*   **404 Not Found:** No user found with the given username.
*   **500 Internal Server Error:** Unable to fetch user.

### Logout User

**Endpoint:** `GET /user/logout`

**Description:** Logs out the user.

**Responses:**

*   **200 OK:** User logged out successfully.
*   **500 Internal Server Error:** Unable to logout user.

### View All Users

**Endpoint:** `GET /admin/viewUsers`

**Description:** Fetches all users. Requires admin authentication.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Responses:**

*   **200 OK:** All users fetched successfully.
*   **404 Not Found:** No users found.
*   **500 Internal Server Error:** Unable to fetch users.

### Delete User

**Endpoint:** `GET /admin/deleteUser/:id`

**Description:** Deletes a user by ID. Requires admin authentication.

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

**Description:** Updates a user's details by ID. Requires admin authentication.

*   `id` (path parameter): The ID of the user to update.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Request Body:**

    {
        "fullName": "string",
        "email": "string",
        "phoneNumber": "string"
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

Product Management Endpoints
----------------------------

### Add New Product

**Endpoint:** `POST /admin/addProduct`

**Description:** Adds a new product. Requires admin authentication.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Request Body:**

    {
        "awardName": "string",
        "awardPrice": "number",
        "awardType": "string",
        "isAvailable": "boolean",
        "awardSample": "string",
        "samplePublicId": "string",
        "awardSize": "string"
    }

**Responses:**

*   **201 Created:** New product added successfully.
*   **500 Internal Server Error:** Unable to add product.

### View Product by ID

**Endpoint:** `GET /viewMedia/:id`

**Description:** Fetches a product by ID.

*   `id` (path parameter): The ID of the product to fetch.

**Responses:**

*   **200 OK:** Product fetched successfully.
*   **404 Not Found:** No product found with the given ID.
*   **500 Internal Server Error:** Unable to fetch product.

### View All Products

**Endpoint:** `GET /viewMedia`

**Description:** Fetches all products.

**Responses:**

*   **200 OK:** All products fetched successfully.
*   **500 Internal Server Error:** Unable to fetch products.

### Delete Product

**Endpoint:** `DELETE /admin/deleteMedia/:id`

**Description:** Deletes a product by ID. Requires admin authentication.

*   `id` (path parameter): The ID of the product to delete.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Responses:**

*   **200 OK:** Product deleted successfully.
*   **404 Not Found:** No product found with the given ID.
*   **500 Internal Server Error:** Unable to delete product.

### Update Product

**Endpoint:** `PATCH /admin/updateMedia/:id`

**Description:** Updates a product's details by ID. Requires admin authentication.

*   `id` (path parameter): The ID of the product to update.

> Note: This endpoint requires a valid Bearer token in the Authorization header.

**Headers:**

*   `Authorization: Bearer token`

**Request Body:**

    {
        "awardName": "string",
        "awardPrice": "number",
        "awardType": "string",
        "isAvailable": "boolean",
        "awardSample": "string",
        "samplePublicId": "string",
        "awardSize": "string"
    }

**Responses:**

*   **200 OK:** Product details updated successfully.
*   **404 Not Found:** No product found with the given ID.
*   **500 Internal Server Error:** Unable to update product details.

### Get Stripe Config

**Endpoint:** `GET /prConfig`

**Description:** Fetches the Stripe publishable key.

**Responses:**

*   **200 OK:** Returns the Stripe publishable key.

### Create Payment Intent

**Endpoint:** `POST /cpi`

**Description:** Creates a payment intent using Stripe.

**Responses:**

*   **200 OK:** Payment intent created successfully.
*   **500 Internal Server Error:** Unable to create payment intent.