#!/bin/bash

echo "🚀 Iniciando Sistema de Gestión de Clínica..."
echo ""
echo "📋 Características:"
echo "  ✅ Arquitectura Hexagonal"
echo "  ✅ Historia Clínica NoSQL"
echo "  ✅ Sistema de Inventario"
echo "  ✅ Base de datos H2 (sin configuración)"
echo ""
echo "🔧 Ejecutando aplicación..."

# Compilar y ejecutar con perfil de desarrollo
mvn clean compile spring-boot:run -Dspring-boot.run.profiles=dev

echo ""
echo "🎯 Acceso a la aplicación:"
echo "  📱 Aplicación: http://localhost:8080"
echo "  📚 API Docs: http://localhost:8080/swagger-ui.html"
echo "  💾 H2 Console: http://localhost:8080/h2-console"
echo ""
echo "⚡ Presiona Ctrl+C para detener la aplicación"