# Профили сборки проекта:

**Production**

Используется БД postgresql + клиент собирается с флагом ```--prod```.
Необходим запущенный сервер postgresql, наличие созданной базы данных _testdb_, владельцем которой является пользователь _testrole_ с паролем _testrole_.
```
mvn clean package -Pprod
```
**Development**

Используется БД H2. Никаких предварительных настроек не требуется.
```
mvn clean package -Pdev
```
Для сборки и одновременном развертывании проекта на jetty необходимо добавить профиль ```-Pjetty```. Например:
```
mvn clean package jetty:run -Pdev -Pjetty
```
