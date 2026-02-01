import logging
import os
from datetime import datetime

# Base directory of this script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Create 'logs' folder if it doesn't exist
log_dir = os.path.join(base_dir, "logs")
os.makedirs(log_dir, exist_ok=True)

# Log filename
log_filename = datetime.now().strftime("%Y-%m-%d") + ".log"  # one log per day
log_file_path = os.path.join(log_dir, log_filename)

# Setup logging
logging.basicConfig(
    filename=log_file_path,
    level=logging.INFO,  # logs info, warning, error, critical
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Example log messages
logging.info("This is an INFO message")
logging.error("This is an ERROR message")
logging.warning("This is a WARNING message")

print(f"Logging to: {log_file_path}")
