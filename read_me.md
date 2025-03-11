# Team Role Management Application

## Overview
This is a full-stack application for managing team roles and responsibilities within an organization. The application consists of a React frontend, Python Flask backend, and SQLite database.

## Project Structure
├── backend/ 
│ ├── app/ 
│ │ ├── app.py 
│ │ ├──database/
│ │ ├ ├──seed.py
│ │ ├ ├──teamroledb.py
│ │ ├──models/
│ │ ├ ├──teamrolemodel.py
│ │ ├──routes/
│ │ ├ ├──roles.py
│ │ ├ ├──teams.py
│ ├──  Dockerfile 
│ ├── entrypoint.sh
│ ├── requirements.txt
│ ├── migrations/ 
|
├── frontend/ 
│ ├── src/ 
│ │ ├── components/ 
│ │ ├ ├──CreateForm.js
│ │ ├ ├──DataTable.js
│ │ ├ ├──EditForm.js
│ │ ├ ├──ManagementPage.js
│ │ ├── pages/ 
│ │ ├ ├──Home.js
│ │ ├ ├──Teams.js
│ │ ├ ├──Roles.js
│ │ └── styles/ 
│ │ ├ ├──styles.css
│ │ ├── api.js
│ │ ├── App.js
│ │ ├── index.js
│ ├── Dockerfile 
│ └── package.json 
|
├── terraform/ 
│ ├── main.tf
│ ├── outputs.tf
│ ├── providers.tf
│ ├── variables.tf
│ ├── terraform.tfvars
|
├── ansible/ 
│ ├── install_docker.yml
│ ├── inventory.ini
|
├── docs/ 
│ ├── api_documentation.md
│ ├── deployment_guide.md
│ ├── user_guide.md
|
└── docker-compose.yml
└── read_me.md

## Database Schema

### Teams Table
- `team_id` (Primary Key)
- `team_name`
- `description`

### Roles Table
- `role_id` (Primary Key)
- `role_name`
- `team_id` (Foreign Key referencing Teams)

## Technology Stack
- Frontend: React.js
- Backend: Python Flask
- Database: PostgresSQL
- Containerization: Docker
- Infrastructure: Terraform
- Deployment: Ansible

## Setup and Installation
1. Clone the repository
2. Install dependencies:
   - Backend: `pip install -r requirements.txt`
   - Frontend: `npm install`
3. Start the application:
   - Using Docker: `docker-compose up`
   - Without Docker:
     - Backend: `python app.py`
     - Frontend: `npm start`

## Documentation
Detailed documentation can be found in the `docs/` directory:
- User Guide
- API Documentation
- Deployment Guide