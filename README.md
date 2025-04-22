# MyDrinksApp
With the rising cost of alcoholic beverages, many college students end up spending too much money when going out, especially when buying drinks for friends. This routine spending each week adds up quickly, making socializing more expensive than it needs to be. That’s where a smarter, more budget-friendly option becomes valuable.

CocktailDB is a publicly available API containing a comprehensive, static database of popular cocktails. It includes drink names, ingredients, and preparation instructions, offering a ready-made resource for anyone interested in mixing their own drinks. With this, users can explore a wide variety of recipes without needing to spend extra at the bar.

We will use Kotlin and the Ktor framework to build a lightweight REST API for cocktail searching and discovery. By applying functional programming concepts like immutability, pure functions, and referential transparency, we ensure that the backend remains clean, testable, and reliable. Features like a "random drink" button will leverage reusable logic and built-in error handling.

MyDrinksApp utilizes the API to helps users save money, learn to craft cocktails, and practice bartending skills in a fun, approachable way. Whether you’re hosting a casual get-together, trying to impress friends with your mixology skills, or just looking to unwind with something new, this platform offers a hands-on, creative alternative to expensive nights out. By building a personal lineup of drinks, users can explore and control over what they consume, experimenting with flavors and techniques at their own pace. One limitation noticed is the lack of mocktail recipes, which may reduce accessibility for non-drinkers—but this is an area with room for future improvement.

Using Kotlin and Ktor, we aim to build a lightweight REST API for cocktail searching, helping users save money, creating new cocktails, and learn a new skill.

## Installation
1. Clone the Repo:
```
git clone https://github.com/alexhalcazar/MyDrinksApp.git
```

2. Navigate into the project directory:
```angular2html
    cd MyDrinksApp
```

3. Open the project in IntelliJ IDEA.

4. Run 'Application.kt'.

5. Visit `http://localhost:8080` in your browser to see the app in action.

# Dependencies
### Core
- Ktor Server Core: ```io.ktor:ktor-server-core-jvm:3.1.2```

- Ktor Netty Engine: ```io.ktor:ktor-server-netty-jvm:3.1.2```

### Logging
- Logback Classic: ```ch.qos.logback:logback-classic:1.4.14```

### Testing
- Kotlin Test (common): ```kotlin("test")```

- Ktor Test Host: ```io.ktor:ktor-server-test-host-jvm:3.1.2```

- JUnit Integration: ```org.jetbrains.kotlin:kotlin-test-junit:1.9.22```