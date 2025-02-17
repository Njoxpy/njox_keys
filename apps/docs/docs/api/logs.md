---

### **Log CRUD Operations**

---

### **1. Create Log** - `POST /api/v1/logs`

- **Description**: This endpoint allows admins to manually create a log entry for actions performed in the system, such as creating or deleting users, updating venues, etc.

- **Parameters**:
  - `action`: The type of action performed (e.g., "User Created", "Venue Updated", "User Deleted").
  - `userId`: The ID of the user who performed the action.
  - `details`: A description of the action performed (optional).
  - `timestamp`: The timestamp of when the action occurred (auto-generated).
  
- **Request Body**:

```json
{
  "action": "User Created",
  "userId": "admin123",
  "details": "Admin user created a new employee user account with email godbless.nyagawa@example.com"
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Log created successfully.",
  "data": {
    "_id": "log_id_1",
    "action": "User Created",
    "userId": "admin123",
    "details": "Admin user created a new employee user account with email godbless.nyagawa@example.com",
    "timestamp": "2025-02-17T12:00:00.000Z"
  }
}
```

- **Response Codes**:
  - **201 CREATED**: Log successfully created.
  - **400 BAD REQUEST**: Missing or invalid fields in the request.

---

### **2. Get All Logs** - `GET /api/v1/logs`

- **Description**: Retrieve a list of all logs in the system.

- **Response**:

```json
[
  {
    "_id": "log_id_1",
    "action": "User Created",
    "userId": "admin123",
    "details": "Admin user created a new employee user account with email godbless.nyagawa@example.com",
    "timestamp": "2025-02-17T12:00:00.000Z"
  },
  {
    "_id": "log_id_2",
    "action": "Venue Updated",
    "userId": "admin123",
    "details": "Admin updated the capacity of Conference Hall A to 350",
    "timestamp": "2025-02-17T12:05:00.000Z"
  }
]
```

- **Response Codes**:
  - **200 OK**: Returns the list of logs.
  - **204 No Content**: If no logs are available.

---

### **3. Get Log by ID** - `GET /api/v1/logs/:id`

- **Description**: Retrieve a specific log by its ID.

- **Response**:

```json
{
  "_id": "log_id_1",
  "action": "User Created",
  "userId": "admin123",
  "details": "Admin user created a new employee user account with email godbless.nyagawa@example.com",
  "timestamp": "2025-02-17T12:00:00.000Z"
}
```

- **Response Codes**:
  - **200 OK**: Returns the log by its ID.
  - **404 NOT FOUND**: If the log with the given ID is not found.

---

### **4. Update Log** - `PUT /api/v1/logs/:id`

- **Description**: Allows an admin to update a specific log entry, though this is less common since logs are typically immutable. This operation might be used for minor corrections or updates (e.g., fixing a typo in the details).

- **Parameters**:
  - `action`: The type of action performed (optional).
  - `userId`: The ID of the user who performed the action (optional).
  - `details`: A description of the action performed (optional).
  
- **Request Body**:

```json
{
  "details": "Admin user created a new employee user account with email jane.smith@example.com"
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Log updated successfully.",
  "data": {
    "_id": "log_id_1",
    "action": "User Created",
    "userId": "admin123",
    "details": "Admin user created a new employee user account with email jane.smith@example.com",
    "timestamp": "2025-02-17T12:00:00.000Z"
  }
}
```

- **Response Codes**:
  - **200 OK**: Log successfully updated.
  - **404 NOT FOUND**: If the log with the given ID does not exist.
  - **400 BAD REQUEST**: If any invalid data is passed.

---

### **5. Delete Log** - `DELETE /api/v1/logs/:id`

- **Description**: Allows an admin to delete a specific log by its ID. However, logs are typically kept for auditing purposes and may not be deleted in some systems.

- **Response**:

```json
{
  "status": "success",
  "message": "Log deleted successfully."
}
```

- **Response Codes**:
  - **200 OK**: Log successfully deleted.
  - **404 NOT FOUND**: If the log with the given ID is not found.

---

### **6. Get Total Log Count** - `GET /api/v1/logs-total`

- **Description**: Retrieves the total number of logs in the system.

- **Response**:

```json
{
  "totalCount": 10
}
```

- **Response Codes**:
  - **200 OK**: Successfully returns the total count of logs.
  - **204 No Content**: If no logs exist.

---

### **Example Flow for Log Operations:**

1. **Admin creates a log entry**:
   - POST `/api/v1/logs` with the action details.
   - Response: Log entry created successfully.

2. **Get all logs**:
   - GET `/api/v1/logs`.
   - Response: List of all logs.

3. **Get a specific log**:
   - GET `/api/v1/logs/:id`.
   - Response: Details of the log.

4. **Update a log**:
   - PUT `/api/v1/logs/:id` with updated details.
   - Response: Log updated successfully.

5. **Delete a log**:
   - DELETE `/api/v1/logs/:id`.
   - Response: Log deleted successfully.

6. **Get total log count**:
   - GET `/api/v1/logs-total`.
   - Response: Returns the total count of logs.

---

### **Security & Validation Notes**

- Make sure to authenticate and authorize the user making the request to access the logs, especially when dealing with **log management**.
- Logs should generally not be altered once created, so consider limiting update and delete operations to admins only.
- Consider adding additional filters for log retrieval, like filtering by user, action type, or time range to make logs more useful.
