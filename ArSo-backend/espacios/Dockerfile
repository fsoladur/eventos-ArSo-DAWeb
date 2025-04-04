FROM maven:3.8.5-openjdk-11 AS builder

WORKDIR /app/
COPY pom.xml .
RUN mvn -e -B dependency:resolve
COPY src ./src
RUN mvn clean install

ENTRYPOINT ["mvn", "jetty:run"]