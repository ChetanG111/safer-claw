# Implementation Plan - Safer-Claw v1 (Simplified)

## 1. 🔍 Analysis & Context
*   **Objective:** Implement a simplified "Safer-Claw v1 System Overview" focusing on managing containers on 1-2 pre-provisioned DigitalOcean droplets. The goal is to quickly establish a secure, controlled hosting layer for AI agents with strict cost, execution, and security controls, prioritizing core functionalities like encrypted secrets, container-per-user isolation, strict resource limits, usage caps, read-only OAuth integrations, and a webhook kill switch.
*   **Affected Files (Likely, will be refined during implementation):**
    *   `app/api/onboarding/checkout/route.ts` (modification for triggering agent deployment post-payment)
    *   `database/schema.ts` (modifications for agent configuration, resource tracking, integration tokens, droplet assignment)
    *   `lib/auth/auth.ts` (potential extensions for agent-specific OAuth integrations)
    *   New API routes under `app/api/agent/` for agent management (deploy, status, logs, stop)
    *   New service files for Docker container management on pre-provisioned droplets.
    *   New utility files for encryption/decryption of sensitive data.
    *   Frontend components for displaying agent status, usage, and integration settings.
*   **Key Dependencies:**
    *   Next.js (Frontend + API)
    *   Drizzle ORM (Database schema and interactions)
    *   Better-Auth (Authentication and User Management)
    *   Payment Providers (for subscription management)
    *   DigitalOcean API (for Docker container management on pre-provisioned droplets)
    *   Docker (containerization)
    *   Encryption Library (for secure token storage)
    *   Redis or similar (for caching and rate limiting)
*   **Risks/Unknowns:**
    *   Managing workload distribution and availability across 1-2 pre-provisioned droplets.
    *   Ensuring robust Docker container isolation and security.
    *   Accurate and real-time token/cost tracking from AI providers.
    *   Implementing effective agent guardrails without stifling agent utility.
    *   Scalability challenges if user base grows rapidly beyond initial estimates, necessitating manual intervention.
    *   Choice of encryption library and secure key management.
    *   Initial setup and configuration of the pre-provisioned DigitalOcean droplets (assumed to be handled manually or by external scripts).

## 2. 📋 Checklist
- [ ] Step 1: Extend Database Schema (Add Droplet Management)
- [ ] Step 2: Implement Secure Credential Storage
- [ ] Step 3: Develop Docker Container Management Service (on Pre-provisioned Droplets)
- [ ] Step 4: Integrate Agent Deployment into Checkout Flow (Container on existing Droplet)
- [ ] Step 5: Implement Agent Management API Endpoints
- [ ] Step 6: Implement Docker Container Configuration (Image & Runtime)
- [ ] Step 7: Implement Usage and Cost Tracking
- [ ] Step 8: Implement Agent Guardrails
- [ ] Step 9: Develop Agent-Specific OAuth Integration (for read-first tools)
- [ ] Step 10: Frontend Integration for Agent Management
- [ ] Step 11: Implement Security Hardening (Docker flags, environment variables, Droplet config)
- [ ] Step 12: Implement Webhook Kill Switch
- [ ] Step 13: Testing and Verification
- [ ] Verification

## 3. 📝 Step-by-Step Implementation Details
*Note: Be extremely specific. Include file paths and code snippets/signatures.*

