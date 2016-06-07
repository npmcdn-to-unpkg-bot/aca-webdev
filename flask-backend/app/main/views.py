from flask import render_template, session, redirect, url_for, current_app
from . import main
from .forms import InputForm

@main.route('/', methods=['GET', 'POST'])
def index():
    form = InputForm()
    return render_template('index.html', form=form)
