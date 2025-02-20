# Non Functional Requirements(NFRs)

- This section details into the non-functional requirements of the project take a graze into the picture below, but some of the things will be refined as a project gets bigger.

![non-functional-requirements](../assets/non%20functional%20requirements.drawio.png)

## Security

- Implementation of the security into the website for securing the website using various methods such as using `jwt` json web token to secure the website also by using the jwt it ensures that after the user jas logs into the website we create a token each time a user has logged into a website to prevent user from common attacks, also the use of bcrpy library ofr securing the database whereby user data such as password are encrypted to prevent any attacks that might affect the performance of the website.

## Consistency

- By implementing common procedures into the project such as the use of common project structure by following the `MVC` pattern into the project also the use of `Njox  A-Z approach` into the project makes the project modular.

- project root

```md
📂 Project Root
/apps
|-- .github
│── /client        # Frontend (React)
│── /server        # Backend (Express & MongoDB)
│── /infra
│── /public
│── /tests
│── /config        # Environment & config files
│── /scripts       # Automation scripts (optional)
│── .gitignore
│── package.json
│── README.md
│── .env
│── Dockerfile
```

- frontend

```md
🖥 Frontend (React) Structure
/client
│── /public         # Static assets (favicon, manifest)
│── /src
│   │── /assets     # Images, icons, fonts, etc.
│   │── /components # Reusable components
│   │── /context    # Global state/context API
│   │── /hooks      # Custom hooks
│   │── /layouts    # Page layouts (Navbar, Sidebar)
│   │── /pages      # Page components (Home, Dashboard)
│   │── /routes     # App routing (React Router)
│   │── /services   # API calls & business logic
│   │── /store      # Redux/Zustand store (if used)
│   │── /utils      # Helper functions
│   │── App.jsx     # Root component
│   │── index.js    # React entry point
│── .env           # Frontend environment variables
│── package.json   # Frontend dependencies
│── vite.config.js # Vite config (if using Vite)
```

- 🌍 Backend (Express & MongoDB) Structure

```md
/server
│── /
│   │── /config       # DB connection & environment configs
│   │── /controllers  # Business logic for API endpoints
│   │── /middleware   # Authentication & error handling
│   │── /models       # Mongoose schemas & models
│   │── /routes       # Express route handlers
│   │── /services     # External API calls, email, etc.
│   │── /utils        # Utility functions
│   │── app.js        # Express app setup
│   │── server.js     # Server entry point
│── .env             # Backend environment variables
│── package.json     # Backend dependencies
│── nodemon.json     # Auto-restart config (for dev)
```

## Maintainability

- By using the common folder structure into the project ensures the project is modular and easier for maintaining.

## tabular

## Non-Functional Requirements

# Non-Functional Requirements (NFRs)

This document outlines the system's quality attributes, performance benchmarks, and operational constraints.

## 📌 Table of Non-Functional Requirements

| **Category**      | **Requirement**                  | **Expected Value**        | **Validation Method**            | **Tools Used** |
|------------------|--------------------------------|------------------------|--------------------------------|----------------|
| **Performance** | API Response Time              | < 200ms per request    | Load Testing                  | JMeter, k6 |
| **Performance** | Page Load Time                 | < 2s                    | Lighthouse Audit              | Google Lighthouse, WebPageTest |
| **Scalability** | Concurrent Users               | Handle 1000+ users      | Stress Testing (Simulated Load) | Locust, k6 |
| **Availability** | System Uptime                 | 99.9% uptime           | Monitoring & Alerts           | Grafana, Prometheus |
| **Security**    | Data Encryption                | AES-256 for storage, TLS for transmission | Security Audit | OWASP ZAP, Burp Suite |
| **Security**    | Authentication & Authorization | JWT & OAuth 2.0        | Penetration Testing           | OWASP ZAP, Postman |
| **Usability**   | Mobile Responsiveness         | Fully responsive UI    | UI Testing                    | BrowserStack, Percy |
| **Compliance**  | GDPR Compliance               | User consent & encryption | Security Audit | Manual Review, Compliance Checklists |
| **Maintainability** | Code Documentation       | Clear API & system docs | Manual Review | MkDocs, Swagger |
| **Reliability** | Error Recovery                 | Auto restart on failure | System Logs & Alerts | ELK Stack, Sentry |

## 🔍 Detailed Explanations

### **1. Performance Requirements**

- **API Response Time:** The system should handle API requests within **200ms** under normal load conditions.  
- **Page Load Time:** The frontend must load in **less than 2 seconds** on a standard broadband connection.  
- **Tools Used:** We use [JMeter](https://jmeter.apache.org/) for API performance testing and [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) for page speed analysis.  

### **2. Scalability Requirements**

- The system should scale to **1000+ concurrent users** with auto-scaling enabled.  
- **Load testing** will be performed using [Locust](https://locust.io/) and [k6](https://k6.io/).  

### **3. Security Requirements**

- **Data Encryption:** All sensitive data must be encrypted using **AES-256** at rest and **TLS 1.2+** for transmission.  
- **Authentication & Authorization:** Implement **JWT-based authentication** and OAuth 2.0 for secure access control.  
- **Tools Used:** We use [OWASP ZAP](https://www.zaproxy.org/) and [Burp Suite](https://portswigger.net/burp) for security audits.  

### **4. Availability & Reliability**

- System must maintain **99.9% uptime**, with **automatic failover** for critical services.  
- Error logging & monitoring will be handled using **Sentry** and **ELK Stack (Elasticsearch, Logstash, Kibana)**.  

### **5. Compliance & Maintainability**

- The system must be **GDPR-compliant**, ensuring user consent before data collection.  
- API documentation should be maintained using **Swagger** and system documentation with **MkDocs**.  

---

## 🚀 **Version Control & Updates**

- This document will be **versioned using Git** for tracking updates.  
- All changes will follow a **review process** before being approved.  
- Next review: **[Insert Date]**  

---

### **📂 Where to Find This Document?**

- 📄 **Location in MkDocs:** `docs/system-design/non-functional-requirements.md`  
- 🛠 **Live Version (if hosted):** [your-docs-site.com/nfr](#)  

---

### **🔥 Why This Format?**

✔ **Markdown format** keeps it lightweight and easy to version in Git.  
✔ **Tables with tools & validation** make it actionable for devs & testers.  
✔ **Linking to relevant docs** improves navigation in your MkDocs setup.  

Would you like me to refine this further or generate a **ready-to-use MkDocs file** for your project? 🚀