### Step 1: Extend Database Schema (Add Droplet Management)
*   **Goal:** Add necessary fields to `agent` table and potentially new tables for agent-specific integrations, usage metrics, and available pre-provisioned droplets.
*   **Action:**
    *   Modify `database/schema.ts` to add fields to the `agent` table:
        *   `doDropletId: text('do_droplet_id').notNull()` (Link to the assigned pre-provisioned DigitalOcean droplet)
        *   `doContainerId: text('do_container_id')` (nullable, for linking to Docker container)
        *   `aiProvider: text('ai_provider')` (e.g., 'openai', 'anthropic')
        *   `aiApiKey: text('ai_api_key')` (encrypted, for agent's use)
        *   `integrationsConfig: text('integrations_config')` (encrypted JSON string for OAuth tokens and integration settings)
        *   `cpuLimit: decimal('cpu_limit', { precision: 3, scale: 1 }).default('0.5').notNull()`
        *   `memoryLimit: text('memory_limit').default('512m').notNull()`
        *   `pidsLimit: integer('pids_limit').default(100).notNull()`
        *   `readOnlyFilesystem: boolean('read_only_filesystem').default(true).notNull()`
        *   `capDropAll: boolean('cap_drop_all').default(true).notNull()`
        *   `lastActivity: timestamp('last_activity')` (for keeping containers warm and usage tracking)
        *   `dailyTokenCount: integer('daily_token_count').default(0).notNull()`
        *   `monthlyCost: decimal('monthly_cost', { precision: 10, scale: 2 }).default('0.00').notNull()`
    *   **New Table**: Create a new table `digitalOceanDroplet` to store information about pre-provisioned droplets:
        ```typescript
        export const digitalOceanDroplet = pgTable('digital_ocean_droplet', {
          id: text('id').primaryKey(), // DigitalOcean Droplet ID
          ipAddress: text('ip_address').notNull().unique(),
          name: text('name').notNull(),
          status: text('status').default('active').notNull(), // e.g., 'active', 'maintenance', 'full'
          activeContainerCount: integer('active_container_count').default(0).notNull(), // Used for simple load balancing (e.g., least active containers)
          maxContainerCapacity: integer('max_container_capacity').notNull(), // A simple hard limit, not for complex scheduling
          createdAt: timestamp('created_at').defaultNow().notNull(),
          updatedAt: timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
        });
        ```
    *   Run Drizzle migrations to apply schema changes.
*   **Verification:** Confirm new fields and tables exist in the database and Drizzle ORM recognizes them.

### Step 2: Implement Secure Credential Storage
*   **Goal:** Create a utility to encrypt and decrypt sensitive agent credentials (AI API keys, integration tokens) before storing them in the database.
*   **Action:**
    *   Create a new file `lib/utils/encryption.ts`.
    *   Implement `encrypt(data: string): string` and `decrypt(encryptedData: string): string` using AES-256 or a similar strong symmetric encryption algorithm.
    *   Store the encryption key securely in environment variables (e.e., `process.env.ENCRYPTION_KEY`).
*   **Verification:** Write unit tests for encryption and decryption, ensuring data integrity and correct handling of the encryption key.

### Step 3: Develop Docker Container Management Service (on Pre-provisioned Droplets)
*   **Goal:** Create a service to interact with the Docker API on *pre-provisioned* DigitalOcean droplets for container lifecycle management.
*   **Action:**
    *   Create a new directory `lib/do-manager/`.
    *   Create `lib/do-manager/docker.ts` with functions to interact with the Docker API on an *existing* droplet:
        *   `selectDropletForNewContainer(): Promise<DigitalOceanDroplet>` (logic to select a droplet for a new container, e.g., "least active containers" or round-robin, avoiding complex load metrics for v1 simplicity)
        *   `createAgentContainer(dropletIp: string, agentConfig: AgentConfig, agentId: string): Promise<string>`
        *   `startContainer(dropletIp: string, containerId: string)`
        *   `stopContainer(dropletIp: string, containerId: string)`
        *   `getContainerLogs(dropletIp: string, containerId: string)`
        *   `removeContainer(dropletIp: string, containerId: string)`
    *   Configure DigitalOcean API key (if needed for listing droplets or similar) as an environment variable (`process.env.DIGITALOCEAN_API_KEY`).
    *   The service should manage connection to the Docker daemon via TLS on the droplet's IP address.
*   **Verification:** Develop integration tests that mock Docker API responses to verify service functions. Manually test container creation/management on a pre-provisioned droplet.

### Step 4: Integrate Agent Deployment into Checkout Flow (Container on existing Droplet)
*   **Goal:** After successful payment, find an available pre-provisioned droplet and deploy a Docker container for the agent.
*   **Action:**
    *   Modify `app/api/onboarding/checkout/route.ts` (or create a new webhook handler for payment success).
    *   After payment confirmation, update the `agent` record status to `provisioning`.
    *   Call `selectDropletForNewContainer()` from `lib/do-manager/docker.ts` to get a droplet.
    *   Store the `doDropletId` (from the selected droplet) in the `agent` record.
    *   Call `createAgentContainer` on the selected droplet's IP address and store `doContainerId`.
    *   Update `agent` status to `active` upon successful container deployment.
    *   Increment `activeContainerCount` for the selected `digitalOceanDroplet`.
*   **Verification:** End-to-end test the user subscription and agent deployment flow, ensuring a container is created on an existing droplet.

### Step 5: Implement Agent Management API Endpoints
*   **Goal:** Provide API endpoints for users to manage their agents.
*   **Action:**
    *   Create new API routes in `app/api/agent/[agentId]/` for:
        *   `GET /status`: Retrieve agent status and resource usage.
        *   `POST /start`: Start an inactive agent's container.
        *   `POST /stop`: Stop an active agent's container.
        *   `GET /logs`: Stream agent container logs.
        *   `DELETE /`: Delete an agent (container). This will also decrement `activeContainerCount` for the associated droplet.
    *   Implement authorization checks to ensure users can only manage their own agents.
    *   These endpoints will call corresponding functions in `lib/do-manager/docker.ts` and update the `agent` table.
*   **Verification:** Use API testing tools (e.g., Postman, `curl`) to verify endpoint functionality and authorization.

### Step 6: Implement Docker Container Configuration (Image & Runtime)
*   **Goal:** Define the Docker image for the agent containers, applying security flags, assuming droplets are pre-configured with Docker and necessary networking.
*   **Action:**
    *   Create a base Dockerfile for the AI agent runtime, including necessary dependencies.
    *   Ensure the `createAgentContainer` function uses the Docker flags specified in `deployment.md`:
        *   `--cpus=0.5`
        *   `--memory=512m`
        *   `--pids-limit=100`
        *   `--read-only`
        *   `--cap-drop=ALL`
    *   Pass `user env vars` and `encrypted integration tokens` as environment variables to the Docker container.
*   **Verification:** Manually deploy a test container to confirm Docker setup, security flags, and environment variable passing.

### Step 7: Implement Usage and Cost Tracking
*   **Goal:** Track AI token usage and estimated cost per agent, enforcing caps.
*   **Action:**
    *   Integrate with AI provider APIs to retrieve token usage for each agent. This will likely involve modifying the agent runtime code itself to report usage back to the main API.
    *   Create a mechanism (e.g., cron job, webhook from agent) to periodically update `dailyTokenCount` and `monthlyCost` in the `agent` table.
    *   Develop a background worker (e.g., Next.js API route triggered by a cron job, or a dedicated Node.js script) to monitor agent usage.
    *   If an agent exceeds its `dailyTokenCount` or `monthlyCost` cap:
        *   Update agent status to `paused`.
        *   Call `stopContainer` from `lib/do-manager/docker.ts`.
        *   Send a notification to the user.
*   **Verification:** Simulate AI usage to ensure tracking and capping mechanisms work correctly.

### Step 8: Implement Agent Guardrails
*   **Goal:** Enforce max tokens, max tool calls, max runtime, and prompt injection mitigation.
*   **Action:**
    *   **Max Tokens/Tool Calls/Runtime**: These limits will primarily be enforced within the agent's runtime environment (the Docker container). The agent's code needs to be aware of these limits and gracefully shut down or pause when exceeded. The main API can configure these limits when deploying the agent.
    *   **Prompt Injection Mitigation**: This is primarily handled within the agent's LLM interaction logic.
        *   **System Prompt Override**: Ensure the agent's system prompt cannot be easily overridden by user input.
        *   **Tool Argument Validation**: Implement strict validation for all tool arguments before execution.
        *   **Restricted Tool Calls**: Allowlist approved tools and restrict arbitrary tool targets.
        *   **No fully LLM-generated API requests**: Ensure tool calls are structured and validated.
    *   These guardrails are mostly part of the agent's own code running inside the Docker container, but the orchestrator (this application) is responsible for ensuring the agent is deployed with these guardrails enabled and configured.
*   **Verification:** Conduct security testing, including attempts at prompt injection and runaway tool loops, to ensure guardrails are effective.

### Step 9: Develop Agent-Specific OAuth Integration (for read-first tools)
*   **Goal:** Allow users to connect read-first integrations (e.g., Google Calendar, Gmail, Drive) to their agents.
*   **Action:**
    *   Create new database tables (e.g., `agentIntegration`) to store encrypted OAuth tokens (`accessToken`, `refreshToken`, `scope`, `expiry`) linked to an `agentId` and `userId`.
    *   Create new API endpoints (e.g., `app/api/agent/[agentId]/integrations/google`) to initiate OAuth flows for each supported integration.
    *   Implement secure handling of OAuth redirects and token exchange.
    *   Use the encryption utility from Step 2 to encrypt `refreshToken` and `accessToken` before storing.
    *   Ensure minimal scopes are requested as per `deployment.md`.
    *   Implement a mechanism within the agent runtime to refresh access tokens using the stored refresh token.
*   **Verification:** Test OAuth flows for each integration, ensuring tokens are securely stored and refreshed, and scopes are minimal.

### Step 10: Frontend Integration for Agent Management
*   **Goal:** Provide a user interface for managing agents, viewing status, usage, and configuring integrations.
*   **Action:**
    *   Create new pages/components for:
        *   Agent Dashboard: List deployed agents, their status, and basic usage.
        *   Agent Details Page: Detailed status, logs, start/stop buttons, integration management.
        *   Integration Configuration UI: For connecting and disconnecting agent integrations.
    *   Utilize the new API endpoints created in Step 5 and Step 9.
*   **Verification:** User acceptance testing of the agent management UI.

### Step 11: Implement Security Hardening (Docker flags, environment variables, Droplet config)
*   **Goal:** Ensure the Docker containers are deployed with the specified security hardening measures and the pre-provisioned droplets are securely configured.
*   **Action:**
    *   Confirm all Docker flags (`--cpus`, `--memory`, `--pids-limit`, `--read-only`, `--cap-drop=ALL`) are applied during container creation.
    *   Ensure sensitive environment variables (AI API keys, encrypted integration tokens) are passed securely to the container and not exposed in logs or shell history.
    *   **Manual/External Action**: Configure strict firewall rules on the pre-provisioned DigitalOcean droplets, only allowing necessary ports (e.g., SSH for management, and a secure port for Docker API access from the main application, and agent communication if needed). This configuration is outside the scope of this application's automated deployment, but essential for security.
*   **Verification:** Security audit of deployed containers and droplet network configuration.

### Step 12: Implement Webhook Kill Switch
*   **Goal:** Provide a mechanism to immediately stop an agent's container via a webhook.
*   **Action:**
    *   Create a new API endpoint, e.g., `app/api/webhooks/agent-kill/[agentId]`.
    *   This endpoint should be secured with a unique secret token (stored in environment variables) and only accessible via POST requests.
    *   Upon receiving a valid request, it should call `stopContainer` for the specified agent.
    *   Consider adding an option to immediately remove the container and update the agent status to 'killed' or 'terminated'.
*   **Verification:** Manually trigger the webhook with and without the correct secret to confirm functionality and security.

### Step 13: Testing and Verification
*   **Goal:** Ensure all components are working as expected and meet security and functional requirements.
*   **Action:**
    *   **Unit Tests**: For `lib/utils/encryption.ts`, `lib/do-manager/*.ts` (mocking API calls), API route handlers.
    *   **Integration Tests**: Test the full deployment flow from user subscription to active agent on an existing droplet. Test agent management API endpoints. Test OAuth integration flows. Test webhook kill switch.
    *   **Manual Verification**: Deploy test agents, interact with them, monitor logs and resource usage.
    *   **Security Testing**: Penetration testing, vulnerability scanning of Docker images and deployed containers.
    *   **Performance Testing**: Test agent deployment speed, response times under load.
*   **Verification:** All tests pass, and manual verification confirms functionality and security.

## 4. 🧪 Testing Strategy
*   **Unit Tests:** Focus on individual functions and modules, especially for encryption, Docker container management (mocked), database operations, and webhook handler.
*   **Integration Tests:** Cover the full deployment lifecycle (subscription -> payment -> container deployment on an existing droplet -> agent activation). Test agent management API endpoints (start/stop/logs/delete). Test agent OAuth integration flows. Test webhook kill switch functionality.
*   **Manual Verification:** Deploy and interact with a test agent, verify resource limits, check logs, and confirm secure storage of credentials. Attempt to trigger security risks (e.g., prompt injection, runaway loops) in a controlled environment. Test the webhook kill switch.
*   **Security Audit:** Engage in code review focused on security and potentially external security assessment.

## 5. ✅ Success Criteria
*   Users can successfully subscribe and deploy an AI agent onto a pre-provisioned droplet.
*   Deployed agents adhere to the specified CPU, memory, and security limits (Docker flags).
*   Sensitive data (AI keys, integration tokens) are encrypted at rest and in transit.
*   Users can connect read-first OAuth integrations to their agents with minimal scopes.
*   Agent usage (tokens, cost) is accurately tracked, and agents are paused when caps are reached.
*   Agent guardrails (max tokens, tool calls, runtime, prompt injection mitigation) are effectively enforced.
*   Agent management API endpoints (status, start, stop, logs, delete) function correctly and securely.
*   A webhook kill switch can immediately stop an agent's container.
*   The system operates stably on 1-2 pre-provisioned DigitalOcean droplets.
*   No critical security vulnerabilities are identified through testing.
