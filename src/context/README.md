# Context Directory

This directory contains React Context files used for global state management across the application.

## Files

- **AuthContext.js**: Manages user authentication state (user info, tokens, login/logout status). It provides the `AuthProvider` component and the `useAuth` hook.
- **index.js**: The main UI Controller Context (likely `MaterialUIControllerProvider`) which manages the visual state of the application, such as theme settings, sidenav state, and layout configurations.

## Usage

Wrap your application or part of the component tree with the provider components to grant access to the global state. Use the corresponding hooks (e.g., `useAuth`, `useMaterialUIController`) to consume the context values in your components.
