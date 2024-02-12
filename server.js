const express = require('express');
const fs = require('fs'); // Модуль для работы с файлами
const app = express();
const PORT = 3000;

// Счетчик просмотров
let pageViews = 0;

// Middleware для обработки каждого запроса
app.use((req, res, next) => {
    pageViews++; // Увеличиваем счетчик при каждом запросе
    next();
});

// Обработчик для главной страницы
app.get('/', (req, res) => {
    res.send(`Главная страница. Просмотров: ${pageViews}`);
});

// Обработчик для страницы "about"
app.get('/about', (req, res) => {
    res.send(`Страница "О нас". Просмотров: ${pageViews}`);
});

// Запись счетчика в файл при каждом запросе
app.use((req, res, next) => {
    fs.writeFileSync('pageViews.txt', pageViews.toString());
    next();
});

// Загрузка счетчика из файла при запуске сервера
try {
    const data = fs.readFileSync('pageViews.txt', 'utf8');
    pageViews = parseInt(data);
} catch (err) {
    console.error('Ошибка чтения файла:', err);
}

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});