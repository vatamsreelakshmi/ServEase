package com.servease.repository;

import com.servease.entity.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

    // Search using part of a service name
    List<ServiceProvider> findByServiceTypeContainingIgnoreCase(String serviceType);

    // Search professionals by location
    List<ServiceProvider> findByLocationContainingIgnoreCase(String location);

    // Find available professionals
    List<ServiceProvider> findByAvailableTrue();
}