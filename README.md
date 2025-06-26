# Propora: AI-Powered Auto Proposal Generator

Propora is a full-stack application that helps freelance software developers quickly generate professional project proposals using AI. It features a modern React frontend (with Material UI) and a Node.js/Express backend that connects to LLM providers (Ollama or Groq) for proposal generation.

## Features
- **AI-Powered Proposal Generation:** Enter a client brief and your portfolio summary to instantly generate a tailored project proposal.
- **Modern UI:** Beautiful, responsive frontend built with React and Material UI.
- **PDF Export & Copy:** Easily export proposals as PDF or copy to clipboard for sharing.
- **Cloud Ready:** Deployable to Vercel (frontend) and Render (backend) with environment-based configuration for secrets.

## Tech Stack
- **Frontend:** React, Vite, Material UI
- **Backend:** Node.js, Express, Axios
- **AI Providers:** Ollama, Groq (configurable)

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/bhanu499/propora.git
cd propora
```

### 2. Backend Setup
- Install dependencies:
  ```sh
  cd backend
  npm install
  ```
- Set environment variables for your LLM provider (see `RENDER_DEPLOYMENT.md`).
- Start the backend:
  ```sh
  npm start
  ```

### 3. Frontend Setup
- Install dependencies:
  ```sh
  cd frontend
  npm install
  ```
- Update the backend API URL in the frontend if deploying to cloud.
- Start the frontend:
  ```sh
  npm run dev
  ```

## Deployment
- **Frontend:** See `frontend/DEPLOYMENT.md` for Vercel deployment.
- **Backend:** See `backend/RENDER_DEPLOYMENT.md` for Render deployment.

## Security
- **Never commit API keys or secrets.** Use environment variables for all sensitive data.

## License
MIT
