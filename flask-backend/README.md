# Flask Backend

To install conda environment (aca-flask):
    
    conda env create -f environment.yml
    source activate aca-flask
    python manage.py runserver
    
The form takes an input from the user, queries the sample plans index, and the returns the result with a React frontend. Below are screenshots on how it works (query not processed on ES yet):  
#### Home Page
![home](screenshots/v1-ss1.png)

#### Results Page
![result](screenshots/v2-ss1.png)
