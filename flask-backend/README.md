# Flask Backend

Install and activate conda environment (aca-flask):

    conda env create -f environment.yml
    source activate aca-flask    

Load the data into elasticsearch first using `simulate_plans_data.ipynb`.  

Initialize sqlite database by running:

    sqlite3 data-dev.sqlite schema.sql

Start the webserver:

    python manage.py runserver

#### Home Page
![home](screenshots/v3-ss1.png)
The user selects their state from a dropdown menu. They can also enter a query that will be parsed and used to filter results. The data is logged in a sqlite database with a unique session id.

#### Results Page
![result](screenshots/v3-ss2.png)
The user can search and filter the list of returned plans. The clickstream data is sent back to the Flask server and saved in the sqlite database.
