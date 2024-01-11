package com.fastfour.pathfinderbackend.config;

import com.fastfour.pathfinderbackend.auth.filter.AuthTokenFilter;
import com.fastfour.pathfinderbackend.model.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    private UserService userService;

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .formLogin().disable()
//                .csrf().disable()
//                .httpBasic()
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .addFilterBefore(getJWTAuthTokenFilter(),
//                        UsernamePasswordAuthenticationFilter.class)
//                .authorizeRequests()
//                .antMatchers("/actuator/**").permitAll()
//                .antMatchers("/api/v1/auth/token").permitAll()
//                .antMatchers(HttpMethod.POST).hasRole("ADMIN")
//                .antMatchers(HttpMethod.PUT).hasRole("ADMIN")
//                .anyRequest().authenticated();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .formLogin(Customizer.withDefaults()).disable()
                .csrf(Customizer.withDefaults()).disable()
                .httpBasic(Customizer.withDefaults())
                .and()
                .sessionManagement(Customizer.withDefaults())
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers("/api/v1/auth/token").permitAll()
                .antMatchers(HttpMethod.POST).hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT).hasRole("ADMIN")
                .anyRequest().authenticated();
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager getAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Bean
    public AuthTokenFilter getJWTAuthTokenFilter() throws Exception {
        return new AuthTokenFilter();
    }

}