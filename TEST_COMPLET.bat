@echo off
color 0A
title RISO - Test Complet du Responsive

echo.
echo ============================================================
echo           RISO - Test Complet du Responsive
echo ============================================================
echo.
echo Ce script va ouvrir les pages de test dans l'ordre optimal
echo pour verifier que votre site est bien responsive.
echo.
echo ============================================================
echo.

:menu
echo.
echo Que voulez-vous faire ?
echo.
echo [1] Verification automatique complete (RECOMMANDE)
echo [2] Test simple rapide
echo [3] Test responsive avance
echo [4] Ouvrir le site principal (avec instruction cache)
echo [5] Ouvrir TOUS les tests en meme temps
echo [6] Lire le guide de depannage
echo [7] Quitter
echo.
set /p choix="Votre choix (1-7) : "

if "%choix%"=="1" goto verification
if "%choix%"=="2" goto simple
if "%choix%"=="3" goto avance
if "%choix%"=="4" goto principal
if "%choix%"=="5" goto tous
if "%choix%"=="6" goto guide
if "%choix%"=="7" goto fin
goto menu

:verification
cls
echo.
echo ============================================================
echo         Ouverture de la verification automatique
echo ============================================================
echo.
echo Cette page va tester automatiquement :
echo   - Meta viewport
echo   - Fichier CSS
echo   - Breakpoints
echo   - Menu hamburger
echo   - Et plus encore...
echo.
echo Regardez le resultat dans votre navigateur.
echo.
pause
start "" "VERIFICATION_FINALE.html"
echo.
echo Verification lancee !
echo.
timeout /t 2 >nul
goto menu

:simple
cls
echo.
echo ============================================================
echo              Ouverture du test simple
echo ============================================================
echo.
echo Ce test va vous montrer :
echo   - Votre taille d'ecran
echo   - Le breakpoint actuel
echo   - Des grilles qui s'adaptent
echo.
echo Redimensionnez la fenetre pour voir les changements !
echo.
pause
start "" "test-simple.html"
echo.
echo Test simple lance !
echo.
timeout /t 2 >nul
goto menu

:avance
cls
echo.
echo ============================================================
echo            Ouverture du test avance
echo ============================================================
echo.
echo Ce test inclut :
echo   - Indicateur en temps reel
echo   - Tests de grilles
echo   - Statut du hamburger
echo   - Informations detaillees
echo.
pause
start "" "test-responsive.html"
echo.
echo Test avance lance !
echo.
timeout /t 2 >nul
goto menu

:principal
cls
echo.
echo ============================================================
echo          Ouverture du site principal
echo ============================================================
echo.
echo IMPORTANT !!! LISEZ ATTENTIVEMENT !!!
echo.
echo Le site va s'ouvrir dans votre navigateur.
echo.
echo VOUS DEVEZ :
echo   1. Attendre que la page soit chargee
echo   2. Appuyer sur Ctrl + Shift + R
echo   3. Cela va vider le cache et recharger le CSS
echo.
echo Si vous ne faites pas ca, le site ne sera pas responsive
echo (a cause du cache du navigateur).
echo.
pause
start "" "index.html"
echo.
echo Site principal ouvert !
echo N'oubliez pas : Ctrl + Shift + R !
echo.
timeout /t 3 >nul
goto menu

:tous
cls
echo.
echo ============================================================
echo         Ouverture de TOUS les tests
echo ============================================================
echo.
echo Les pages suivantes vont s'ouvrir :
echo   1. Verification automatique
echo   2. Test simple
echo   3. Test avance
echo.
echo Vous pourrez comparer les resultats.
echo.
pause
echo.
echo Ouverture en cours...
timeout /t 1 >nul
start "" "VERIFICATION_FINALE.html"
timeout /t 1 >nul
start "" "test-simple.html"
timeout /t 1 >nul
start "" "test-responsive.html"
echo.
echo Tous les tests sont ouverts !
echo.
timeout /t 2 >nul
goto menu

:guide
cls
echo.
echo ============================================================
echo            Ouverture du guide
echo ============================================================
echo.
start "" "LIRE_MOI_EN_PREMIER.txt"
timeout /t 1 >nul
start "" "GUIDE_DEPANNAGE_RESPONSIVE.md"
echo.
echo Guides ouverts !
echo.
timeout /t 2 >nul
goto menu

:fin
cls
echo.
echo ============================================================
echo                   Au revoir !
echo ============================================================
echo.
echo Votre site RISO est 100%% responsive.
echo.
echo N'oubliez pas :
echo   - Vider le cache sur index.html (Ctrl+Shift+R)
echo   - Tester avec Chrome DevTools (F12 + icone mobile)
echo   - Consulter les guides en cas de probleme
echo.
echo Bon developpement ! :)
echo.
timeout /t 3
exit
