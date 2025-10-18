# Тестирование интеграции LuxeShare

## Быстрый тест без React

### 1. Запустите Solana validator (в WSL)

```bash
# В первом терминале
solana-test-validator
```

### 2. Деплойте программу (в WSL)

```bash
# Во втором терминале
cd luxeshare
anchor build
anchor deploy
```

### 3. Запустите тест (в WSL)

```bash
# В третьем терминале
cd luxeshare-main
chmod +x test.sh
./test.sh
```

## Что тестируется

1. ✅ **Создание NFT mint** для актива
2. ✅ **Создание shares mint** для долей
3. ✅ **Инициализация актива** через Anchor программу
4. ✅ **Минт долей** пользователю
5. ✅ **Стейкинг долей** для получения наград
6. ✅ **Получение данных** из блокчейна

## Ожидаемый результат

```
🔑 Тестовый кошелек создан: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
🚀 Начинаем тестирование интеграции...

1️⃣ Создаем NFT mint для актива...
✅ NFT mint создан: 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM

2️⃣ Создаем shares mint...
✅ Shares mint создан: 5MxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD

3️⃣ Получаем PDA для актива...
✅ Asset PDA: 3NxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD

4️⃣ Создаем ATA для vault и staking vault...
✅ Vault ATA: 4NxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD
✅ Staking vault ATA: 5NxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD

5️⃣ Инициализируем актив...
✅ Актив инициализирован! TX: 2NxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD

6️⃣ Получаем данные актива...
✅ Данные актива:
   - Название: Test Yacht
   - Базовая цена: 1000000
   - Текущая цена: 1000000
   - Комиссия: 5%
   - Всего застейкано: 0

7️⃣ Минтим доли...
✅ Доли заминчены! TX: 3NxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD

8️⃣ Выполняем стейкинг...
✅ Стейкинг выполнен! TX: 4NxY6PK7Y4eJJY2UYmyGTPcxf5SZGtpnJDyGYEEZpGZD

9️⃣ Получаем позицию пользователя...
✅ Позиция пользователя:
   - Доли застейкано: 50
   - Награды: 0

🎉 Все тесты прошли успешно! Интеграция работает!
```

## Устранение проблем

### Ошибка: "Solana validator не запущен"
```bash
# Запустите validator
solana-test-validator
```

### Ошибка: "Program not found"
```bash
# Деплойте программу
cd luxeshare
anchor build
anchor deploy
```

### Ошибка: "Insufficient funds"
```bash
# Получите тестовые SOL
solana airdrop 10 <wallet-address>
```

