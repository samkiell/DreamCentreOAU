# Dream Centre OAU — Upscaling Phase Specification

**Document Version:** 1.0  
**Status:** APPROVED  
**Effective Date:** 2026-02-09  
**Classification:** Internal Engineering Spec

---

## 1. Purpose

This document defines the technical requirements, constraints, and implementation guidelines for the **Upscaling Phase** of the Dream Centre web platform at Obafemi Awolowo University (OAU).

The upscaling phase transitions the platform from a static informational site to an authenticated, role-based system capable of:

- Member registration and identity management
- Role-based access control (RBAC)
- Event management and participation tracking
- Resource distribution and accountability

This phase establishes the foundational backend architecture for all future feature extensions.

---

## 2. Scope

### 2.1 In Scope

| Area | Description |
|------|-------------|
| Authentication | Email/password login, session management, password reset |
| User Registration | Self-service registration with admin approval workflow |
| Identity System | DreamCenter ID generation and assignment |
| Role Management | Define and enforce user roles and permissions |
| Member Profiles | Basic profile storage and retrieval |
| Audit Logging | Track authentication events and role changes |

### 2.2 Non-Scope

The following are explicitly **excluded** from this phase:

- Payment processing or financial transactions
- Third-party OAuth providers (Google, Facebook, etc.)
- Mobile application backend
- Real-time messaging or chat systems
- Content management system (CMS) functionality
- Public API exposure to external consumers
- Multi-tenancy (other institutions)

These items may be addressed in subsequent phases.

---

## 3. User Roles and Permissions

### 3.1 Role Definitions

| Role | Code | Description |
|------|------|-------------|
| Guest | `GUEST` | Unauthenticated visitor. Read-only access to public content. |
| Member | `MEMBER` | Registered and approved user. Access to member-only resources. |
| Coordinator | `COORDINATOR` | Department-level administrator. Manages members within their department. |
| Admin | `ADMIN` | Platform administrator. Full system access. |
| Super Admin | `SUPER_ADMIN` | Root-level access. System configuration and admin management. |

### 3.2 Permission Matrix

| Action | GUEST | MEMBER | COORDINATOR | ADMIN | SUPER_ADMIN |
|--------|-------|--------|-------------|-------|-------------|
| View public pages | ✓ | ✓ | ✓ | ✓ | ✓ |
| Register account | ✓ | — | — | — | — |
| View member directory | — | ✓ | ✓ | ✓ | ✓ |
| Edit own profile | — | ✓ | ✓ | ✓ | ✓ |
| View department members | — | — | ✓ | ✓ | ✓ |
| Approve registrations (dept) | — | — | ✓ | ✓ | ✓ |
| Approve registrations (all) | — | — | — | ✓ | ✓ |
| Manage roles | — | — | — | ✓ | ✓ |
| System configuration | — | — | — | — | ✓ |
| Manage admins | — | — | — | — | ✓ |

### 3.3 Role Assignment Rules

1. All new registrations default to `MEMBER` role upon approval.
2. `COORDINATOR` role is assigned by `ADMIN` or `SUPER_ADMIN`.
3. `ADMIN` role is assigned by `SUPER_ADMIN` only.
4. `SUPER_ADMIN` role is seeded at deployment; cannot be assigned via UI.
5. Role changes are logged with actor, target, timestamp, and previous role.

---

## 4. Authentication Rules

### 4.1 Credentials

| Field | Constraints |
|-------|-------------|
| Email | Must be valid OAU email (`@student.oauife.edu.ng` or `@oauife.edu.ng`). Unique. Case-insensitive. |
| Password | Minimum 8 characters. At least one uppercase, one lowercase, one digit. |

### 4.2 Session Management

| Parameter | Value |
|-----------|-------|
| Session duration | 7 days (sliding expiration) |
| Idle timeout | 30 minutes |
| Concurrent sessions | Maximum 3 per user |
| Session storage | Server-side (Redis or database) |
| Token format | Opaque session ID; no client-readable JWT |

### 4.3 Password Reset

1. User requests reset via email.
2. System generates single-use token (valid for 1 hour).
3. Token is sent to registered email.
4. User sets new password; all existing sessions are invalidated.
5. Rate limit: 3 reset requests per email per hour.

### 4.4 Account Lockout

