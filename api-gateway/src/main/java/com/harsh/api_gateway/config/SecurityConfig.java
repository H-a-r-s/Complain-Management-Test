package com.harsh.api_gateway.config;
//import com.harsh.api_gateway.security.JwtAuthFilter;
import com.harsh.api_gateway.security.JwtGatewayFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

//    @Bean
//    SecurityFilterChain filterChain(HttpSecurity http, JwtGatewayFilter jwtAuthFilter) throws Exception {
//
//        http
//                .csrf(csrf -> csrf.disable())
//                .cors(cors -> {})
//                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/auth/**").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
}