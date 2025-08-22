@echo off
cd tattio-app\src\scripts
echo Starting Flask server...
set FLASK_ENV=development
set FLASK_DEBUG=1
python -u main.py
pause
