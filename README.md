# FaunaEnriquilloFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### HTTPS Development Server

This project is configured to support HTTPS. To start the development server with HTTPS enabled, run:

```bash
npm run start:https
```

Or directly with Angular CLI:

```bash
ng serve --ssl
```

Once the server is running, open your browser and navigate to `https://localhost:4200/`. 

Note: Since the development server uses a self-signed certificate, your browser may display a security warning. This is normal for development environments. You can safely proceed to the website by accepting the certificate warning in your browser.

### API Proxy for CORS Issues

This project includes a proxy configuration to handle CORS issues when connecting to the backend API. The proxy forwards requests from the Angular development server to the backend API server, avoiding cross-origin restrictions.

To start the development server with the proxy enabled, run:

```bash
npm run start:proxy
```

This will start the development server with the proxy configuration defined in `proxy.conf.json`. The proxy is configured to forward requests to `/api` to the backend server at `https://localhost:7057`.

#### How the Proxy Works

1. The Angular application makes requests to relative URLs (e.g., `/api/v1/animal/search/...`)
2. The development server intercepts these requests and forwards them to the configured backend URL
3. The response from the backend is returned to the application as if it came from the same origin

This approach eliminates CORS issues during development without requiring changes to the backend server.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.

### Using Tailwind CSS

You can use Tailwind CSS utility classes directly in your HTML templates. For example:

```html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  This is a styled div using Tailwind CSS
</div>
```

### Configuration

Tailwind CSS is configured in the following files:

- `tailwind.config.js`: Contains the Tailwind CSS configuration, including theme customization and plugin settings.
- `postcss.config.js`: Configures PostCSS to use Tailwind CSS and Autoprefixer.
- `src/styles.css`: Imports Tailwind CSS's base, components, and utilities styles.

For more information on using Tailwind CSS, visit the [Tailwind CSS Documentation](https://tailwindcss.com/docs).

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
