# Render Deployment Instructions for Node.js Backend

1. **Create a `render.yaml` Blueprint (optional, for Infrastructure as Code):**
   This file describes your backend service for Render. You can use the Render Dashboard UI as well.

2. **Key requirements:**
   - Your backend must listen on the port specified by the `PORT` environment variable (Render sets this automatically).
   - Add a `start` script in `package.json` if not present: `node index.js`

3. **Example `render.yaml`:**

services:
  - type: web
    name: auto-proposal-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production

4. **Steps to Deploy:**
   - Push your code to GitHub (or GitLab/Bitbucket).
   - Go to https://dashboard.render.com, click 'New Web Service', and connect your repo.
   - Set the root directory to `backend` and the start command to `npm start`.
   - Optionally, add environment variables as needed.

For more details, see: https://render.com/docs/deploy-node-express-app
