const fs = require('fs');
const path = require('path');

// Configuration
const configPath = path.join(__dirname, 'sidecar-config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Log file paths
const inputLogFile = path.join('/app/logs', 'app.log'); // Shared volume log file
const outputLogFile = path.join('/app/logs', 'filtered.log'); // Filtered logs

// Watch the input log file
fs.watchFile(inputLogFile, { interval: 1000 }, () => {
    const logs = fs.readFileSync(inputLogFile, 'utf-8').split('\n');
    const filteredLogs = logs.filter((log) => {
        // Apply log filtering based on level
        return config.logLevels.some((level) => log.includes(level));
    });

    // Write filtered logs to the output file
    fs.writeFileSync(outputLogFile, filteredLogs.join('\n'), { flag: 'w' });
    console.log(`Filtered logs written to ${outputLogFile}`);
});

console.log('Sidecar container started, watching for logs...');
