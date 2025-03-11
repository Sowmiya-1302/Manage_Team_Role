from flask_restx import Namespace, Resource, fields
from app.models.teamrolemodel import Team
from app.database.teamroledb import db
from flask import request

teams_ns = Namespace('teams', description='Operations related to teams')

# Define request model
team_model = teams_ns.model('Team', {
    'team_id': fields.Integer,
    'team_name': fields.String(required=True, description='Name of the team'),
    'description': fields.String(description = 'Description of the team')
})

@teams_ns.route('/')
class TeamsResource(Resource):
    @teams_ns.marshal_with(team_model)
    def get(self):
        teams = Team.query.all()
        return teams
    
    @teams_ns.expect(team_model)
    def post(self):
        if not request.is_json:
            return {'message': 'Request body must be JSON'}, 400  # Return error if JSON is missing
        data = request.json
        new_team = Team(team_name=data.get('team_name'))
        db.session.add(new_team)
        db.session.commit()
        return {'team_id': new_team.team_id, 'team_name': new_team.team_name}, 201

@teams_ns.route('/<int:id>')
class TeamResource(Resource):

    @teams_ns.expect(team_model)
    def put(self, id):
        data = request.json
        team = Team.query.get_or_404(id)
        team.team_name = data['team_name']
        db.session.commit()
        return {'team_id': team.team_id, 'team_name': team.team_name}

    def delete(self, id):
        team = Team.query.get_or_404(id)
        db.session.delete(team)
        db.session.commit()
        return {'message': 'Team deleted'}