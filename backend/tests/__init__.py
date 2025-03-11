import os

# Ensure TESTING=True is set before anything runs
os.environ["TESTING"] = "True"
print("TESTING ENV VARIABLE (__init__.py):", os.getenv("TESTING"))  # Debugging info