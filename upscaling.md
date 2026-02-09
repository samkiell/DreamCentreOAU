# Dream Centre OAU — Upscaling Phase Specification

## 1. Overview
The Dream Centre OAU platform is transitioning from a static informational website to a dynamic, user-centric system. This phase introduces secure authentication, centralized identity issuance (DreamCenter IDs), personalized user dashboards, and comprehensive administrative controls to manage member data and institutional resources.

## 2. Account System Scope
The system shall provide a unified membership experience covering:
- **User Registration:** Self-service registration with mandatory institutional validation.
- **Authentication:** Secure login/logout and session management.
- **Member Dashboard:** Central hub for users to view assigned IDs and profile status.
- **Profile Management:** Capability for users to maintain personal details.
- **Role Separation:** A strict binary separation between standard **Users** (members) and **Admins** (system/department managers).

## 3. DreamCenter ID Specification
The **DreamCenter ID** is the definitive, unique identifier for every member within the ecosystem.

### 3.1 Format
**`DCO-[DEPTCODE][YY]-[SEQ]`**

- **DCO:** Fixed prefix (Dream Centre OAU).
- **DEPTCODE:** Official 2-4 letter department code (e.g., `SWE`, `CSC`).
- **YY:** Last two digits of the admission year (e.g., `24` for 2024).
- **SEQ:** A 3-digit sequential number (zero-padded, `001`–`999`).

### 3.2 Uniqueness and Permanence
- **Scoping:** The sequence resets to `001` for every unique combination of Department and Year.
- **Immutability:** Once an ID is assigned, it is permanent. It shall never be changed, even if a user changes departments or leaves the institution.
- **Zero Reuse:** Deactivated or deleted accounts do not release their ID for reassignment.

## 4. Registration Rules
Registration is governed by strict validation logic to ensure data integrity:
- **Email Domain Restriction:** Accounts must be registered using a valid OAU institutional email (`@student.oauife.edu.ng` or `@oauife.edu.ng`).
- **Unique Username:** Each user must have a unique system username (defaults to email).
- **Unique Matric Number:** OAU Matriculation numbers must be unique across the platform.
- **Institutional Dependency:** Users must select a Faculty first, which dynamically filters the available Departments. Departments must be correctly mapped to their parent Faculty.

## 5. Roles and Permissions
The platform operates on a Role-Based Access Control (RBAC) model with two primary tiers:

### 5.1 User Role
- View personal dashboard and DreamCenter ID.
- Edit personal profile details.
- Access member-only resources and events.

### 5.2 Admin Role
- Access the administrative dashboard.
- Review and approve/reject pending registrations.
- Trigger DreamCenter ID issuance upon account approval.
- Manage user statuses (Active, Suspended, Deactivated).
- View and export member directories and audit logs.

## 6. Security and Constraints
- **Data Protection:** Passwords must be hashed using industry-standard algorithms (e.g., Argon2 or Bcrypt). Plain-text passwords shall never be stored.
- **Identity Validation:** Email verification is mandatory before an account is considered for Admin approval.
- **Access Control:** All API endpoints and dashboard routes must be protected by middleware enforcing role-based checks.
- **ID Integrity:** DreamCenter IDs are system-generated and immutable. No manual editing or override of the ID sequence is permitted.
