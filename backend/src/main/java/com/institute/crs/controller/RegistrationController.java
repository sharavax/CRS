package com.institute.crs.controller;

import com.institute.crs.dto.RegistrationRequest;
import com.institute.crs.model.Registration;
import com.institute.crs.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        return ResponseEntity.ok(registrationService.getAllRegistrations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable Long id) {
        return ResponseEntity.ok(registrationService.getRegistrationById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> registerStudent(@Valid @RequestBody RegistrationRequest request) {
        Registration savedRegistration = registrationService.registerStudent(request);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Congratulations! Your registration for '" 
                + savedRegistration.getCourse().getName() + "' was successfully submitted.");
        response.put("data", savedRegistration);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> cancelRegistration(@PathVariable Long id) {
        registrationService.cancelRegistration(id);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration #" + id + " has been successfully cancelled.");

        return ResponseEntity.ok(response);
    }
}
