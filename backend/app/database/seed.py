from app.models.teamrolemodel import Team, Role
from app.database.teamroledb import db

def seed_data():
        if not Team.query.first():
            teams = [
                Team(team_name='Development'),
                Team(team_name='Marketing'),
                Team(team_name='Sales')
            ]
            db.session.add_all(teams)
            db.session.commit()
            
            roles = [
            Role(role_name='Manager', team_id=Team.query.filter_by(team_name='Development').first().team_id),
            Role(role_name='Developer', team_id=Team.query.filter_by(team_name='Development').first().team_id),
            Role(role_name='Designer', team_id=Team.query.filter_by(team_name='Marketing').first().team_id)
            ]

            
            db.session.add_all(roles)
            db.session.commit()