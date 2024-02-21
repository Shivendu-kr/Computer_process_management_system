
$(document).ready(function() {
  // Function to fetch system metrics data from the backend
  function fetchSystemMetrics() {
    $.get('/api/systemMetrics', function(data) {
      // Check if data contains CPU and memory usage
      if (data && data.cpuUsage !== undefined && data.memoryUsage !== undefined) {
        // Update CPU usage value
        $('#cpuUsage').text(data.cpuUsage.toFixed(2) + '%');

        // Update memory usage value
        $('#memoryUsage').text(data.memoryUsage.toFixed(2) + '%');
      } else {
        console.error("Error fetching system metrics:", data.error);
      }
    });
  }

  // Fetch system metrics data initially
  fetchSystemMetrics();

  // Fetch system metrics data every 5 seconds
  setInterval(fetchSystemMetrics, 5000);
});
