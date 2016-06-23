from flask import abort, jsonify, redirect, render_template, request, session, url_for
from . import main
from .forms import InputForm
from uuid import uuid4
from database import get_db, log_query, log_click
from parse import parse_raw

@main.route('/', methods=['GET', 'POST'])
def index():
    form = InputForm()
    if form.validate_on_submit():
        session['session_id'] = unicode(uuid4())
        session['state'] = form.state.data
        session['raw_query'] = form.query.data
        session['parsed_query'] = parse_raw(session['raw_query'])
        log_query(session['session_id'], session['state'], session['raw_query'], session['parsed_query'])
        return redirect(url_for('main.results'))
    return render_template('index.html', form=form)

@main.route('/results')
def results():
    response = dict(parsed_query=session['parsed_query'], user_state=session['state'])
    return render_template('results.html', response=response)

@main.route('/_clicks', methods=['POST'])
def _clicks():
    if ('session_id' not in session) or (not request.form) or ('event' not in request.form):
        abort(400)
    event = request.form['event']
    log_click(session['session_id'], event)
    return jsonify({'status': 'OK'}), 201
