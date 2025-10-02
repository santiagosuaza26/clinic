package app.clinic.application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration for the clinic application.
 * Defines authentication and authorization rules for different endpoints.
 * Configures role-based access control according to business requirements.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configures HTTP security for the application.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for REST API
            .csrf(csrf -> csrf.disable())

            // Configure session management
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Configure authorization rules
            .authorizeHttpRequests(authz -> authz
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll() // For development
                .requestMatchers("/swagger-ui/**").permitAll() // Swagger UI for development
                .requestMatchers("/v3/api-docs/**").permitAll() // OpenAPI docs for development
                .requestMatchers("/swagger-ui.html").permitAll() // Swagger UI HTML for development

                // User management - Only Human Resources
                .requestMatchers("/api/users/**").hasRole("HUMAN_RESOURCES")

                // Patient management - Administrative Staff and above
                .requestMatchers("/api/patients/**").hasAnyRole("ADMINISTRATIVE_STAFF", "HUMAN_RESOURCES")

                // Medical records - Doctors and Nurses
                .requestMatchers("/api/medical-records/**").hasAnyRole("DOCTOR", "NURSE", "HUMAN_RESOURCES")

                // Orders - Doctors only
                .requestMatchers("/api/orders/**").hasRole("DOCTOR")

                // Patient visits - Nurses and Doctors
                .requestMatchers("/api/patient-visits/**").hasAnyRole("NURSE", "DOCTOR", "HUMAN_RESOURCES")

                // Billing - Administrative Staff and Human Resources
                .requestMatchers("/api/billing/**").hasAnyRole("ADMINISTRATIVE_STAFF", "HUMAN_RESOURCES")

                // All other requests need authentication
                .anyRequest().authenticated()
            )

            // Configure headers for H2 console (development only)
            .headers(headers -> headers
                .frameOptions().deny()
                .contentTypeOptions().and()
            );

        return http.build();
    }
}