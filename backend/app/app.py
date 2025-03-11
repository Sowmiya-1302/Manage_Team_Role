from flask import Flask, render_template
from flask_restx import Api
from app.database.teamroledb import init_db, db
import os

from app.database.seed import seed_data
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__, template_folder="templates")
CORS(app)

# Force TESTING=True before anything else
app.config['TESTING'] = os.getenv('TESTING') == 'True' or 'pytest' in os.environ.get('_', '')

if app.config['TESTING']:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sowmiya:sowmiya13@postgres:5432/teams_roles_pstg_db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app, title='Teams and Roles API', version='1.0', description='Manage Teams and Roles')
migrate = Migrate(app, db)  

def register_routes():
    from app.routes.teams import teams_ns
    from app.routes.roles import roles_ns
    api.add_namespace(teams_ns, path='/teams')
    api.add_namespace(roles_ns, path='/roles')

register_routes()

# Initialize database
init_db(app)

from flask.cli import FlaskGroup

cli = FlaskGroup(app)

if __name__ == '__main__':
    cli()


# Seed database
with app.app_context():
    if not app.config.get('TESTING', False): 
        from alembic import command
        from alembic.config import Config
        from sqlalchemy import inspect

        import os
        from alembic.config import Config

        # Point to correct Alembic file
        alembic_path = os.path.join(os.path.dirname(__file__), "..", "alembic.ini")
        if os.path.exists(alembic_path):
            alembic_cfg = Config(alembic_path)
            command.upgrade(alembic_cfg, "head")

            # Check if tables exist before seeding
            inspector = inspect(db.engine)
            if "team" in inspector.get_table_names():
                print("Database tables found. Running seed script...")
                seed_data()
            else:
                print("Skipping seeding: Database tables do not exist.")
        else:
            print("ERROR: Alembic config file not found!")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')