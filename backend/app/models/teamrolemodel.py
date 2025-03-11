from app.database.teamroledb import db

class Team(db.Model):
    team_id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    roles = db.relationship('Role', backref='team', lazy=True, cascade="all, delete")

class Role(db.Model):
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(100), nullable=False)
    role_description = db.Column(db.String(100), nullable=True)
    team_id = db.Column(db.Integer, db.ForeignKey('team.team_id'), nullable=False)

    