# NestJS Миграции


## Описание


## Установка

```bash

# выполняем установку зависимостей
npm install

# (ОПЦИОНАЛЬНО) накатить миграции
npm run migration:run
```

## Запуск приложения

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Запуск миграций

```bash
# создание шаблона миграции
npm run migration:create Name

# создание миграции на основе изменений схемы приложения и сравнения схемы в базе данных
npm run migration:generate Name

# применение миграций
npm run migration:run

# откат последней миграции
npm run migration:down
```
