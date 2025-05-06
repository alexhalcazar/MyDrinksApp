plugins {
    kotlin("jvm") version "2.1.0"
    kotlin("plugin.serialization") version "2.1.0"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    maven { url = uri("https://repo.mongodb.org/maven2") }
}

dependencies {
    testImplementation(kotlin("test"))
    implementation("io.ktor:ktor-server-core-jvm:3.1.2")
    implementation("io.ktor:ktor-server-netty-jvm:3.1.2")
    implementation("ch.qos.logback:logback-classic:1.4.14") // Logging
    testImplementation("io.ktor:ktor-server-test-host-jvm:3.1.2")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:2.1.0")
    implementation("io.github.cdimascio:dotenv-kotlin:6.5.1")
    // Kotlin coroutine dependency
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
    // MongoDB Kotlin driver dependency
    implementation("org.mongodb:mongodb-driver-kotlin-coroutine:5.4.0")
    implementation("org.mongodb:bson-kotlinx:5.4.0")
    //implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.6.0")
    // Ktor HTTP client requests
    implementation("io.ktor:ktor-client-core:3.1.2")
    implementation("io.ktor:ktor-client-cio:3.1.2")
    // Add Ktor serialization module
    implementation("io.ktor:ktor-serialization-kotlinx-json:3.1.2")
    implementation("io.ktor:ktor-server-content-negotiation:3.1.2")

}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}