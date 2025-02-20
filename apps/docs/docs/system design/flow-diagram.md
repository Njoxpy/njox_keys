# **📊 Flow Diagram**

The following flow diagram provides a visual representation of the system's process flow, from user registration and venue booking to logging activities.

![flow diagram](../assets/flow%20diagram.drawio.png)

You can also access the image directly via [this link](../assets/flow%20diagram.drawio.png).

---

## **📌 Flow Breakdown**

1. **User Registration**
   - A new **user** registers by providing their **personal information** (e.g., name, email, phone, etc.).
   - The system checks for duplicates (e.g., duplicate email).
   - Once verified, the **user** is created, and an **activation email** is sent.

2. **Login Process**
   - After registration, the **user** logs in using their credentials (email and password).
   - The system verifies credentials against the **Users** collection.
   - If successful, the user gains access to their **dashboard**.

3. **Venue Booking**
   - The user selects a **venue** from the available options.

4. **Scan User ID**
   - Before proceeding with the **order creation**, the system **scans the user’s ID** (e.g., user ID or a unique identifier).
   - The system verifies that the user exists and is eligible for booking.
   - If the user is not found or is ineligible, an error message is displayed.

5. **Create Order**
   - If the user ID is valid, the system proceeds to create an **order** with the selected venue details and the user's ID.
   - The system checks if the venue is available.
     - If available, the order is created, and booking details are stored.
     - If not available, the system notifies the user.

6. **Order Confirmation & Logging**
   - After the booking is confirmed, the **order** details are saved, and a **confirmation email** is sent to the user.
   - Every action in the system is logged using **Winston** for monitoring and debugging purposes (e.g., user actions, order creation).

7. **Admin Actions**
   - Admins can view **user data**, manage **venue information**, and view **bookings**.
   - Admin logs are captured for auditing purposes.

---

## **📌 Notes on Flow**

- The **Scan User ID** step ensures that only registered users can make bookings and prevents unauthorized access.
- The flow is designed to ensure a smooth user experience, while the **logging** step captures all important actions for monitoring and debugging.
- The **availability check** before booking is crucial to avoid overbooking of venues.

---

## **📌 Future Improvements to the Flow**

As the system scales, consider adding more steps such as:

- **Real-time venue availability**: Implementing a real-time availability feature.
- **Role-based access control (RBAC)**: Different levels of access for employees and admins, allowing for more granular control of the system.

---
