package com.jxhspace.investment.system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@EnableKnife4j
public class SwaggerConfig {

	// 掃包路徑
	private final String basePackage = "com.jxhspace.investment";
	// 標題
	private final String title = "EngineCore-接口說明文檔";
	// 描述
	private final String description = "對所有的接口進行詳細說明文檔";
	// 服務地址
	private final String serviceUrl = "/investment ";
	// 版本號
	private final String version = "v0.0.1";

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
				.apis(RequestHandlerSelectors.basePackage(basePackage)).paths(PathSelectors.any()).build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title(title).description(description).termsOfServiceUrl(serviceUrl).version(version)
				.build();
	}
}
