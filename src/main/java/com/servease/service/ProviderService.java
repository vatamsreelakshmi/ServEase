package com.servease.service;

import com.servease.entity.ServiceProvider;
import com.servease.repository.ServiceProviderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    private final ServiceProviderRepository providerRepository;

    public ProviderService(ServiceProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public ServiceProvider addProvider(ServiceProvider provider) {
        return providerRepository.save(provider);
    }

    public List<ServiceProvider> getAllProviders() {
        return providerRepository.findAll();
    }

    public List<ServiceProvider> getAvailableProviders() {
        return providerRepository.findByAvailableTrue();
    }

    public List<ServiceProvider> searchByServiceType(String serviceType) {
        return providerRepository.findByServiceTypeContainingIgnoreCase(serviceType);
    }
}
