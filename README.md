# 🛍️ Online Fashion Store

An online fashion store built with a modern web technology stack, providing a platform for customers to browse fashion products and interact with an online shopping system. The application uses **FastAPI** for backend API development, **PostgreSQL** for data storage, and a separately deployed frontend.

## 🌐 Live Demo

**Live Website:** [Add your live website URL here]

**Backend API:** [Add your Render API URL here]

**API Documentation:** [Add your Render API URL here]/docs

> The live links will be updated after the final deployment and verification.

---

## 📌 Project Overview

The Online Fashion Store is a web application designed to simplify online fashion shopping. It separates the frontend and backend, allowing the user interface and API services to be developed, deployed, and maintained independently.

The backend exposes RESTful APIs for managing products, categories, users, and orders. PostgreSQL stores application data, while SQLAlchemy handles database interactions.

## ✨ Features

- **Product Management:** Retrieve and manage fashion products through REST APIs.
- **Category Management:** Organize products into categories.
- **User Management:** Provide backend endpoints for user-related operations.
- **Order Management:** Support order-related operations through dedicated API routes.
- **REST API Architecture:** Separate the frontend from the backend using HTTP APIs.
- **Relational Database:** Store application data in PostgreSQL.
- **Database ORM:** Use SQLAlchemy for database sessions, models, and queries.
- **Cross-Origin Resource Sharing (CORS):** Configure frontend access to the backend API.
- **Cloud Deployment:** Host the backend and database on Render and the frontend on Vercel.

*Feature availability depends on the implemented routes and frontend integration.*

## 🛠️ Technology Stack

### Backend
- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- REST APIs

### Database
- PostgreSQL
- Psycopg2
- SQLAlchemy ORM

### Frontend
- Existing frontend application maintained in a separate GitHub repository
- Frontend framework and styling libraries: to be confirmed from the project configuration

### Deployment and Version Control
- Git and GitHub
- Render — backend hosting and PostgreSQL database
- Vercel — frontend hosting

## 🏗️ System Architecture

```text
                 Customer
                     |
                     v
           Frontend Web Application
                  (Vercel)
                     |
                HTTP / HTTPS
                     |
                     v
             FastAPI Backend
                 (Render)
                     |
                     v
              SQLAlchemy ORM
                     |
                     v
             PostgreSQL Database
                 (Render)
```

The frontend sends HTTP requests to the FastAPI backend. The backend processes requests, interacts with PostgreSQL through SQLAlchemy, and returns responses to the frontend.

## 📂 Repository Structure

### Backend Repository

Repository: [fashion-store-backend](https://github.com/Sandeeppj277/fashion-store-backend)

```text
fashion-store-backend/
├── app.py
├── database.py
├── models.py
├── schemas.py
├── requirements.txt
└── routers/
    ├── categories.py
    ├── products.py
    ├── users.py
    └── orders.py
```

- `app.py` — Initializes the FastAPI application, configures CORS, creates database tables, and registers API routers.
- `database.py` — Configures the SQLAlchemy engine, session factory, and declarative base.
- `models.py` — Defines database models.
- `schemas.py` — Defines data validation and serialization schemas.
- `requirements.txt` — Lists Python dependencies.
- `routers/` — Organizes API endpoints for categories, products, users, and orders.

### Frontend Repository

Repository: [fashion-store-frontend](https://github.com/Sandeeppj277/fashion-store-frontend)

The frontend is maintained separately from the backend. Its source structure and framework-specific configuration are documented here once confirmed from the repository.

## ⚙️ Backend Configuration

The backend uses environment variables to configure its database connection.

### Database Connection

The `DATABASE_URL` environment variable contains the PostgreSQL connection URL.

SQLAlchemy reads this value when initializing the database engine. A local fallback is available in `database.py` for development, but production deployments should always configure the environment variable explicitly.

### Dependencies

Install the backend dependencies using:

```bash
pip install -r requirements.txt
```

Run the FastAPI application locally using:

```bash
uvicorn app:app --reload
```

Open the interactive API documentation at:

```text
http://127.0.0.1:8000/docs
```

## 🚀 Deployment

### 1. Source Code — GitHub

GitHub stores the frontend and backend source code in separate repositories. This supports version control and integration with deployment platforms.

### 2. Database and Backend — Render

The backend is deployed as a Render Web Service, with PostgreSQL used for persistent relational data storage.

Typical backend configuration:

| Setting | Value |
|---|---|
| Runtime | Python |
| Build command | `pip install -r requirements.txt` |
| Start command | `uvicorn app:app --host 0.0.0.0 --port $PORT` |
| Database | PostgreSQL |
| Database configuration | `DATABASE_URL` environment variable |

The actual service URL and deployment status should be added after successful deployment.

### 3. Frontend — Vercel

The frontend is deployed from the separate GitHub repository using Vercel.

The frontend must be configured to send API requests to the newly deployed Render backend. The correct environment variable name depends on the frontend framework and implementation.

### 4. Cross-Origin Configuration

CORS is configured in FastAPI to control which frontend origins may access the backend. In production, the allowed origins should include the actual Vercel website URL.

### 5. Database Initialization

The application calls `Base.metadata.create_all(bind=engine)` during startup to create missing tables for models registered with the SQLAlchemy declarative base.

This initializes the schema for compatible models; it does not migrate existing schemas or restore records from an expired database.

## 🧪 Testing and Verification

The following checks should be performed after deployment:

- [ ] Confirm that the Render backend starts successfully.
- [ ] Open the FastAPI `/docs` endpoint.
- [ ] Verify that the backend connects to PostgreSQL.
- [ ] Confirm that the required database tables exist.
- [ ] Test product and category API endpoints.
- [ ] Test user-related endpoints.
- [ ] Test order-related endpoints.
- [ ] Check frontend-to-backend API communication.
- [ ] Verify that CORS allows requests from the deployed frontend.
- [ ] Test the main shopping workflow in a browser.
- [ ] Review Render logs and browser developer tools for errors.

These are verification steps, not claims that every test has already passed.

## 🔐 Security Considerations

- Store database credentials in environment variables rather than committing them to GitHub.
- Restrict production CORS origins to trusted frontend domains.
- Keep API keys and authentication secrets out of source control.
- Validate incoming request data using appropriate Pydantic schemas.
- Apply authentication and authorization checks to protected endpoints.
- Use HTTPS for production communication.
- Avoid exposing database credentials or sensitive user data in application logs.

## 🔮 Future Enhancements

- Integrate a secure payment gateway.
- Add product search, filtering, and sorting.
- Implement product images and image storage.
- Improve authentication and role-based authorization.
- Add inventory and stock management.
- Introduce order status tracking.
- Add automated backend tests and continuous deployment checks.
- Improve application monitoring and error handling.

## 👨‍💻 Author

**Sandeep P J**

- GitHub: [Sandeeppj277](https://github.com/Sandeeppj277)

## 📄 License

A license has not yet been specified. Add an appropriate license file if you intend to distribute the project for reuse.

---

## 🔗 Final Live Links

**Live Frontend:** `Add your Vercel URL here`

**Backend API:** `Add your Render URL here`

**Interactive API Documentation:** `Add your Render URL here/docs`
