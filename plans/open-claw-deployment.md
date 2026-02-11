# Implementation Plan - OpenClaw Deployment and Management

## 1. 🔍 Analysis & Context
*   **Objective:** To implement a system that allows users to deploy and manage their own OpenClaw instances with a one-click setup, including a subscription-based pricing model.
*   **Affected Files:** 
    - `database/schema.ts`
    - `config/payments.ts`
    - `lib/payments/service.ts`
    - `app/[locale]/(site)/pricing.tsx`
    - `app/api/payments/checkout/route.ts`
    - `app/api/webhooks/payments/route.ts`
    - `messages/en.json`
*   **Key Dependencies:** 
    - `drizzle-orm` for database schema changes.
    - `stripe` (or another payment provider) for payment processing.
    - `@digitalocean/client` for interacting with the DigitalOcean API.
    - `dockerode` for managing Docker containers.
*   **Risks/Unknowns:**
    - The cost of running OpenClaw instances on DigitalOcean needs to be accurately estimated to ensure a 50% profit margin.
    - The process of provisioning and configuring OpenClaw instances needs to be automated and reliable.
    - The application needs to securely store and manage user-provided credentials (e.g., Telegram Bot ID).

## 2. 📋 Checklist
- [ ] Step 1: Update Database Schema
- [ ] Step 2: Implement DigitalOcean Service
- [ ] Step 3: Implement OpenClaw Instance Management Service
- [ ] Step 4: Update Payment Configuration and Service
- [ ] Step 5: Create OpenClaw Plan UI
- [ ] Step 6: Update Checkout and Webhook Endpoints
- [ ] Step 7: Add Internationalization
- [ ] Verification

## 3. 📝 Step-by-Step Implementation Details

### Step 1: Update Database Schema
*   **Goal:** Add a new table to the database to store information about user-owned OpenClaw instances.
*   **Action:**
    *   Modify `database/schema.ts` to add a new `openClawInstance` table. This table should include the following columns:
        *   `id`: Primary key.
        *   `userId`: Foreign key referencing the `user` table.
        *   `dropletId`: The ID of the DigitalOcean droplet.
        *   `dropletIp`: The IP address of the droplet.
        *   `telegramBotToken`: The user's Telegram Bot Token.
        *   `model`: The selected AI model.
        *   `status`: The status of the instance (e.g., `provisioning`, `running`, `stopped`, `error`).
        *   `createdAt`: Timestamp of when the instance was created.
        *   `updatedAt`: Timestamp of when the instance was last updated.
*   **Verification:** Run `drizzle-kit generate` to create a new migration and `bun run migrate:local` to apply it to the local database.

### Step 2: Implement DigitalOcean Service
*   **Goal:** Create a service to interact with the DigitalOcean API for provisioning and managing droplets.
*   **Action:**
    *   Create a new file `lib/digitalocean/client.ts`.
    *   Install the `@digitalocean/client` library: `bun add @digitalocean/client`.
    *   Implement functions to:
        *   Create a new droplet.
        *   Get the status of a droplet.
        *   Destroy a droplet.
*   **Verification:** Write unit tests for the DigitalOcean service to mock the API calls and verify the expected behavior.

### Step 3: Implement OpenClaw Instance Management Service
*   **Goal:** Create a service to manage the lifecycle of OpenClaw instances.
*   **Action:**
    *   Create a new file `lib/openclaw/service.ts`.
    *   Implement functions to:
        *   `createInstance(userId, model, telegramBotToken)`: This function will call the DigitalOcean service to create a new droplet, and then use `dockerode` to run the OpenClaw Docker container on the droplet. It will also save the instance details to the `openClawInstance` table.
        *   `destroyInstance(instanceId)`: This function will call the DigitalOcean service to destroy the droplet and remove the instance from the `openClawInstance` table.
*   **Verification:** Write unit tests for the OpenClaw instance management service.

### Step 4: Update Payment Configuration and Service
*   **Goal:** Add a new pricing plan for OpenClaw hosting and update the payment service to handle the new plan.
*   **Action:**
    *   Modify `config/payments.ts` to add a new `openClaw` plan to the `plans` object. This plan should have a monthly price that covers the cost of a DigitalOcean droplet and provides a 50% profit margin.
    *   Modify `lib/payments/service.ts` to handle the `openClaw` plan.
*   **Verification:** Verify that the new plan is correctly retrieved by the `getPlanConfig` function.

### Step 5: Create OpenClaw Plan UI
*   **Goal:** Create a new UI component to display the OpenClaw hosting plan and allow users to select their desired AI model and enter their Telegram Bot ID.
*   **Action:**
    *   Create a new component `app/[locale]/(site)/openclaw-pricing.tsx`.
    *   This component will be similar to `app/[locale]/(site)/pricing.tsx` but will include a form for selecting the AI model and entering the Telegram Bot ID.
*   **Verification:** Add the new component to the main page and verify that it renders correctly.

### Step 6: Update Checkout and Webhook Endpoints
*   **Goal:** Update the checkout and webhook endpoints to handle the new OpenClaw plan.
*   **Action:**
    *   Modify `app/api/payments/checkout/route.ts` to handle the `openClaw` plan. When a user checks out with this plan, the API should create a new OpenClaw instance using the `OpenClawInstanceService`.
    *   Modify `app/api/webhooks/payments/route.ts` to handle subscription events for the `openClaw` plan. For example, when a subscription is canceled, the API should destroy the corresponding OpenClaw instance.
*   **Verification:** Test the checkout flow with the new plan and verify that a new instance is created. Test the subscription cancellation flow and verify that the instance is destroyed.

### Step 7: Add Internationalization
*   **Goal:** Add translations for the new UI text.
*   **Action:**
    *   Add the new UI text to `messages/en.json`, `messages/es.json`, and `messages/fr.json`.
*   **Verification:** Verify that the new UI text is correctly translated when switching locales.

## 4. 🧪 Testing Strategy
*   **Unit Tests:**
    *   Write unit tests for the DigitalOcean service, OpenClaw instance management service, and payment service.
*   **Integration Tests:**
    *   Test the entire flow of creating a new OpenClaw instance, from selecting the plan to the instance being provisioned.
    *   Test the flow of canceling a subscription and the instance being destroyed.
*   **Manual Verification:**
    *   Manually create and destroy OpenClaw instances to ensure that the system is working as expected.
    *   Verify that the pricing and profit margin calculations are correct.

## 5. ✅ Success Criteria
*   Users can successfully deploy and manage their own OpenClaw instances.
*   The pricing model provides a 50% profit margin.
*   The system is scalable and can handle a large number of users.
*   The application is secure and protects user data.
