import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class ReportDatabase:
    """A class to handle MongoDB database operations for reporting functionality"""
    def __init__(self, db_name="report_database"):
        """
        Initialize database connection and collections
        
        Args:
            uri (str): MongoDB connection string
            db_name (str): Name of the database (defaults to 'report_database')
        
        Raises:
            Exception: If unable to connect to MongoDB
        """
        try:
                    # Retrieve MongoDB URI from environment variables
            self._uri = os.environ.get("MONGO_URI")
            if not self._uri:
                raise Exception("MONGO_URI not found in environment variables.")

            # Create MongoDB client connection
            self.client = MongoClient(self._uri)
            # Verify connection by running admin command
            self.client.admin.command("ismaster")
            print("Connected to MongoDB successfully!")
        except ConnectionFailure as e:
            raise Exception("Unable to connect to MongoDB. Error: " + str(e))
        
        # Initialize database and collection references
        self._db = self.client[db_name]
        self.reports = self._db["reports"]          # Collection for storing reports
        self.graphs = self._db["graphs"]            # Collection for storing graphs
        self.vulnerabilities = self._db["vulnerabilities"]  # Collection for storing vulnerabilities
        self.tests = self._db["tests"]              # Collection for storing tests
