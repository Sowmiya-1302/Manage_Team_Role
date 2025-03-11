# API Documentation - Team Role Management Application

## Base URL

http://13.49.60.148:3000/#/teams

## Authentication

All API endpoints require authentication using JWT (JSON Web Token).
Include the token in the Authorization header:

Authorization: Bearer <your_jwt_token>

## API Endpoints

### Teams

#### GET /teams

Retrieves all teams.

**Response**

```json
{
  "status": "success",
  "data": [
    {
      "team_id": 1,
      "team_name": "Development",
    }
  ]
}
```
#### POST /teams

Creates a new team.

**Request Body**
{
    "team_name": "Development",
}

**Response**

```json
{
    "status": "success",
    "data": {
        "team_id": 1,
        "team_name": "Development",
    }
}
```

#### PUT /teams/{team_id}

Updates an existing team.

**Request Body**
{
    "team_name": "Development Team",
}

**Response**

```json
{
    "status": "success",
    "data": {
        "team_id": 1,
        "team_name": "Development",
    }
}
```

#### DELETE /teams/{team_id}

Deletes a team.

**Response**

```json
{
  "message": "Team deleted"
}
```

### Roles

#### GET /roles

Retrieves all roles.

**Response**
```json
{
    "status": "success",
    "data": [
        {
            "role_id": 1,
            "role_name": "Team Lead",
            "team_id": 1,
            "team_name": "Development"
        }
    ]
}
```
#### POST /roles

Creates a new role.

**Request Body**
```json
{
    "role_name": "Team Lead",
    "team_name": "Development",
}
```
#### PUT /roles/{role_id}

Updates an existing role.

**Request Body**
{
    "role_name": "Updated Role",
}

**Response**

```json
{
    "status": "success",
    "data": {
        "role_id": 1,
        "role_name": "Updated Role",
    }
}
```

#### DELETE /roles/{role_id}

Deletes a role.

**Response**

```json
{
  "message": "Role deleted"
}
```
#### Error Handling

**Error Response Format**

```json
{
    "status": "error",
    "message": "Error description",
    "error_code": "ERROR_CODE"
}
```
#### Common Error Codes
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
500: Internal Server Error

#### Rate Limiting
API requests are limited to 100 requests per minute per IP address.

#### Versioning
The API version is included in the URL path. Current version is v1.