package com.servease.controller;

import com.servease.entity.ServiceProvider;
import com.servease.repository.ServiceProviderRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "*")
public class ServiceProviderController {

    private final ServiceProviderRepository providerRepository;

    private final JdbcTemplate jdbcTemplate;

public ServiceProviderController(ServiceProviderRepository providerRepository,
                                 JdbcTemplate jdbcTemplate) {
    this.providerRepository = providerRepository;
    this.jdbcTemplate = jdbcTemplate;
}
    }
    @GetMapping("/db/check")
public Map<String, Object> databaseCheck() {
    return jdbcTemplate.queryForMap(
        "SELECT DATABASE() AS database_name, " +
        "@@hostname AS database_host, " +
        "(SELECT COUNT(*) FROM service_providers) AS provider_count"
    );
}

    @PostMapping
    public ServiceProvider addProvider(@RequestBody ServiceProvider provider) {
        return providerRepository.save(provider);
    }

    @GetMapping
    public List<ServiceProvider> getAllProviders() {
        return providerRepository.findAll();
    }
    @GetMapping("/{id}")
public ServiceProvider getProviderById(@PathVariable Long id) {
    return providerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Provider not found"));
}

    @GetMapping("/available")
    public List<ServiceProvider> getAvailableProviders() {
        return providerRepository.findByAvailableTrue();
    }

    @GetMapping("/search")
    public List<ServiceProvider> searchProviders(
            @RequestParam(required = false) String serviceType,
            @RequestParam(required = false) String location) {

        if (serviceType != null && !serviceType.isBlank()) {
            return providerRepository
                    .findByServiceTypeContainingIgnoreCase(serviceType.trim());
        }

        if (location != null && !location.isBlank()) {
            return providerRepository
                    .findByLocationContainingIgnoreCase(location.trim());
        }

        return providerRepository.findAll();
    }
}