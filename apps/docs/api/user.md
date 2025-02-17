### Users

**Description**: This section handles user-related operations, such as retrieving and creating users.

**Parameters**:

- `userId`: The `userId` of the requesting admin (for authentication purposes).

---

#### GET `/api/v1/users`

- **Description**: Retrieves a list of users. Only users with the `admin` role can access this endpoint.
  
- **Parameters**:
  - `userId`: The `userId` of the admin requesting the list. The admin must be authenticated.

- **Response**:
  - **200 OK**: Returns a list of users.
  - **204 No Content**: If no users exist.

---

#### POST `/api/v1/users`

- **Description**: Adds a new user to the system. An admin is required to enter the following details: `first-name`, `last-name`, `email`, `registration number`, and `password`. Passwords must be securely hashed using bcrypt before storing.

  **Important**: The input parameters must be validated before creating the account (e.g., verifying email format, ensuring no fields are empty, and confirming the role is either `admin` or `employee`).

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
      "first_name": "Amani",
      "last_name": "Mwangosi",
      "email": "amani.mwangosi@example.com",
      "registration_number": "REG345678",
      "token": "generated_jwt_token_here"
    }
  }
  ```

- **Response Codes**:
  - **201 CREATED**: If the account is successfully created with all required fields.
  - **400 BAD REQUEST**: If any required fields are missing or invalid (e.g., missing `first-name`, invalid email, or incorrect `role`).
  - **401 UNAUTHORIZED**: If the user attempting to create a new user does not have the `admin` role.

---

**Security Note**: Always hash passwords using bcrypt or another secure hashing algorithm before storing them. Never return passwords or sensitive data in the response body.

**Role Verification**: Ensure that only users with the `admin` role can access the POST endpoint to create new users.
