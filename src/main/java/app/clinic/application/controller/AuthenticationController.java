package app.clinic.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.clinic.application.dto.user.LoginRequestDTO;
import app.clinic.application.dto.user.LoginResponseDTO;
import app.clinic.application.service.AuthenticationApplicationService;
import jakarta.validation.Valid;

/**
 * REST Controller for authentication operations.
 * Provides endpoints for user login and authentication.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationApplicationService authenticationApplicationService;

    public AuthenticationController(AuthenticationApplicationService authenticationApplicationService) {
        this.authenticationApplicationService = authenticationApplicationService;
    }

    /**
     * Authenticates a user with username and password.
     *
     * @param loginRequest The login credentials
     * @return ResponseEntity with login result
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = authenticationApplicationService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LoginResponseDTO errorResponse = new LoginResponseDTO(false, "Error interno del servidor");
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}