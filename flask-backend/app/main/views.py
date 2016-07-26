from flask import abort, jsonify, redirect, render_template, request, session, url_for
from . import main
from database import get_db, log_query, log_click, log_ranks
from forms import InputForm
from letor_get_weights import get_weights
from uuid import uuid4


@main.route('/', methods=['GET', 'POST'])
def index():
    form = InputForm()
    if form.validate_on_submit():
        session['session_id'] = unicode(uuid4())
        session['state'] = form.state.data
        session['age'] = form.age.data
        session['zipcode'] = form.zipcode.data
        session['health'] = form.health.data
        session['parsed_query'] = get_weights(session['state'], session['health'])
        log_query(
            session_id = session['session_id'],
            state = session['state'],
            age = session['age'],
            zipcode = session['zipcode'],
            health = session['health']
        )
        return redirect(url_for('main.results'))
    return render_template('index.html', form=form)

@main.route('/results')
def results():
    response = dict(user_state=session['state'], parsed_query=session['parsed_query'])
    return render_template('results.html', response=response)

@main.route('/_clicks', methods=['POST'])
def _clicks():
    if ('session_id' not in session) or (not request.form) or ('plan_id' not in request.form):
        abort(400)
    plan_id = request.form['plan_id']
    log_click(session['session_id'], plan_id)
    return jsonify({'status': 'OK'}), 201

@main.route('/_ranks', methods=['POST'])
def _ranks():
    if ('session_id' not in session) or (not request.form) or ('plan_id' not in request.form):
        abort(400)
    plan_id = request.form['plan_id']
    plan_score = request.form['plan_score']
    log_ranks(session['session_id'], plan_id, plan_score)
    return jsonify({'status': 'OK'}), 201
