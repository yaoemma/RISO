@echo off
echo ========================================
echo    RISO - Ouverture du site
echo ========================================
echo.
echo Choix disponibles:
echo.
echo [1] Ouvrir index.html directement
echo [2] Ouvrir test-responsive.html (page de test)
echo [3] Ouvrir avec Chrome DevTools (mode responsive)
echo [4] Lancer un serveur local Python
echo [5] Vider le cache et ouvrir
echo.
set /p choix="Votre choix (1-5): "

if "%choix%"=="1" goto ouvrir_index
if "%choix%"=="2" goto ouvrir_test
if "%choix%"=="3" goto ouvrir_devtools
if "%choix%"=="4" goto serveur_python
if "%choix%"=="5" goto vider_cache
goto fin

:ouvrir_index
echo.
echo Ouverture de index.html...
start "" "index.html"
goto fin

:ouvrir_test
echo.
echo Ouverture de test-responsive.html...
start "" "test-responsive.html"
goto fin

:ouvrir_devtools
echo.
echo Ouverture avec Chrome en mode DevTools...
start chrome --auto-open-devtools-for-tabs "%cd%\index.html"
goto fin

:serveur_python
echo.
echo Tentative de lancement d'un serveur Python...
echo Si Python n'est pas installe, installez-le depuis python.org
echo.
python --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Python n'est pas installe ou pas dans le PATH
    echo.
    echo Installez Python depuis: https://www.python.org/downloads/
    echo Ou utilisez les autres options du menu
    pause
    goto fin
)
echo.
echo Serveur demarre sur: http://localhost:8000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
start http://localhost:8000
python -m http.server 8000
goto fin

:vider_cache
echo.
echo Instructions pour vider le cache:
echo.
echo 1. Le site va s'ouvrir dans votre navigateur par defaut
echo 2. Appuyez sur Ctrl + Shift + R (Windows) pour vider le cache
echo 3. Ou F12 puis clic droit sur Refresh et choisir "Empty Cache and Hard Reload"
echo.
pause
start "" "index.html"
goto fin

:fin
echo.
echo ========================================
echo         Fin du script
echo ========================================
pause
