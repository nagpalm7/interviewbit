# InterviewBit Assignment

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

We have backend folder for django and frontend folder for react.

# Steps to run the code!
### Django Setup
  - Clone the project
  - cd to backend folder
  - create environment using `python3 -m venv env`
  - Activate the environment and install requirements using `source env/bin/activate` 
  `pip install -r requirements.txt` 
 - Migrate - `python manage.py migrate `
 - Create a super user `python manage.py createsuperuser --email admin@example.com --username admin`
 - Run server using command `python manage.py runserver`.

Leave the terminal and open a new tab.

### Frontend or React Setup
- cd directory to frontend.
- Install dependecies using yarn `yarn install`
- Run development server using `yarn start`
- Browser will open with ***localhost:3000/interviews***, where you can add, edit and delete interviews.


