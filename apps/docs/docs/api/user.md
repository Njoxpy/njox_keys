---

### 1. **GET `/api/v1/users`** - Retrieve List of Users

- **Description**: Retrieves a list of users. Only users with the `admin` role can access this endpoint.

- **Parameters**:
  - `userId`: The `userId` of the admin requesting the list (for authentication purposes).

- **Response**:
  - **200 OK**: Returns a list of users.
  - **204 No Content**: If no users exist.

```json
[
    {
        "_id": "67a4446de92db4382674a191",
        "first-name": "John",
        "last-name": "Doe",
        "email": "john.doe@example.com",
        "registration-number": "2025-XYZ-001",
        "password": "$2b$12$Eey1nYadEpnB8vgSwqy0CeIAk4kFIlJbrMIq9gw99L9rm3uFYsYpa",
        "role": "admin",
        "createdAt": "2025-02-06T05:11:09.134Z",
        "updatedAt": "2025-02-06T05:11:09.134Z",
        "__v": 0
    },
    {
        "_id": "679ba6de6b93229d8e7e7652",
        "first-name": "Jane",
        "last-name": "Smith",
        "email": "jane.smith@example.com",
        "registration-number": "2025-XYZ-002",
        "password": "$2b$12$wj11pDmdprRgE974f6q63OkmXCunTsg0VlRKW5jAjQ.NGtBN8csf.",
        "role": "employee",
        "createdAt": "2025-01-30T16:20:46.445Z",
        "updatedAt": "2025-02-02T07:40:30.390Z",
        "__v": 0
    }
]
```

- **Response Codes**:
  - **200 OK**: List of users returned successfully.
  - **204 No Content**: No users found.

---

### 2. **POST `/api/v1/users`** - Create New User

- **Description**: Adds a new user to the system. An admin is required to enter details such as `first-name`, `last-name`, `email`, `registration number`, and `password`. Passwords must be securely hashed using bcrypt before storing.

- **Parameters**:
  - `first-name`: The user’s first name.
  - `last-name`: The user’s last name.
  - `email`: The user’s email address.
  - `registration-number`: A unique registration number.
  - `password`: A secure password for the user.
  - `role`: The user’s role, which should either be `admin` or `employee`.

- **Request Body**:
  
```json
{
  "first-name": "Njox",
  "last-name": "Nyagawa",
  "email": "njox@gmail.com",
  "registration-number": "22123333",
  "password": "password_here",
  "role": "admin"
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "User account created successfully.",
  "data": {
    "first_name": "Njox",
    "last_name": "Nyagawa",
    "email": "njox@gmail.com",
    "registration_number": "22123333",
    "token": "generated_jwt_token_here"
  }
}
```

- **Response Codes**:
  - **201 CREATED**: User created successfully.
  - **400 BAD REQUEST**: Missing or invalid fields (e.g., missing `first-name`, invalid `role`).
  - **401 UNAUTHORIZED**: User does not have `admin` role.

---

### 3. **GET `/api/v1/users-total`** - Get Total Number of Users

- **Description**: Retrieves the total number of users on the website.

- **Parameters**:
  - `userId`: The `userId` of the admin requesting the list (for authentication).

- **Response**:

```json
{
  "totalCount": 5
}
```

- **Response Codes**:
  - **200 OK**: Total user count returned.
  - **204 No Content**: No users found (count = 0).

---

### 4. **GET `/api/v1/users/:id`** - Retrieve User by ID

- **Description**: Retrieves a specific user by their `id`.

- **Parameters**:
  - `userId`: The `userId` of the admin requesting the user information (for authentication).

- **Response**:

```json
{
  "_id": "67a4446de92db4382674a191",
  "first-name": "John",
  "last-name": "Doe",
  "email": "john.doe@example.com",
  "registration-number": "2025-XYZ-001",
  "password": "$2b$12$Eey1nYadEpnB8vgSwqy0CeIAk4kFIlJbrMIq9gw99L9rm3uFYsYpa",
  "role": "admin",
  "createdAt": "2025-02-06T05:11:09.134Z",
  "updatedAt": "2025-02-06T05:11:09.134Z",
  "__v": 0
}
```

- **Response Codes**:
  - **200 OK**: Returns user details by `id`.
  - **404 NOT FOUND**: User not found.

---

### 5. **PUT `/api/v1/users/:id`** - Update User Details

- **Description**: Updates a user’s details by `id`. This includes fields like `first-name`, `last-name`, `email`, `registration-number`, `password`, and `role`.

- **Parameters**:
  - `userId`: The `userId` of the admin requesting the update (for authentication).

- **Request Body**:

```json
{
  "first-name": "John",
  "last-name": "Doe",
  "email": "john.doe@newdomain.com",
  "registration-number": "2025-XYZ-001",
  "password": "newpassword_here",
  "role": "employee"
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "User details updated successfully.",
  "data": {
    "_id": "67a4446de92db4382674a191",
    "first-name": "John",
    "last-name": "Doe",
    "email": "john.doe@newdomain.com",
    "registration-number": "2025-XYZ-001",
    "password": "$2b$12$Eey1nYadEpnB8vgSwqy0CeIAk4kFIlJbrMIq9gw99L9rm3uFYsYpa",
    "role": "employee",
    "createdAt": "2025-02-06T05:11:09.134Z",
    "updatedAt": "2025-02-06T05:11:09.134Z"
  }
}
```

- **Response Codes**:
  - **200 OK**: User updated successfully.
  - **404 NOT FOUND**: User not found.

---

### 6. **DELETE `/api/v1/users/:id`** - Delete User by ID

- **Description**: Deletes a user by their `id`.

- **Parameters**:
  - `userId`: The `userId` of the admin requesting the deletion (for authentication).

- **Response**:

```json
{
  "status": "success",
  "message": "User deleted successfully."
}
```

- **Response Codes**:
  - **200 OK**: User deleted successfully.
  - **404 NOT FOUND**: User not found.

---

### Security Notes

- Always hash the passwords using a secure hashing algorithm like bcrypt before storing them in the database.
- Never return sensitive data, such as passwords, in API responses.
- Ensure role-based access control (RBAC) is implemented, allowing only users with the `admin` role to access endpoints for creating, updating, or deleting users.
