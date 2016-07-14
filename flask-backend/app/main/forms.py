from flask_wtf import Form
from wtforms import IntegerField, SelectField, StringField, SubmitField
from wtforms.validators import InputRequired, Length, NumberRange
# from us.states import mapping
# us_mapping = sorted(mapping('abbr', 'name').items())
us_mapping = [('AZ', 'Arizona'), ('FL', 'Florida'), ('LA', 'Louisiana'), ('MT', 'Montana'), ('SC', 'South Carolina')]

class InputForm(Form):
    state = SelectField('Select your state:', choices=us_mapping, validators =[ InputRequired()])
    age = IntegerField('Enter your age:', validators =[ InputRequired(), NumberRange(min=1, max=130) ])
    zipcode = StringField('Enter your zipcode:', validators =[ InputRequired(), Length(min=5, max=5)] )
    health = StringField('Do you have any health conditions? If so, list them here.', validators =[ InputRequired()])
    submit = SubmitField('Submit')
