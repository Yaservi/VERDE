# FaunaEnriquilloFrontend

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 20.0.2.

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté en funcionamiento, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques cualquiera de los archivos fuente.

### Servidor de desarrollo HTTPS

Este proyecto está configurado para soportar HTTPS. Para iniciar el servidor de desarrollo con HTTPS habilitado, ejecuta:

```bash
npm run start:https
```

O directamente con Angular CLI:

```bash
ng serve --ssl
```

Una vez que el servidor esté en funcionamiento, abre tu navegador y navega a `https://localhost:4200/`.

Nota: Dado que el servidor de desarrollo utiliza un certificado autofirmado, tu navegador puede mostrar una advertencia de seguridad. Esto es normal en entornos de desarrollo. Puedes proceder de manera segura al sitio web aceptando la advertencia del certificado en tu navegador.

### Proxy API para problemas de CORS

Este proyecto incluye una configuración de proxy para manejar problemas de CORS al conectarse a la API backend. El proxy reenvía las solicitudes desde el servidor de desarrollo de Angular al servidor de API backend, evitando restricciones de origen cruzado.

Para iniciar el servidor de desarrollo con el proxy habilitado, ejecuta:

```bash
npm run start:proxy
```

Esto iniciará el servidor de desarrollo con la configuración de proxy definida en `proxy.conf.json`. El proxy está configurado para reenviar solicitudes a `/api` al servidor backend en `https://localhost:7057`.

#### Cómo funciona el Proxy

1. La aplicación Angular realiza solicitudes a URLs relativas (por ejemplo, `/api/v1/animal/search/...`)
2. El servidor de desarrollo intercepta estas solicitudes y las reenvía a la URL del backend configurada
3. La respuesta del backend se devuelve a la aplicación como si viniera del mismo origen

Este enfoque elimina los problemas de CORS durante el desarrollo sin requerir cambios en el servidor backend.

## Generación de código

Angular CLI incluye potentes herramientas de generación de código. Para generar un nuevo componente, ejecuta:

```bash
ng generate component nombre-componente
```

Para una lista completa de esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta:

```bash
ng generate --help
```

## Compilación

Para compilar el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza tu aplicación para rendimiento y velocidad.

## Ejecutando pruebas unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), utiliza el siguiente comando:

```bash
ng test
```

## Ejecutando pruebas end-to-end

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no viene con un framework de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Tailwind CSS

Este proyecto utiliza [Tailwind CSS](https://tailwindcss.com/) para el estilizado. Tailwind CSS es un framework CSS utility-first que te permite construir diseños personalizados sin salir de tu HTML.

### Usando Tailwind CSS

Puedes usar las clases de utilidad de Tailwind CSS directamente en tus plantillas HTML. Por ejemplo:

```html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Este es un div estilizado usando Tailwind CSS
</div>
```

### Configuración

Tailwind CSS está configurado en los siguientes archivos:

- `tailwind.config.js`: Contiene la configuración de Tailwind CSS, incluyendo personalización de temas y configuración de plugins.
- `postcss.config.js`: Configura PostCSS para usar Tailwind CSS y Autoprefixer.
- `src/styles.css`: Importa los estilos base, componentes y utilidades de Tailwind CSS.

Para más información sobre el uso de Tailwind CSS, visita la [Documentación de Tailwind CSS](https://tailwindcss.com/docs).

## Recursos adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página de [Descripción general y referencia de comandos de Angular CLI](https://angular.dev/tools/cli).
