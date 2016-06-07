from flask import render_template, session, redirect, url_for, current_app
from . import main
from .forms import InputForm

@main.route('/', methods=['GET', 'POST'])
def index():
    form = InputForm()
    if form.validate_on_submit():
        session['query'] = form.query.data
        return redirect(url_for('main.results'))
    return render_template('index.html', form=form)

@main.route('/results')
def results():
    letters = list(session['query'])
    return render_template('results.html', query=letters)
