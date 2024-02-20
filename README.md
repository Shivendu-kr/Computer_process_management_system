# Computer_process_management_system
This project is a computer process management system developed using Node.js, MongoDB, and a bit of frontend to monitor system backend processes. It automatically saves process information to MongoDB and shuts down any processes exhibiting abnormalities.
# Features
Process Monitoring: Constantly monitors system backend processes.

Abnormality Detection: Identifies abnormal behavior in processes.

Automatic Shutdown: Automatically shuts down processes with abnormalities.

Database Integration: Stores process information in MongoDB.

# Technologies Used
Node.js: Backend server environment.

MongoDB: NoSQL database for storing process data.

Frontend: Minimal frontend for user interaction.

# Setup Instructions
Clone the Repository: https://github.com/Shivendu-kr/Computer_process_management_system.git

# File Architecture
computer-process-management/
│
├── config.js                # Configuration file (MongoDB connection, thresholds)
├── app.js                   # The Main file
│
├── public/                  # Directory for static files (frontend)
│   └── index.html           # Main HTML file
│   └── scripts.js           # Main function file
│   └── styles.css           # Cascading Style Sheets


# Install Dependencies:
cd Computer-process-management
npm init -y
npm i express child_process mongoose os

# Set Up MongoDB:
Run MongoDB server : mongod
To see saved database: cmd mongose --> show dbs --> use tasklistDB --> db.tasklistDB.find()

# Run the app.js
node app.js
# Access the Application:
Open your browser and go to http://localhost:3000.

# Configuration
MongoDB connection settings can be configured in config.js.
Process monitoring thresholds and other settings can be adjusted in config.js.
# Usage
The system automatically monitors CPU and memory usage.
Abnormalities trigger automatic shutdown of corresponding processes.
The frontend displays current system metrics.
# API Endpoints
GET /api/systemMetrics: Retrieves CPU and memory usage metrics.

# 
License
This project is licensed under the MIT License.

# Acknowledgements
Special thanks to Node.js and MongoDB for their powerful platforms.
Thanks to all the online resources that helped improving this project.
