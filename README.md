# WebDev_ToDoList_RestAPI

## Overview
This To-Do API is built using FastAPI and interacts with a Firestore database to manage to-do tasks. It supports operations for creating, retrieving, updating, and deleting tasks.

File containing the API is called ['main2.py'](https://github.com/CristovalNS/WebDev_ToDoList_RestAPI/blob/main/todolist_app/src/api/main2.py), located in todolist_app/src/api/main2.py. Click on the hyperlink to directly go to the file.

After setting up the necessary Python libraries, use localhost:8000/docs to open the doc page.

## Endpoints

### Task Management

- `POST /tasks/` - Creates a new task.
  - **Request**: JSON (Example: `{"title": "Buy groceries", "isCompleted": false, "userId": "user123"}`)
  - **Response**: JSON (Example: `{"id": "task123", "title": "Buy groceries", "isCompleted": false, "userId": "user123"}`)

- `GET /tasks/` - Retrieves all tasks.
  - **Response**: JSON (Example: `{"task123": {"title": "Buy groceries", "isCompleted": false, "userId": "user123"}}`)

- `GET /tasks/user/{userId}` - Retrieves all tasks for a specific user.
  - **Response**: JSON (Example: `{"task123": {"title": "Buy groceries", "isCompleted": false, "userId": "user123"}}`)

- `GET /tasks/{taskId}` - Retrieves a task by ID.
  - **Response**: JSON (Example: `{"task123": {"title": "Buy groceries", "isCompleted": false, "userId": "user123"}}`)

- `PUT /tasks/{taskId}` - Updates an existing task.
  - **Request**: JSON (Example: `{"title": "Buy vegetables", "isCompleted": true}`)
  - **Response**: JSON (Example: `{"id": "task123", "title": "Buy vegetables", "isCompleted": true}`)

- `DELETE /tasks/{taskId}` - Deletes a task by ID.
  - **Response**: JSON (Example: `{"message": "Todo deleted"}`)

## Request and Response Format
Requests and responses are formatted as JSON.

## Error Handling
- `404 Not Found`: Returned when a task is not found.
- `500 Internal Server Error`: Returned when the server encounters an error.

## Authentication
Authentication is not required to access the API at this stage.
