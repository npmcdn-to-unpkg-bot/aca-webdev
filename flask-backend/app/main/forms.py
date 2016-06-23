from flask_wtf import Form
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import Required
from us.states import mapping

us_mapping = sorted(mapping('abbr', 'name').items())

class InputForm(Form):
    state = SelectField('Select your state:', choices=us_mapping, validators =[ Required()])
    query = StringField('What kind of plan are you looking for?', validators =[ Required()])
    submit = SubmitField('Submit')
