## first time setup, running locally (MacOS)

1. `cd backend/`
2. add the current directory to your pythonpath
   - `export PYTHONPATH=$PYTHONPATH:.`
3. create a venv
   - `/usr/local/bin/python3.12 -m venv .venv`
   - `source .venv/bin/activate`
   - `pip install -r requirements.txt`

4. aws local creds
   - `export AWS_ACCESS_KEY_ID=test`
   - `export AWS_SECRET_ACCESS_KEY=test`
   - `export AWS_DEFAULT_REGION=us-east-1`
5. start the application
   - `python src/main/main.py`
   - explore API's at http://localhost:8300/evo-sim/docs
