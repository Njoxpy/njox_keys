# Database Design

- This section details into how to design a database.

![database design](../assets/database%20design.drawio.png)

## Entities

- The following are the list of entities which are available into the system.

| Entity | Information about it |
|:-------| ----------------|
| Venue | Venue information such as name, block, capacity, equipments, images, status, abbreaviation. |
| Users | User using the system must have registered with the following information first-name, last-name, email, registration number, course, phone number and their role(employee or admin) |
| Order | Into each order should include name for the order venue info(name, bloc, capacity, equipments, images, status(booked)) and the userId for the person who had booked a venue |
| Logs | User using the system must have registered with the following information first-name, last-name, email, registration number, course, phone number and their role(employee or admin) |

## Note

**Into the logs we will not use the log model instead we will use the packages for logging which are winston.**

## Attributes
