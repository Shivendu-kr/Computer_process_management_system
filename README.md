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
# Install Dependencies:
cd Computer-process-management
npm init -y
npm i express child_process mongoose os

# Set Up MongoDB:
run MongoDB server : mongod
To see saved database: cmd mongose --> show dbs --> use tasklistDB --> db.tasklistDB.find()

# Run the app.js
node app.js
