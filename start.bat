@echo off
REM Clinic Management System - Script de Inicio Rápido para Windows
REM Compatible con Windows 10/11

echo 🏥 Iniciando Clinic Management System...
echo =========================================

REM Verificar si Java 17 está instalado
java -version 2>&1 | findstr /C:"17." >nul
if errorlevel 1 (
    echo ❌ Error: Se requiere Java 17 o superior
    echo 💡 Descargue Java 17 desde: https://adoptium.net/
    pause
    exit /b 1
)

REM Verificar si Maven está instalado
mvn --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Maven no está instalado
    echo 💡 Instale Maven desde: https://maven.apache.org/install.html
    pause
    exit /b 1
)

echo ✅ Verificaciones completadas
echo.

REM Compilar aplicación
echo 🔨 Compilando aplicación...
call mvn clean compile -q

REM Ejecutar pruebas
echo 🧪 Ejecutando pruebas...
call mvn test -q

if %errorlevel% equ 0 (
    echo ✅ Pruebas pasaron exitosamente
) else (
    echo ⚠️  Algunas pruebas fallaron, pero continuando...
)

REM Empaquetar aplicación
echo 📦 Empaquetando aplicación...
call mvn package -DskipTests -q

REM Iniciar aplicación
echo 🚀 Iniciando aplicación...
echo 📍 La aplicación estará disponible en: http://localhost:8080
echo 📚 Documentación API: http://localhost:8080/swagger-ui.html
echo ⏹️  Presione Ctrl+C para detener la aplicación
echo.

call java -jar target/clinic-0.0.1-SNAPSHOT.jar

echo.
echo 👋 Aplicación detenida. ¡Hasta luego!
pause