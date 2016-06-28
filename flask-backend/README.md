# Flask Backend

Install elasticsearch (Mac below):

    brew install elasticsearch

Paste the following settings into `config/elasticsearch.yml`:

    http.cors.enabled : true  
    http.cors.allow-origin : "*"
    http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
    http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length

Install and activate conda environment (aca-flask):

    conda env create -f environment.yml
    source activate aca-flask    

Load the data into elasticsearch first using `simulate_plans_data.ipynb`.  

Create tables on AWS RDS PostgreSQL database:

    psql --host=$PG_HOST --port=5432 --username=$PG_USER --password --dbname=$PG_DB --file=schema.sql

Start the webserver:

    python manage.py runserver

#### Home Page
![home](screenshots/v3-ss1.png)
The user selects their state from a dropdown menu. They can also enter a query that will be parsed and used to filter results. The data is logged in a sqlite database with a unique session id.

#### Results Page
![result](screenshots/v3-ss2.png)
The user can search and filter the list of returned plans. The clickstream data is sent back to the Flask server and saved in the sqlite database.
