# Step 1: Build the application using Gradle and JDK 25
FROM gradle:jdk25 AS build
WORKDIR /app

# Copy configuration files first to leverage Docker caching for dependencies
COPY build.gradle.kts settings.gradle.kts ./
# Copy the source code
COPY src ./src

# Build the bootJar (skipping tests for speed during build)
RUN gradle bootJar -x test

# Step 2: Run the application using Eclipse Temurin JDK 25 JRE
FROM eclipse-temurin:25-jre
WORKDIR /app

# Copy the compiled JAR from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
