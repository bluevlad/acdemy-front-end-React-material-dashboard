# API Directory

This directory contains the API integration modules for the application.

## Structure

The API code is organized by feature domain. Each folder contains the necessary request logic for interacting with the backend services for that specific domain.

- **auth**: Authentication-related API calls (Sign In, Sign Up, Profile, etc.).
- **board**: Board and Notice board management API calls.
- **exam**: API calls related to exams and assessments.
- **member**: Member management API functionality.
- **menu**: Menu structure and management API calls.

## Usage

Import the necessary functions from the respective domain file to make network requests.
Example:
```javascript
import { login } from "api/auth";
```
