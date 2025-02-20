
# **Order CRUD Operations**

---

## **1. Create Order** - `POST /api/v1/orders`

- **Description**: Allows a user to create an order for a venue, where the user selects a venue and books it with a given date and time.

- **Parameters**:
  - `venueId`: ID of the venue being booked.
  - `userId`: ID of the user making the booking.
  - `bookingDate`: The date and time the venue is booked for.
  - `status`: The status of the order (e.g., `pending`, `confirmed`).

- **Request Body**:

```json
{
  "venueId": "venue123",
  "userId": "user456",
  "bookingDate": "2025-03-10T10:00:00Z",
  "status": "pending"
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Order created successfully.",
  "data": {
    "_id": "order123",
    "venueId": "venue123",
    "userId": "user456",
    "bookingDate": "2025-03-10T10:00:00Z",
    "status": "pending",
    "createdAt": "2025-02-17T10:00:00Z",
    "updatedAt": "2025-02-17T10:00:00Z"
  }
}
```

- **Response Codes**:
  - **201 CREATED**: Order successfully created.
  - **400 BAD REQUEST**: If any required fields are missing or invalid (e.g., missing `venueId` or `bookingDate`).
  - **404 NOT FOUND**: If `venueId` or `userId` does not exist.

---

## **2. Get All Orders** - `GET /api/v1/orders`

- **Description**: Retrieves a list of all orders in the system.

- **Response**:

```json
[
  {
    "_id": "order123",
    "venueId": "venue123",
    "userId": "user456",
    "bookingDate": "2025-03-10T10:00:00Z",
    "status": "pending",
    "createdAt": "2025-02-17T10:00:00Z",
    "updatedAt": "2025-02-17T10:00:00Z"
  },
  {
    "_id": "order124",
    "venueId": "venue124",
    "userId": "user457",
    "bookingDate": "2025-03-15T14:00:00Z",
    "status": "confirmed",
    "createdAt": "2025-02-18T10:15:00Z",
    "updatedAt": "2025-02-18T10:15:00Z"
  }
]
```

- **Response Codes**:
  - **200 OK**: Returns a list of all orders.
  - **204 No Content**: If no orders are found.

---

## **3. Get Order by ID** - `GET /api/v1/orders/:id`

- **Description**: Retrieves a specific order by its ID.

- **Response**:

```json
{
  "_id": "order123",
  "venueId": "venue123",
  "userId": "user456",
  "bookingDate": "2025-03-10T10:00:00Z",
  "status": "pending",
  "createdAt": "2025-02-17T10:00:00Z",
  "updatedAt": "2025-02-17T10:00:00Z"
}
```

- **Response Codes**:
  - **200 OK**: Returns the order by ID.
  - **404 NOT FOUND**: If the order is not found.

---

## **4. Update Order** - `PUT /api/v1/orders/:id`

- **Description**: Allows an admin to update the details of an existing order.

- **Parameters**:
  - `status`: The updated status of the order (e.g., `pending`, `confirmed`).

- **Request Body**:

```json
{
  "status": "confirmed"
}
```

- **Response**:

```json
{
  "status": "success",
  "message": "Order updated successfully.",
  "data": {
    "_id": "order123",
    "venueId": "venue123",
    "userId": "user456",
    "bookingDate": "2025-03-10T10:00:00Z",
    "status": "confirmed",
    "createdAt": "2025-02-17T10:00:00Z",
    "updatedAt": "2025-02-17T11:00:00Z"
  }
}
```

- **Response Codes**:
  - **200 OK**: Order successfully updated.
  - **404 NOT FOUND**: If the order with the given ID does not exist.

---

## **5. Delete Order** - `DELETE /api/v1/orders/:id`

- **Description**: Allows an admin to delete a specific order by its ID.

- **Response**:

```json
{
  "status": "success",
  "message": "Order deleted successfully."
}
```

- **Response Codes**:
  - **200 OK**: Order successfully deleted.
  - **404 NOT FOUND**: If the order with the given ID does not exist.

---

## **6. Get Total Order Count** - `GET /api/v1/orders-total`

- **Description**: Retrieves the total number of orders in the system.

- **Response**:

```json
{
  "totalCount": 10
}
```

- **Response Codes**:
  - **200 OK**: Successfully returns the total count of orders.
  - **204 No Content**: If no orders exist, the count will be zero.

---

## Example Flow for Order Operations

1. **Create an order**:
   - POST `/api/v1/orders` with venue and user details.
   - Response: Order created successfully.

2. **Get all orders**:
   - GET `/api/v1/orders`.
   - Response: List of all orders.

3. **Get a specific order**:
   - GET `/api/v1/orders/:id`.
   - Response: Details of the order.

4. **Update an order**:
   - PUT `/api/v1/orders/:id` with updated order status.
   - Response: Order updated successfully.

5. **Delete an order**:
   - DELETE `/api/v1/orders/:id`.
   - Response: Order deleted successfully.

6. **Get total order count**:
   - GET `/api/v1/orders-total`.
   - Response: Returns the total count of orders.

---

## **Security & Validation Notes**

- Ensure only authenticated users can create orders.
- Admin users should be the only ones who can update or delete orders.
- Ensure proper validation on `bookingDate` and `status` fields for correct values.
