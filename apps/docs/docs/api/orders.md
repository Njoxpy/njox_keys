To manage venues with **CRUD** (Create, Read, Update, Delete) operations, I'll provide an example for each operation, similar to how we structured the previous user operations. We’ll define endpoints and their responses for managing venues, including the required fields like name, block, capacity, and images.

### **Venue CRUD Operations**

---

### **1. Create Venue** - `POST /api/v1/venues`

- **Description**: Allows an admin to create a new venue with the required details: `name`, `block`, `capacity`, and optional `images`.

- **Parameters**:
  - `name`: The name of the venue.
  - `block`: The block where the venue is located.
  - `capacity`: The capacity of the venue (number of people it can hold).
  - `images`: A list of image URLs (optional).

- **Request Body**:

```json
{
  "name": "Conference Hall A",
  "block": "Block A",
  "capacity": 300,
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Venue created successfully.",
  "data": {
    "name": "Conference Hall A",
    "block": "Block A",
    "capacity": 300,
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "createdAt": "2025-02-17T10:00:00.000Z",
    "updatedAt": "2025-02-17T10:00:00.000Z"
  }
}
```

- **Response Codes**:
  - **201 CREATED**: Venue successfully created.
  - **400 BAD REQUEST**: If any required fields are missing or invalid (e.g., missing `name` or `capacity`).

---

### **2. Get All Venues** - `GET /api/v1/venues`

- **Description**: Retrieves a list of all venues in the system.

- **Response**:

```json
[
  {
    "_id": "venue_id_1",
    "name": "Conference Hall A",
    "block": "Block A",
    "capacity": 300,
    "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "createdAt": "2025-02-17T10:00:00.000Z",
    "updatedAt": "2025-02-17T10:00:00.000Z"
  },
  {
    "_id": "venue_id_2",
    "name": "Meeting Room B",
    "block": "Block B",
    "capacity": 50,
    "images": ["https://example.com/image3.jpg"],
    "createdAt": "2025-02-17T10:15:00.000Z",
    "updatedAt": "2025-02-17T10:15:00.000Z"
  }
]
```

- **Response Codes**:
  - **200 OK**: Returns a list of all venues.
  - **204 No Content**: If no venues are found.

---

### **3. Get Venue by ID** - `GET /api/v1/venues/:id`

- **Description**: Retrieves a specific venue by its ID.

- **Response**:

```json
{
  "_id": "venue_id_1",
  "name": "Conference Hall A",
  "block": "Block A",
  "capacity": 300,
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "createdAt": "2025-02-17T10:00:00.000Z",
  "updatedAt": "2025-02-17T10:00:00.000Z"
}
```

- **Response Codes**:
  - **200 OK**: Returns the venue by ID.
  - **404 NOT FOUND**: If the venue is not found.

---

### **4. Update Venue** - `PUT /api/v1/venues/:id`

- **Description**: Allows an admin to update a venue's details.

- **Parameters**:
  - `name`: The venue’s name.
  - `block`: The block where the venue is located.
  - `capacity`: The capacity of the venue.
  - `images`: Updated list of image URLs.

- **Request Body**:

```json
{
  "name": "Updated Conference Hall A",
  "block": "Block A",
  "capacity": 350,
  "images": ["https://example.com/updated_image1.jpg"]
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Venue updated successfully.",
  "data": {
    "name": "Updated Conference Hall A",
    "block": "Block A",
    "capacity": 350,
    "images": ["https://example.com/updated_image1.jpg"],
    "createdAt": "2025-02-17T10:00:00.000Z",
    "updatedAt": "2025-02-17T11:00:00.000Z"
  }
}
```

- **Response Codes**:
  - **200 OK**: Venue successfully updated.
  - **400 BAD REQUEST**: If required fields are invalid or missing.
  - **404 NOT FOUND**: If the venue with the given ID does not exist.

---

### **5. Delete Venue** - `DELETE /api/v1/venues/:id`

- **Description**: Allows an admin to delete a venue by its ID.

- **Response**:

```json
{
  "status": "success",
  "message": "Venue deleted successfully."
}
```

- **Response Codes**:
  - **200 OK**: Venue successfully deleted.
  - **404 NOT FOUND**: If the venue with the given ID does not exist.

---

### **6. Get Total Venue Count** - `GET /api/v1/venues-total`

- **Description**: Retrieves the total number of venues in the system.

- **Response**:

```json
{
  "totalCount": 5
}
```

- **Response Codes**:
  - **200 OK**: Successfully returns the total count of venues.
  - **204 No Content**: If no venues exist, the count will be zero.

---

### Example Flow for Venue Operations

1. **Admin creates a venue**:
   - POST `/api/v1/venues` with venue data.
   - Response: Venue created successfully.

2. **Get all venues**:
   - GET `/api/v1/venues`.
   - Response: List of all venues.

3. **Get a specific venue**:
   - GET `/api/v1/venues/:id`.
   - Response: Details of the venue.

4. **Update a venue**:
   - PUT `/api/v1/venues/:id` with updated data.
   - Response: Venue updated successfully.

5. **Delete a venue**:
   - DELETE `/api/v1/venues/:id`.
   - Response: Venue deleted successfully.

6. **Get total venue count**:
   - GET `/api/v1/venues-total`.
   - Response: Returns the total count of venues.

---

### **Security & Validation Notes**

- Make sure to validate all incoming data, especially when creating or updating venues (e.g., check that capacity is a number, and images are valid URLs).
- Ensure only admins have access to these operations for proper security.

This structure should cover all basic operations needed to manage venues in your application.
