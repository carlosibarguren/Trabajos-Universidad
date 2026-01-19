package com.example.demo.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtGrantedAuthoritiesConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;


@Configuration
@EnableWebFluxSecurity
public class GWConfig {

    @Bean
    public RouteLocator configurarRutas(RouteLocatorBuilder builder,
                                        @Value("${api-gw.url-microservicio-rentals}") String uriAlquileres,
                                        @Value("${api-gw.url-microservicio-stations}") String uriEstaciones) {
        return builder.routes()
                // Ruteo al Microservicio de Personas
                .route(p -> p.path("/api/tarifas/**").uri(uriAlquileres))
                .route(p -> p.path("/api/alquileres/**").uri(uriAlquileres))
                // Ruteo al Microservicio de Entradas
                .route(p -> p.path("/api/estaciones/**").uri(uriEstaciones))
                .build();

    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) throws Exception {
        http
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/api/alquileres/**").hasAnyRole("ADMINISTRADOR", "CLIENTE")
                        .pathMatchers(HttpMethod.GET, "/api/estaciones/**").hasAnyRole("ADMINISTRADOR","CLIENTE")
                        .pathMatchers("/api/estaciones/**").hasRole("ADMINISTRADOR")
                        .pathMatchers("/api/tarifas/**").hasRole("ADMINISTRADOR")
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                        )
                )
                .csrf().disable();

        return http.build();
    }

    @Bean
    public ReactiveJwtAuthenticationConverter jwtAuthenticationConverter() {
        var jwtAuthenticationConverter = new ReactiveJwtAuthenticationConverter();
        var grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

        grantedAuthoritiesConverter.setAuthoritiesClaimName("authorities");
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(
                new ReactiveJwtGrantedAuthoritiesConverterAdapter(grantedAuthoritiesConverter));

        return jwtAuthenticationConverter;
    }



}