| Condition | Action |
|-----------|--------|
| 5 failed login attempts | Account locked for 15 minutes |
| 10 failed attempts (cumulative) | Account locked; requires admin unlock |
| Suspicious activity detected | Automatic session revocation |

---

## 5. Registration Flow

### 5.1 Self-Service Registration

```
┌─────────────────────────────────────────────────────────────────┐
│                     REGISTRATION FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [1] User submits registration form                             │
│       ↓                                                         │
│  [2] System validates input                                     │
│       ├── Invalid → Return validation errors                    │
│       └── Valid → Continue                                      │
│       ↓                                                         │
│  [3] System checks email uniqueness                             │
│       ├── Exists → Return "email already registered"            │
│       └── Unique → Continue                                     │
│       ↓                                                         │
│  [4] System creates account (status: PENDING)                   │
│       ↓                                                         │
│  [5] System sends verification email                            │
│       ↓                                                         │
│  [6] User clicks verification link                              │
│       ├── Expired → Return "link expired, request new"          │
│       └── Valid → Mark email verified                           │
│       ↓                                                         │
│  [7] Account enters AWAITING_APPROVAL status                    │
│       ↓                                                         │
│  [8] Coordinator/Admin reviews registration                     │
│       ├── Rejected → Notify user; account deleted after 30 days │
│       └── Approved → Continue                                   │
│       ↓                                                         │
│  [9] System generates DreamCenter ID                            │
│       ↓                                                         │
│ [10] Account status set to ACTIVE                               │
│       ↓                                                         │
│ [11] Welcome email sent with DreamCenter ID                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Required Registration Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `firstName` | string | Yes | 2-50 characters, letters only |
| `lastName` | string | Yes | 2-50 characters, letters only |
| `email` | string | Yes | Valid OAU email domain |
| `password` | string | Yes | See §4.1 |
| `department` | enum | Yes | Must match valid department code |
| `admissionYear` | number | Yes | 4-digit year, not future |
| `matricNumber` | string | Yes | Valid OAU matric format |
| `phoneNumber` | string | No | Nigerian phone format |

### 5.3 Account Statuses

| Status | Description |
|--------|-------------|
| `PENDING` | Account created, email not verified |
| `AWAITING_APPROVAL` | Email verified, pending admin approval |
| `ACTIVE` | Fully approved and operational |
| `SUSPENDED` | Temporarily disabled by admin |
| `DEACTIVATED` | Permanently disabled |

---

## 6. DreamCenter ID System Specification

### 6.1 Format Definition

```
DCO-[DEPTCODE][YY]-[SEQ]
```

| Component | Description | Example |
|-----------|-------------|---------|
| `DCO` | Fixed prefix. Identifies Dream Centre OAU. | `DCO` |
| `DEPTCODE` | Official department code. 2-4 uppercase letters. | `SWE`, `CSC`, `EEE` |
| `YY` | Two-digit admission year. | `24` (for 2024) |
| `SEQ` | Three-digit sequence number. Zero-padded. | `001`, `042`, `999` |

**Full Example:** `DCO-SWE24-001`

### 6.2 Generation Rules

1. **Prefix is immutable.** Always `DCO`.
2. **DEPTCODE** is derived from the user's selected department at registration.
3. **YY** is the last two digits of the user's admission year.
4. **SEQ** is assigned sequentially within each `DEPTCODE + YY` combination.
5. **Sequence resets** to `001` for each new department-year pair.
6. **Maximum capacity:** 999 members per department per year.
7. **Overflow handling:** If SEQ exceeds 999, system must alert admin; no auto-extension.

### 6.3 Assignment Rules

| Rule | Description |
|------|-------------|
| Uniqueness | Each DreamCenter ID is globally unique. |
| Immutability | Once assigned, an ID **never changes**, even if user changes department. |
| Timing | ID is generated at the moment of admin approval, not at registration. |
| Persistence | ID remains associated with the account indefinitely, including after deactivation. |
| No Reuse | Deactivated or deleted accounts do not release their ID for reassignment. |

### 6.4 Validation Regex

```regex
^DCO-[A-Z]{2,4}\d{2}-\d{3}$
```

### 6.5 Database Schema (Reference)

```sql
CREATE TABLE dreamcenter_id_sequences (
    department_code VARCHAR(4) NOT NULL,
    admission_year  SMALLINT NOT NULL,
    last_sequence   SMALLINT NOT NULL DEFAULT 0,
    PRIMARY KEY (department_code, admission_year)
);

