# 👨‍💻 Yiğit Canlı | Software Developer Portfolio



[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Status](https://img.shields.io/badge/Status-Open_to_Work-success?style=for-the-badge)](https://www.linkedin.com/in/ahmet-yiğit-canlı/)



> **"No buzzwords, just code."**

> A minimalist, high-performance portfolio built with Next.js 14, designed with a "Less is More" philosophy and engineering precision.



## 🌟 Overview



This project represents the intersection of **Management Information Systems (MIS)** analytics and modern **Software Engineering**. It's not just a showcase; it's a live demonstration of clean code, scalable architecture, and user experience (UX) sensitivity.



The site features a **Bento Grid** layout, full **Internationalization (i18n)** support, and a brutalist design language.



## ✨ Key Features



* **🌍 Multi-Language Support (i18n):** Native support for **English (EN)**, **Turkish (TR)**, and **German (DE)** using `next-intl` middleware.

* **📧 Server-Side Contact System:** A secure contact modal powered by **Next.js Server Actions** and **Resend API**. No client-side API keys, no external backend required.

* **🤖 Terminal Chatbot:** An interactive, terminal-style assistant that answers FAQs about me.

* **🎨 Dynamic Theming:** A high-contrast Dark/Light mode with intelligent color selection (Emerald/Purple accents).

* **⛔ Custom 404 System:** A specialized "System Failure" error page with glitch effects.

* **🖨️ Printer Friendly:** Custom CSS that transforms the portfolio into a clean, printable CV format when `CTRL+P` is pressed.

* **🕵️‍♂️ Hidden Easter Egg:** A secret route at `/secret` protected by a riddle.



## 🛠️ Tech Stack



| Category | Technology |

| :--- | :--- |

| **Framework** | Next.js 14 (App Router) |

| **Language** | TypeScript |

| **Styling** | Tailwind CSS & Framer Motion |

| **Localization** | next-intl |

| **Form Handling** | React Hook Form & Zod |

| **Email Service** | Resend (Server Actions) |

| **Deployment** | Vercel |





📬 Contact

LinkedIn: Ahmet Yiğit Canlı



Email: ahmetcanli1943@gmail.com



GitHub: @Vr0cks

© 2025 Yiğit Canlı. Built with ☕ and Code.





## 🚀 Getting Started



1.  **Clone the repository:**

    ```bash

    git clone [https://github.com/Vr0cks/My-portfolio.git](https://github.com/Vr0cks/My-portfolio.git)

    cd My-portfolio

    ```



2.  **Install dependencies:**

    ```bash

    npm install

    ```



3.  **Set up Environment Variables:**

    Create a `.env.local` file in the root directory and add your keys:

    ```env

    RESEND_API_KEY=re_12345...

    # Add other keys if necessary

    ```



4.  **Run the development server:**

    ```bash

    npm run dev

    ```



5.  Open [http://localhost:3000](http://localhost:3000) with your browser.



## 📂 Project Structure



```bash

├── actions/          # Server Actions (Email logic)

├── app/              # Next.js App Router

│   ├── [locale]/     # Localized routes (tr/en/de)

│   ├── api/          # API Routes

│   ├── not-found.tsx # Global 404 Page

│   └── globals.css   # Global styles & Tailwind

├── components/       # Reusable UI components

├── messages/         # i18n JSON files (tr.json, en.json, de.json)

├── public/           # Static assets & Open Graph images

└── lib/              # Utility functions

