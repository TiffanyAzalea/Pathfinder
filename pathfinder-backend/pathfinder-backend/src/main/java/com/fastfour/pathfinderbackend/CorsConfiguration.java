package com.fastfour.pathfinderbackend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc // Enable MVC configuration
public class CorsConfiguration implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply this to all endpoints, adjust the path as needed
                .allowedOrigins("http://localhost:3000") // Replace with your frontend URL
                .allowedMethods("*", "GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
//                .allowCredentials(true);
    }

}

