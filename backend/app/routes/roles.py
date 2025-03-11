from flask_restx import Namespace, Resource, fields
from app.models.teamrolemodel import Role
from app.models.teamrolemodel import Team
from app.database.teamroledb import db
from flask import request

roles_ns = Namespace('roles', description='Operations related to roles')

# Define request model
role_model_create = roles_ns.model('Role', {
    'role_name': fields.String(required=True, description='Name of the role'),
    'team_id': fields.Integer(required=True, description='ID of the Team')
})

role_model_update = roles_ns.model('Role', {
    'role_name': fields.String(required=True, description='Name of the role'),
    'team_id': fields.Integer( description='ID of the Team')
})

@roles_ns.route('/')
class RolesResource(Resource):
    def get(self):
        roles = (
            db.session.query(Role.role_id, Role.role_name, Role.team_id, Team.team_name)
            .join(Team, Role.team_id == Team.team_id)
            .all()
        )
        return [
            {
                "role_id": role.role_id,
                "role_name": role.role_name,
                "team_id": role.team_id,
                "team_name": role.team_name,  # Include team_name
            }
            for role in roles
        ]
    
    @roles_ns.expect(role_model_create)
    def post(self):
        data = request.json
        # Check if the team exists
        team = Team.query.get(data['team_id'])
        
        # Return error if team doesn't exist
        if not team:
            return {'message': 'Invalid team_id. No such team exists.'}, 400 

        new_role = Role(role_name=data.get('role_name'), team_id=data.get('team_id'))
        db.session.add(new_role)
        db.session.commit()
        return {'role_id': new_role.role_id, 'role_name': new_role.role_name}, 201

@roles_ns.route('/<int:id>')
class RoleResource(Resource):

    @roles_ns.expect(role_model_update)
    def put(self, id):
        data = request.json
        role = Role.query.get_or_404(id)
        
        #Update if role name is provided
        if 'role_name' in data:
            role.role_name = data['role_name']
        
        #Update team id if provided
        if 'team_id' in data:
            # Check if the team exists
            team = Team.query.get(data['team_id'])
            # Return error if team doesn't exist
            if not team:
                return {'message': 'Invalid team_id. No such team exists.'}, 400 
            role.team_id = data['team_id']

        db.session.commit()
        return {'role_id': role.role_id, 'role_name': role.role_name, 'team_id': role.team_id}

    def delete(self, id):
        role = Role.query.get_or_404(id)
        db.session.delete(role)
        db.session.commit()
        return {'message': 'Role deleted'}
