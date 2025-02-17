---

### **Venue Model**

- **name**: Name of the venue (e.g., Auditorium A)
- **block**: Block or area where the venue is located (e.g., Block A)
- **capacity**: Maximum capacity of people the venue can hold (e.g., 200 people)
- **images**: Array of image URLs (or file paths) representing the venue.

---

### 1. **GET `/api/v1/venues`** - Get All Venues

- **Description**: Retrieves a list of all venues.

- **Response**:

```json
[
  {
    "_id": "venue123",
    "name": "Auditorium A",
    "block": "Block A",
    "capacity": 200,
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "createdAt": "2025-02-17T10:00:00Z",
    "updatedAt": "2025-02-17T10:00:00Z"
  },
  {
    "_id": "venue124",
    "name": "Conference Room 1",
    "block": "Block B",
    "capacity": 50,
    "images": [
      "https://example.com/image3.jpg"
    ],
    "createdAt": "2025-02-16T14:30:00Z",
    "updatedAt": "2025-02-16T14:30:00Z"
  }
]
```

- **Response Codes**:
  - **200 OK**: List of venues returned successfully.
  - **204 No Content**: No venues found.

---

### 2. **POST `/api/v1/venues`** - Create New Venue

- **Description**: Adds a new venue to the system. The admin is required to provide the venue's `name`, `block`, `capacity`, and optional `images` array, include userId as a reponse body.

- **Request Body**:

```json
{
  "name": "Auditorium B",
  "block": "Block C",
  "capacity": 300,
  "images": [
    "https://example.com/venue-image1.jpg",
    "https://example.com/venue-image2.jpg"
  ]
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Venue created successfully.",
  "data": {
    "_id": "venue125",
    "name": "Auditorium B",
    "block": "Block C",
    "capacity": 300,
    "images": [
      "https://example.com/venue-image1.jpg",
      "https://example.com/venue-image2.jpg"
    ],
    "createdAt": "2025-02-17T15:00:00Z",
    "updatedAt": "2025-02-17T15:00:00Z"
  }
}
```

- **Response Codes**:
  - **201 CREATED**: Venue created successfully.
  - **400 BAD REQUEST**: Missing or invalid fields (e.g., missing `name`, `capacity`).
  - **401 UNAUTHORIZED**: Admin role required for this operation.

---

### 3. **GET `/api/v1/venues/:id`** - Get Venue by ID

- **Description**: Retrieves a specific venue by its `id`.

- **Response**:

```json
{
  "_id": "venue123",
  "name": "Auditorium A",
  "block": "Block A",
  "capacity": 200,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "createdAt": "2025-02-17T10:00:00Z",
  "updatedAt": "2025-02-17T10:00:00Z"
}
```

- **Response Codes**:
  - **200 OK**: Returns venue details by `id`.
  - **404 NOT FOUND**: Venue not found with the provided `id`.

---

---

### **GET `/api/v1/venues-total`** - Get Total Venue Count

- **Description**: Retrieves the total number of venues in the system.

- **Response**:

```json
{
  "totalCount": 5
}
```

- **Response Codes**:
  - **200 OK**: Successfully returns the total count of venues.
  - **204 No Content**: If there are no venues in the system, the count will be zero.

---

### Example Request & Response

#### Request

```http
GET /api/v1/venues-total
```

#### Response

```json
{
  "totalCount": 5
}
```

---

### 4. **PUT `/api/v1/venues/:id`** - Update Venue by ID

- **Description**: Updates the details of an existing venue by its `id`. You can update the `name`, `block`, `capacity`, and `images`.

- **Request Body**:

```json
{
  "name": "Updated Auditorium A",
  "block": "Block A",
  "capacity": 250,
  "images": [
    "https://example.com/updated-image1.jpg"
  ]
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Venue updated successfully.",
  "data": {
    "_id": "venue123",
    "name": "Updated Auditorium A",
    "block": "Block A",
    "capacity": 250,
    "images": [
      "https://example.com/updated-image1.jpg"
    ],
    "createdAt": "2025-02-17T10:00:00Z",
    "updatedAt": "2025-02-17T16:00:00Z"
  }
}
```

- **Response Codes**:
  - **200 OK**: Venue updated successfully.
  - **404 NOT FOUND**: Venue not found with the provided `id`.

---

### 5. **DELETE `/api/v1/venues/:id`** - Delete Venue by ID

- **Description**: Deletes a specific venue by its `id`.

- **Response**:

```json
{
  "status": "success",
  "message": "Venue deleted successfully."
}
```

- **Response Codes**:
  - **200 OK**: Venue deleted successfully.
  - **404 NOT FOUND**: Venue not found with the provided `id`.

---

### Security Notes

- Ensure only users with an `admin` role can access the POST, PUT, and DELETE endpoints for venues.
- Always validate input parameters for `capacity`, `name`, and `block` to ensure correctness (e.g., ensure `capacity` is a positive number).
- For the `images` field, you can store URLs of images or use a file upload mechanism, depending on your setup.

---

### Example Venue Data

```json
{
  "_id": "venue123",
  "name": "Auditorium A",
  "block": "Block A",
  "capacity": 200,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "createdAt": "2025-02-17T10:00:00Z",
  "updatedAt": "2025-02-17T10:00:00Z"
}
```

This is a full CRUD implementation for managing venues on your full-stack website. You can easily adjust the venue properties to meet your specific needs.
