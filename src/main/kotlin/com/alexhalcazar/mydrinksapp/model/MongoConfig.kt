package com.alexhalcazar.mydrinksapp.model

import io.github.cdimascio.dotenv.dotenv
import org.bson.BsonInt64
import org.bson.Document
import com.mongodb.MongoException
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import kotlinx.coroutines.runBlocking

suspend fun setupConnection(
    databaseName: String = "MyDrinks",
    connectionEnvVariable: String = "MONGODB_URI"
): MongoDatabase? {
    val dotenv = dotenv()
    val connectString = dotenv[connectionEnvVariable]
        ?: throw IllegalArgumentException("MongoDB URI is missing in .env")

    val client = MongoClient.create(connectionString = connectString)
    val database = client.getDatabase(databaseName)

    return try {
        val command = Document("ping", BsonInt64(1))
        database.runCommand(command)
        println("Pinged your deployment. You successfully connected to MongoDB!")
        database
    } catch (me: MongoException) {
        System.err.println(me)
        null
    }
}

fun main() = runBlocking {
    val result = setupConnection()
    println(result)
}