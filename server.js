// const jsonServer = require("json-server");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");

// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// const SECRET_KEY = "your_secret_key";
// const TOKEN_EXPIRATION = "1h";

// server.use(cors());
// server.use(middlewares);
// server.use(jsonServer.bodyParser());

// // Функція для генерації JWT
// const generateToken = (user) => {
//     return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
// };

// // Реєстрація нового користувача
// server.post("/register", async (req, res) => {
//     const { firstName, secondName, email, password, passwordAgain, phone } = req.body;
//     const users = router.db.get("users");

//     // Перевірка чи є користувач з таким email
//     if (users.find({ email }).value()) {
//         return res.status(400).json({ message: "Користувач з таким email вже існує" });
//     }

//     // Перевірка на співпадіння паролів
//     if (password !== passwordAgain) {
//         return res.status(400).json({ message: "Паролі не співпадають" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//         id: (users.value().length + 1).toString(),
//         firstName,
//         secondName,
//         email,
//         password: hashedPassword,
//         type: "login-user",
//         phone,
//     };

//     // Додаємо нового користувача до бази
//     users.push(newUser).write(); // Записуємо новий користувач в базу
//     const token = generateToken(newUser);

//     res.status(201).json({ token, user: { ...newUser, password: undefined } }); // Не повертаємо пароль
// });

// // Логін користувача
// server.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = router.db.get("users").find({ email }).value();

//     if (!user) {
//         return res.status(401).json({ message: "Невірний email або пароль" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(401).json({ message: "Невірний email або пароль" });
//     }

//     const token = generateToken(user);
//     res.json({ token, user: { ...user, password: undefined } }); // Не повертаємо пароль
// });

// // Middleware для перевірки токена
// const authenticate = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Немає доступу" });
//     }

//     const token = authHeader.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         req.user = decoded; // Додаємо decoded дані користувача до запиту
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: "Невірний або прострочений токен" });
//     }
// };

// // Захищений маршрут
// server.get("/profile", authenticate, (req, res) => {
//     const user = router.db.get("users-login").find({ id: req.user.id }).value();
//     if (!user) {
//         return res.status(404).json({ message: "Користувач не знайдений" });
//     }
//     res.json({ ...user, password: undefined }); // Не повертаємо пароль
// });

// server.use(router);

// server.listen(3001, () => {
//     console.log("JSON Server is running on port 3001");
// });
