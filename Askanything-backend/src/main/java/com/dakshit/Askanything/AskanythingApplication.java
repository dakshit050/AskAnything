package com.dakshit.Askanything;

import com.dakshit.Askanything.config.SwaggerConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@Import(SwaggerConfiguration.class)
public class AskanythingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AskanythingApplication.class, args);
	}

}
