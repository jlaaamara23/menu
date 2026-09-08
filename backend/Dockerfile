# Build
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src ./src
RUN mvn -q -DskipTests package

# Run
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/menu-0.0.1-SNAPSHOT.jar app.jar
RUN mkdir -p /app/data /app/uploads
ENV JAVA_OPTS=""
EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
