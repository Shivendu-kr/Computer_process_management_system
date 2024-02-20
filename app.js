const express = require('express');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tasklistDB').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});


//here i define the approx threshod %
const CPU_THRESHOLD = 80; // Normal CPU threshold
const MEMORY_THRESHOLD = 90; // Normal memory threshold


const SystemMetrics = mongoose.model('SystemMetrics', {
    cpuUsage: Number,
    memoryUsage: Number,
    timestamp: { type: Date, default: Date.now }
});

// here is the function that monitor and save to MongoDB datababe
function monitorSystem() {
    setInterval(() => {
        const cpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;

        cpus.forEach(cpu => {
            for (type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });

        const totalUsage = 100 - (totalIdle / totalTick) * 100;

        // Calculate CPU usage percentage
        const cpuUsage = parseFloat(totalUsage.toFixed(2));

        // Calculate memory usage percentage
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;

        console.log(`Current CPU Usage: ${cpuUsage}%`);
        console.log(`Current Memory Usage: ${memoryUsage}%`);

        // Save system metrics data to MongoDB
        const systemMetrics = new SystemMetrics({ cpuUsage, memoryUsage });
        systemMetrics.save()
            .then(() => console.log('System metrics saved to MongoDB'))
            .catch(err => console.error('Error saving system metrics to MongoDB:', err));

        // Checking for abnormal patterns 
        if (cpuUsage > CPU_THRESHOLD) {
            console.log('CPU usage is too high! Stopping monitored application...');
            stopMonitoredApplication();
        }
        if (memoryUsage > MEMORY_THRESHOLD) {
            console.log('Memory usage is too high! Stopping monitored application...');
            stopMonitoredApplication();
        }

        // Send system metrics data in the response
        app.set('systemMetrics', { cpuUsage, memoryUsage });
    }, 5000); // for every 5  seconds
}

// Function to stop the abnormal application
function stopMonitoredApplication() {

    //searching for any abnormalities by all running processes
    exec('wmic process get ProcessId,CommandLine /format:csv', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error retrieving process information: ${error}`);
            return;
        }
        
        // Split the stdout into lines
        const lines = stdout.split('\r\n');
        
        // Iterate through each line to find processes exceeding thresholds
        lines.forEach(line => {
            // Skip empty lines and header
            if (line && !line.includes('ProcessId')) {
                const [pid, commandLine] = line.split(',');

                // Check if the process exceeds thresholds
                if ((cpuUsage > CPU_THRESHOLD || memoryUsage > MEMORY_THRESHOLD)) {
                    // Terminate the process with the identified PID
                    exec(`taskkill /F /PID ${pid}`, (killError, killStdout, killStderr) => {
                        if (killError) {
                            console.error(`Error stopping process with PID ${pid}: ${killError}`);
                            return;
                        }
                        console.log(`Process with PID ${pid} stopped successfully: ${killStdout}`);
                    });
                }
            }
        });
    });
}



monitorSystem();

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/api/systemMetrics', (req, res) => {

    const systemMetrics = app.get('systemMetrics');

    // Check if system metrics are available
    if (systemMetrics && systemMetrics.cpuUsage !== undefined && systemMetrics.memoryUsage !== undefined) {
        // Destructure cpuUsage and memoryUsage from systemMetrics
        const { cpuUsage, memoryUsage } = systemMetrics;

        // Send JSON response with CPU and memory usage data
        res.json({ cpuUsage, memoryUsage });
    } else {
        // Send an error response if system metrics are not available
        res.status(500).json({ error: "System metrics not available yet." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
