FROM maven:3.8.5-openjdk-11-slim AS builder

WORKDIR /app/
COPY pom.xml .
RUN mvn -e -B dependency:resolve
COPY src ./src
RUN mvn clean package

FROM tomcat:9-jdk11
WORKDIR /usr/local/tomcat/webapps
COPY --from=builder /app/target/espacios-0.0.1-SNAPSHOT.war ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]