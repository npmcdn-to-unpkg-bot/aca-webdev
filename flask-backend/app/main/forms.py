from flask_wtf import Form
from wtforms import IntegerField, SelectField, StringField, SubmitField
from wtforms.validators import InputRequired, Length, NumberRange
us_mapping = [('AK', 'Alaska'), ('AZ', 'Arizona'), ('FL', 'Florida'), ('LA', 'Louisiana'), ('MS', 'Missouri'),
    ('MT', 'Montana'), ('NC', 'North Carolina'), ('NM', 'New Mexico'), ('OR', 'Oregon'), ('PA', 'Pennsylvania')]

class InputForm(Form):
    state = SelectField('Select your state:', choices=us_mapping, validators =[ InputRequired()])
    age = IntegerField('Enter your age:', validators =[ InputRequired(), NumberRange(min=1, max=130) ])
    zipcode = StringField('Enter your zipcode:', validators =[ InputRequired(), Length(min=5, max=5)] )
    health = StringField('List any health conditions (e.g. high blood pressure, diabetes).', validators =[ InputRequired()])
    submit = SubmitField('Submit')
