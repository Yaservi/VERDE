# CORS Issue Fix Summary

## Problem

The application was experiencing CORS (Cross-Origin Resource Sharing) errors when making API requests from the frontend to the backend. Specifically, requests from `http://localhost:4200` (frontend) to `https://localhost:7057/api` (backend) were being blocked with the following error:

```
Access to fetch at 'https://localhost:7057/api/v1/animal/search/ScientificName/Kuki' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

This is a common issue when the frontend and backend are running on different origins (different protocol, domain, or port).

## Solution

To resolve this issue, I implemented a proxy configuration in the Angular application. This approach allows the development server to intercept API requests and forward them to the backend server, effectively bypassing CORS restrictions.

### Changes Made

1. **Created a proxy configuration file (`proxy.conf.json`)**:
   ```json
   {
     "/api": {
       "target": "https://localhost:7057",
       "secure": false,
       "changeOrigin": true,
       "logLevel": "debug"
     }
   }
   ```
   This configuration tells the Angular dev server to forward all requests to `/api` to the backend server at `https://localhost:7057`.

2. **Updated `angular.json` to use the proxy configuration**:
   Added `"proxyConfig": "proxy.conf.json"` to the `serve.options` section.

3. **Modified the API service (`api.service.ts`)**:
   - Changed the base URL from `'https://localhost:7057/api'` to `'/api'` to use relative URLs
   - Updated the `setBaseUrl` method to handle both absolute and relative URLs
   - Updated the constructor to use the `setBaseUrl` method when loading a stored URL

4. **Added a new npm script in `package.json`**:
   Added `"start:proxy": "ng serve --proxy-config proxy.conf.json"` to make it easy to start the server with the proxy enabled.

5. **Updated the README.md**:
   Added documentation about the proxy configuration and how to use it.

## How It Works

1. The Angular application makes requests to relative URLs (e.g., `/api/v1/animal/search/...`)
2. The development server intercepts these requests and forwards them to the configured backend URL
3. The response from the backend is returned to the application as if it came from the same origin

This approach eliminates CORS issues during development without requiring changes to the backend server.

## Usage

To run the application with the proxy enabled, use:

```bash
npm run start:proxy
```

## Alternative Solutions

There are other ways to solve CORS issues:

1. **Configure the backend server to allow CORS**:
   This would involve adding appropriate CORS headers to the backend responses. This is the preferred solution for production environments.

2. **Use a browser extension to disable CORS**:
   This is a temporary solution for development only and not recommended for regular use.

The proxy approach was chosen because it:
- Doesn't require changes to the backend server
- Works consistently across all browsers
- Is a standard approach for Angular development
- Can be easily enabled/disabled as needed
