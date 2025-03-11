import json

def test_create_team(client):
    """Test creating a new team"""
    response = client.post("/teams/", json={"team_name": "Development"})
    assert response.status_code == 201
    assert response.json["team_name"] == "Development"

def test_get_teams(client):
    """Test retrieving all teams"""
    client.post("/teams/", json={"team_name": "QA"})
    response = client.get("/teams/")
    assert response.status_code == 200
    assert any(team["team_name"] == "QA" for team in response.json)

def test_update_team(client):
    """Test updating a team"""
    response = client.post("/teams/", json={"team_name": "Backend"})
    team_id = response.json["team_id"]

    update_response = client.put(f"/teams/{team_id}", json={"team_name": "Backend Updated"})
    assert update_response.status_code == 200
    assert update_response.json["team_name"] == "Backend Updated"

def test_delete_team(client):
    """Test deleting a team"""
    response = client.post("/teams/", json={"team_name": "ToDelete"})
    team_id = response.json["team_id"]

    delete_response = client.delete(f"/teams/{team_id}")
    assert delete_response.status_code == 200  # Should return success message

    get_response = client.get("/teams/")
    assert not any(team["team_id"] == team_id for team in get_response.json)  # Ensure it's deleted
