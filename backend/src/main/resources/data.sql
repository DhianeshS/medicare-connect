-- Initial roles
INSERT INTO roles (name) VALUES ('ROLE_PATIENT');
INSERT INTO roles (name) VALUES ('ROLE_DOCTOR');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN'); -- Hospital Controller

-- Default Admin (Hospital Controller)
-- Password "Admin@123" (BCrypt encoded: $2a$10$8.UnVuG9HHgffUDAlk8Kn.2NvEnJpgX.5f1xV9u9pS7YlqGj7D6iC)
INSERT INTO users (email, password, first_name, last_name, role_id)
VALUES ('admin@medicareconnect.com', '$2a$10$8.UnVuG9HHgffUDAlk8Kn.2NvEnJpgX.5f1xV9u9pS7YlqGj7D6iC', 'Hospital', 'Controller', 3);
