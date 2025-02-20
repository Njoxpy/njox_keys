
---

### **📍 Venue Model**

- **name**: Name of the venue (e.g., Auditorium A)
- **block**: Block or area where the venue is located (e.g., Block A)
- **description**: Description about the venue.
- **capacity**: Maximum capacity of people the venue can hold (e.g., 200 people)
- **abbreviation**: Abbreviation for the venue (e.g., NLH4)
- **images**: Array of image URLs (or file paths) representing the venue.
- **status**: Status of the venue (can be "booked", "available", or "pending").

---

### Updated CRUD Endpoints

---

### **1. GET `/api/v1/venues`** - Get All Venues

- **Description**: Retrieves a list of all venues.

- **Response**:

```json
[
  {
    "_id": "67b7790a0f5d006d5c2877a0",
    "abbreviation": "ABC",
    "block": "Main St Block A1234567890",
    "capacity": 350,
    "description": "This is an example description of a venue.",
    "equipment": [
      "Projector",
      "Microphone"
    ],
    "images": [],
    "name": "New lecture hall 1",
    "status": "available",
    "__v": 0
  },
  {
    "_id": "67b779150f5d006d5c2877a2",
    "abbreviation": "ABC",
    "block": "Main St Block A1234567890",
    "capacity": 350,
    "description": "This is an example description of a venue.",
    "equipment": [
      "Projector",
      "Microphone"
    ],
    "images": [],
    "name": "New lecture hall 2",
    "status": "available",
    "__v": 0
  }
]
```

---

### **2. POST `/api/v1/venues`** - Create New Venue

- **Description**: Adds a new venue to the system. Admins must provide `name`, `block`, `capacity`, `description`, array of `equipment`, `abbreviation`,`status` and optional `images` array.

- Before creating a post for the venue check first if the name exists into the database.

- **Request Body**:

```json
{
  "name": "Auditorium B",
  "block": "Block C",
  "userId": "w3eegcr5er14qere4r",
  "abbreviation": "NLH4",
  "description": "description about the product"
  "status": "booked",
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
    "description": "description about the product"
    "status": "booked",
    "block": "Block C",
    "abbreviation": "NLH4",
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

---

### **3. GET `/api/v1/venues/:id`** - Get Venue by ID

- **Description**: Retrieves a specific venue by its `id`.

- **Response**:

```json
{
  "_id": "67b779240f5d006d5c2877a8",
  "abbreviation": "ABC",
  "block": "Main St Block A1234567890",
  "capacity": 350,
  "description": "This is an example description of a venue.",
  "equipment": [
    "Projector",
    "Microphone"
  ],
  "images": [],
  "name": "New lecture hall 4",
  "status": "available",
  "__v": 0
}
```

---

### **4. PUT `/api/v1/venues/:id`** - Update Venue by ID

- **Description**: Updates the details of an existing venue by its `id`. Updates can include the `name`, `block`, `capacity`, `abbreviation`, and `images`.

- **Request Body**:

```json
{
  "name": "Updated Auditorium A",
  "description": "description about the product"
  "block": "Block A",
  "capacity": 250,
  "abbreviation": "NLH5",
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
    "abbreviation": "NLH5",
    "description": "description about the product"
    "images": [
      "https://example.com/updated-image1.jpg"
    ],
    "createdAt": "2025-02-17T10:00:00Z",
    "updatedAt": "2025-02-17T16:00:00Z"
  }
}
```

---

### **5. DELETE `/api/v1/venues/:id`** - Delete Venue by ID

- **Description**: Deletes a specific venue by its `id`.

- **Response**:

```json
{
  "status": "success",
  "message": "Venue deleted successfully."
}
```

---

### **🔐 Security Notes**

- Ensure only users with an `admin` role can access the POST, PUT, and DELETE endpoints for venues.
- Always validate input parameters for `capacity`, `name`, `block`, `description`, and `abbreviation` to ensure correctness.
- For the `images` field, you can store URLs or use a file upload mechanism, depending on your setup.

---

### **📌 Example Venue Data**

```json
{
  "_id": "venue123",
  "name": "Auditorium A",
  "block": "Block A",
  "capacity": 200,
  "abbreviation": "NLH4",
  "description": "description about the product",
  "status": "available",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "createdAt": "2025-02-17T10:00:00Z",
  "updatedAt": "2025-02-17T10:00:00Z"
}
```
