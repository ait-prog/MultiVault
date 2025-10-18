#!/bin/bash

echo "🚀 Запуск теста интеграции LuxeShare..."

# Проверяем, что Solana validator запущен
echo "🔍 Проверяем подключение к Solana validator..."
if ! curl -s http://127.0.0.1:8899 > /dev/null; then
    echo "❌ Solana validator не запущен на localnet!"
    echo "Запустите: solana-test-validator"
    exit 1
fi

echo "✅ Solana validator работает"

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install --package-lock=false

# Запускаем тест
echo "🧪 Запускаем тест интеграции..."
node test-integration.js

echo "✅ Тест завершен!"

