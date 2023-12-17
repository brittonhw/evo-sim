## running locally (MacOS)

1. `cd backend/`
2. add the current directory to your pythonpath
   - `export PYTHONPATH=$PYTHONPATH:.`
3. create a venv
   - `/usr/local/bin/python3.11 -m venv .venv`
   - `source .venv/bin/activate`
   - `pip install -r requirements.txt`
4. start the application
   - `python src/main/main.py`
   - explore API's at http://localhost:8300/docs
