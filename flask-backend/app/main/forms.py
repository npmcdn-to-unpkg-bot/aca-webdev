from flask_wtf import Form
from wtforms import IntegerField, SelectField, StringField, SubmitField
from wtforms.validators import InputRequired, Length, NumberRange

us_mapping = [('AK', u'Alaska'), ('AL', u'Alabama'), ('AR', u'Arkansas'), ('AZ', u'Arizona'), ('DE', u'Delaware'),
('FL', u'Florida'), ('GA', u'Georgia'), ('HI', u'Hawaii'), ('IA', u'Iowa'), ('IL', u'Illinois'), ('IN', u'Indiana'),
('KS', u'Kansas'), ('LA', u'Louisiana'), ('ME', u'Maine'), ('MI', u'Michigan'), ('MO', u'Missouri'), ('MS', u'Mississippi'),
('MT', u'Montana'), ('NC', u'North Carolina'), ('ND', u'North Dakota'), ('NE', u'Nebraska'), ('NH', u'New Hampshire'),
('NJ', u'New Jersey'), ('NM', u'New Mexico'), ('NV', u'Nevada'), ('OH', u'Ohio'), ('OK', u'Oklahoma'), ('OR', u'Oregon'),
('PA', u'Pennsylvania'), ('SC', u'South Carolina'), ('SD', u'South Dakota'), ('TN', u'Tennessee'), ('TX', u'Texas'), ('UT', u'Utah'),
('VA', u'Virginia'), ('WI', u'Wisconsin'), ('WV', u'West Virginia'), ('WY', u'Wyoming')]

class InputForm(Form):
    state = SelectField('Select your state:', choices=us_mapping, validators =[ InputRequired()])
    age = IntegerField('Enter your age:', validators =[ InputRequired(), NumberRange(min=1, max=130) ])
    zipcode = StringField('Enter your zipcode:', validators =[ InputRequired(), Length(min=5, max=5)] )
    health = StringField('List any health conditions (e.g. high blood pressure, diabetes).', validators =[ InputRequired()])
    submit = SubmitField('Submit')
