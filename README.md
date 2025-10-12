# env0-lite-frontend

This is a modern infrastructure management frontend built with [Next.js](https://nextjs.org), TypeScript, and a robust set of libraries for cloud automation, project/space management, and seamless DevOps workflows.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Tech Stack & Major Packages

- **Framework:** Next.js (App Router, SSR/SSG, API routes)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS, custom CSS modules
- **UI Components:** Lucide React Icons, Heroicons, SweetAlert2, custom component library
- **HTTP:** Axios (with private instance for auth)
- **Forms & Validation:** Custom React components
- **Other:** js-cookie, next/image, next/font, etc.

---

## 🧑‍💻 Code Quality & Best Practices

- **Type Safety:** All business logic and API calls are fully typed with TypeScript interfaces.
- **Centralized API Endpoints:** All backend routes are managed in `src/config/api-endpoints.ts` for maintainability.
- **Redux Toolkit:** Used for all global state, with slices for projects, spaces, deployments, credentials, etc.
- **Component Structure:** Modular, atomic components with clear separation of concerns.
- **Error Handling:** All API calls and async logic use robust error handling and user feedback (SweetAlert2, UI states).
- **Code Formatting:** Prettier and ESLint enforced (see project config).
- **Folder Structure:**

```
src/
	app/                # Next.js app directory (routing, pages, layouts)
		...
	components/         # Reusable UI and logic components
	config/             # API endpoints, axios config
	redux/              # Redux store and slices
	services/           # Service layer for API calls
	types/              # TypeScript types/interfaces
	assets/             # Static assets
	hooks/, lib/        # Custom hooks and utilities
```

---

## 📁 Key Folders & Files

- `src/app/` - All Next.js pages, layouts, and routing logic
- `src/components/` - UI components (Sidebar, Modals, Buttons, Inputs, etc.)
- `src/services/` - API service functions (project, AWS creds, deployments, etc.)
- `src/redux/` - Redux store and slices for all major entities
- `src/config/api-endpoints.ts` - Centralized API endpoint definitions
- `src/types/` - All TypeScript types and interfaces

---

## 🌐 API Endpoints (Frontend Usage)

All API endpoints are defined in `src/config/api-endpoints.ts`. Replace `:projectId` and other params at usage time.

**Auth:**
- `/api/users/signup`, `/api/users/login`, `/api/users/get-user-by-id`, ...

**GitHub:**
- `/api/github-pat/save-pat`, `/api/github-pat/list-repos`, ...

**Project:**
- `/api/project/create-project`, `/api/project/:projectId/spaces`, `/api/project/:projectId/delete`, ...

**Deployments:**
- `/api/deployment/`, `/api/terraform`, ...

**AWS Credentials:**
- `/api/project/:projectId/configure-aws-profile`, `/api/project/:projectId/update-aws-profile`

See the full list in `src/config/api-endpoints.ts`.

---

## 🧩 Features

- Project and space management (create, delete, search, paginate, grid/gallery view)
- AWS credentials management (profile setup, update, validation)
- GitHub repo integration and branch rebasing
- Deployment history with status, search, pagination, and grid/gallery toggle
- Responsive, modern UI with dark mode
- Robust error and loading states throughout

---

## 📝 Contributing & Code Style

- Use TypeScript for all new code
- Follow the existing folder and component structure
- Use centralized API endpoints and types
- Run `npm run lint` and `npm run format` before submitting PRs

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

