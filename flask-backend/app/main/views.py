from flask import render_template, session, redirect, url_for, current_app
from . import main
from .forms import InputForm
from .elastic import get_best_plans

@main.route('/', methods=['GET', 'POST'])
def index():
    form = InputForm()
    if form.validate_on_submit():
        session['query'] = form.query.data
        return redirect(url_for('main.results'))
    return render_template('index.html', form=form)

@main.route('/results')
def results():
    # es_results = get_best_plans(session['query'])
    query = session['query']
    return render_template('results.html', query=query)
