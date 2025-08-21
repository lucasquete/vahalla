@echo off
SETLOCAL

REM --- Configuracion ---
SET PUERTO=3000
SET TIEMPO_ESPERA=10
SET COMANDO_RUN=npm run dev
REM ---------------------

TITLE Lanzador de Proyecto Next.js

echo.
echo =========================================
echo   Iniciando servidor de Next.js...
echo =========================================
echo.
echo   > Usando el comando: %COMANDO_RUN%
echo.

:: Inicia el servidor de desarrollo en una NUEVA ventana de consola
start "Servidor Next.js" %COMANDO_RUN%

echo Esperando %TIEMPO_ESPERA% segundos para que el servidor inicie...
:: El comando "timeout" pausa el script. Es mas compatible sin opciones extra.
timeout /t %TIEMPO_ESPERA%

echo.
echo Abriendo el navegador en http://localhost:%PUERTO% ...

:: "start" con una URL la abre en el navegador predeterminado
start http://localhost:%PUERTO%

echo.
echo ===================================================================
echo  Script finalizado. El servidor esta corriendo en otra ventana.
echo ===================================================================
echo.

ENDLOCAL
pause