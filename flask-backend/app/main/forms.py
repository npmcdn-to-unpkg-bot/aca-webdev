from flask_wtf import Form
from wtforms import IntegerField, SelectField, SubmitField
from wtforms.validators import Required
from us.states import mapping

us_mapping = sorted(mapping('abbr', 'name').items())

class InputForm(Form):
    state = SelectField('Select your state:', choices=us_mapping, validators =[ Required()])
    age = IntegerField('Enter your age:', validators =[ Required()])
    zipcode = IntegerField('Enter your zipcode:', validators =[ Required()])
    tobacco = SelectField('Do you smoke?', choices=[('no', 'No'), ('yes', 'Yes')], validators =[ Required()])
    submit = SubmitField('Submit')
