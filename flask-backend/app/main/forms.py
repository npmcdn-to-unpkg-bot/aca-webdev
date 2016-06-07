from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required


class InputForm(Form):
    name = StringField('Which plan are you looking for?')
    submit = SubmitField('Submit')