-- Atomic ID generation (PostgreSQL example)
UPDATE dreamcenter_id_sequences
SET last_sequence = last_sequence + 1
WHERE department_code = $1 AND admission_year = $2
RETURNING last_sequence;
```

### 6.6 Department Codes (Reference List)

| Code | Department |
|------|------------|
| `CSC` | Computer Science |
| `SWE` | Software Engineering |
| `EEE` | Electrical and Electronics Engineering |
| `MEE` | Mechanical Engineering |
| `CVE` | Civil Engineering |
| `CHE` | Chemical Engineering |
| `AGE` | Agricultural Engineering |
| `MTE` | Materials Science and Engineering |
| `FDT` | Food Technology |
| `ARC` | Architecture |
| `QSV` | Quantity Surveying |
| `BLD` | Building |
| `URP` | Urban and Regional Planning |
| `EST` | Estate Management |
| ... | (extend as needed) |

> **Note:** The full department code registry is maintained separately and must be seeded into the database at deployment.

---

## 7. Security Assumptions

### 7.1 Trust Boundaries

| Boundary | Trust Level |
|----------|-------------|
| Client (browser) | Untrusted. All input must be validated server-side. |
| Application server | Trusted. Runs in controlled environment. |
| Database | Trusted. Access restricted to application server only. |
| External email service | Semi-trusted. No sensitive data in email body beyond verification links. |

### 7.2 Data Protection

| Data Category | Protection |
|---------------|------------|
| Passwords | Bcrypt hash, cost factor ≥ 12 |
| Session tokens | Cryptographically random, 256-bit minimum |
| PII (names, email, phone) | Encrypted at rest (AES-256) |
| DreamCenter IDs | Not considered sensitive; may be displayed publicly |

### 7.3 Transport Security

- All traffic must use HTTPS (TLS 1.2 minimum).
- HSTS header required with minimum 1-year max-age.
- No mixed content allowed.

### 7.4 Input Validation

- All user input is sanitized and validated server-side.
- SQL queries use parameterized statements exclusively.
- HTML output is escaped to prevent XSS.
- File uploads (if any) are scanned and stored outside web root.

### 7.5 Rate Limiting

| Endpoint Category | Limit |
|-------------------|-------|
| Login | 10 requests/minute per IP |
| Registration | 5 requests/hour per IP |
| Password reset | 3 requests/hour per email |
| General API | 100 requests/minute per user |

---

## 8. Future Extensibility Notes

### 8.1 Planned Extensions (Not in Scope)

| Feature | Phase | Notes |
|---------|-------|-------|
| OAuth integration | Phase 2 | Google Workspace for OAU accounts |
| Two-factor authentication | Phase 2 | TOTP-based (Google Authenticator compatible) |
| Event management | Phase 2 | RSVP, attendance tracking, event calendar |
| Resource library | Phase 3 | Document storage, sermon archives |
| Mobile app backend | Phase 3 | REST/GraphQL API for native apps |
| Analytics dashboard | Phase 3 | Member engagement metrics |
| Multi-campus support | Phase 4 | Federation with other Dream Centre locations |

### 8.2 Architectural Considerations

1. **Database:** Design schema with soft deletes to preserve referential integrity.
2. **API versioning:** All endpoints must be versioned (`/api/v1/...`) from day one.
3. **Event sourcing:** Consider event log for critical actions to enable future audit requirements.
4. **Modular services:** Authentication, user management, and future modules should be loosely coupled.
5. **Configuration:** Environment-based configuration for easy staging/production separation.

### 8.3 ID System Extensibility

The DreamCenter ID format is **locked** and must not be modified. However:

- New department codes can be added to the registry without schema changes.
- If member capacity exceeds 999 per department-year, a formal specification amendment is required.
- The ID system may be extended to other Dream Centre locations by introducing a new prefix (e.g., `DCU-` for another university) — this requires a separate specification.

---

## 9. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-09 | Engineering Team | Initial specification |

---

## 10. Approval

| Role | Name | Date |
|------|------|------|
| Technical Lead | __________________ | ____/____/____ |
| Project Manager | __________________ | ____/____/____ |
| Security Review | __________________ | ____/____/____ |

---

**END OF DOCUMENT**
