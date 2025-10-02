#!/bin/bash

# Clinic Management System - Script de Inicio Rápido
# Compatible con Linux/Mac

echo "🏥 Iniciando Clinic Management System..."
echo "========================================="

# Verificar si Java 17 está instalado
if ! java -version 2>&1 | grep -q "17\."; then
    echo "❌ Error: Se requiere Java 17 o superior"
    echo "💡 Instale Java 17: sudo apt install openjdk-17-jdk (Ubuntu/Debian)"
    exit 1
fi

# Verificar si Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "❌ Error: Maven no está instalado"
    echo "💡 Instale Maven desde: https://maven.apache.org/install.html"
    exit 1
fi

# Verificar si MySQL está corriendo
if ! pgrep mysqld > /dev/null; then
    echo "⚠️  Advertencia: MySQL no parece estar ejecutándose"
    echo "💡 Asegúrese de que MySQL esté iniciado antes de continuar"
    echo "   Comando: sudo systemctl start mysql (Ubuntu/Debian)"
    echo ""
    read -p "¿Desea continuar de todos modos? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Verificaciones completadas"
echo ""

# Crear base de datos si no existe
echo "📊 Configurando base de datos..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS clinic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || {
    echo "⚠️  No se pudo conectar a MySQL como root"
    echo "💡 Configure las credenciales en src/main/resources/application.properties"
}

# Compilar aplicación
echo "🔨 Compilando aplicación..."
mvn clean compile -q

# Ejecutar pruebas
echo "🧪 Ejecutando pruebas..."
mvn test -q

if [ $? -eq 0 ]; then
    echo "✅ Pruebas pasaron exitosamente"
else
    echo "⚠️  Algunas pruebas fallaron, pero continuando..."
fi

# Empaquetar aplicación
echo "📦 Empaquetando aplicación..."
mvn package -DskipTests -q

# Iniciar aplicación
echo "🚀 Iniciando aplicación..."
echo "📍 La aplicación estará disponible en: http://localhost:8080"
echo "📚 Documentación API: http://localhost:8080/swagger-ui.html"
echo "⏹️  Presione Ctrl+C para detener la aplicación"
echo ""

java -jar target/clinic-0.0.1-SNAPSHOT.jar

echo ""
echo "👋 Aplicación detenida. ¡Hasta luego!"