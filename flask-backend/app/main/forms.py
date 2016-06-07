from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required


class InputForm(Form):
    query = StringField('Which plan are you looking for?', validators =[ Required()])
    submit = SubmitField('Submit')
