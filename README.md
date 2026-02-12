# QA Banco Digital - Automatización

Proyecto de pruebas end-to-end (E2E) para la aplicación **QA Banco Digital**, utilizando Playwright. Valida la página principal, el modal de login, el catálogo de productos y el simulador de créditos.

## Stack Tecnológico

| Tecnología        | Versión | Uso                        |
|-------------------|---------|----------------------------|
| **Playwright**    | 1.58.x  | Framework de pruebas E2E   |
| **TypeScript**    | -       | Tipado estático           |
| **Node.js**       | LTS     | Entorno de ejecución      |

## Estructura del Proyecto

```
bqd-automation/
├── tests/
│   ├── test-login/
│   │   └── validate-login.spec.ts    # Pruebas del modal de login
│   ├── test-onboarding/
│   │   └── validate-text.spec.ts     # Validación de textos en Home
│   └── test-simulator/
│       └── validate-simulator.spec.ts # Pruebas del simulador de créditos
├── .github/workflows/
│   └── playwright.yml               # CI/CD con GitHub Actions
├── playwright.config.ts             # Configuración de Playwright
└── package.json
```

## Suites de Pruebas

### Login (`test-login`)
- Visibilidad del botón "Iniciar sesión"
- Apertura del modal de login
- Campos de email y contraseña
- Mensaje de error 500 al enviar credenciales

### Página Principal (`test-onboarding`)
- Badge "Tu banco digital de confianza"
- Título "Financia tus sueños"
- Descripción de soluciones financieras
- Enlaces "Ir al Simulador" y "Ver Productos"
- Catálogo de productos financieros
- Sección "Sobre QA Banco Digital"

### Simulador (`test-simulator`)
- Textos estáticos (badge, título, descripción)
- Formulario "Datos del Crédito" (monto, plazo)
- Cálculo de cuota mensual
- Asignación automática de producto según monto
- Validaciones de monto mínimo y máximo

## Prerrequisitos

- **Node.js** (versión LTS recomendada)
- La aplicación frontend **bqd-frontend** debe estar ejecutándose en `http://localhost:3000`

## Getting Started

### Instalación

```bash
npm install
```

### Instalar navegadores de Playwright (primera vez)

```bash
npx playwright install
```

### Ejecutar las pruebas

```bash
npx playwright test
```

### Ejecutar en modo UI (recomendado para desarrollo)

```bash
npx playwright test --ui
```

### Ejecutar un archivo específico

```bash
npx playwright test tests/test-login/validate-login.spec.ts
```

### Ver el reporte HTML

```bash
npx playwright show-report
```

## Configuración

La configuración principal está en `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Viewport**: 1920x1080 (Full HD)
- **Navegadores**: Chromium, WebKit
- **Reportes**: HTML con trazabilidad en fallos

