# Lorenzo Pachioli | Front-End Developer Portfolio

Welcome to my personal portfolio, a comprehensive showcase of my skills and projects as a Front-End Developer. This application is built with **Angular** and demonstrates modern web development practices, including responsive design, complex animations, and modular architecture.

## Project Overview

This portfolio is designed to provide an interactive and engaging user experience. It features a dynamic landing page, a detailed "About Me" section with a timeline, a skills showcase, and a portfolio grid highlighting my work. The application leverages **GSAP** for high-performance animations and **ngx-translate** for internationalization.

## Key Features

- **Dynamic Animations**: Powered by **GSAP (GreenSock Animation Platform)** for smooth transitions and `ScrollTrigger` effects.
- **Responsive Design**: Optimized styling for desktops, tablets, and mobile devices.
- **Internationalization (i18n)**: Multi-language support using `@ngx-translate`.
- **Modular Architecture**: Clean separation of concerns with `Core`, `Feature`, and `Shared` modules.
- **Contact Form**: Integrated with **EmailJS** for direct messaging.
- **Theming**: Custom SCSS styling and component-based design.

## Tech Stack

- **Framework**: [Angular](https://angular.io/) (v21)
- **Languages**: TypeScript, SCSS, HTML5
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Libraries**:
  - `@ngx-translate/core` (i18n)
  - `@emailjs/browser` (Email)
  - RxJS

## Getting Started

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Tests

- **Unit Tests**: Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Project Structure

The project follows a standard Angular CLI structure with a focus on modularity:

- `src/app/core`: Singleton services, layout components (Header, Footer), and main pages (Home, Portfolio).
- `src/app/feature`: Reusable feature components (Project Info, Contact Card).
- `src/app/shared`: Shared utilities and UI components.
- `src/app/services`: Application-wide services for data handling and logic.
- `src/app/material`: Angular Material module and component custom styling.
- `src/assets`: Static assets including images, icons, and internationalization JSON files.
- `src/environments`: Environment-specific configuration files.

---

_Generated with Angular CLI version 21._
