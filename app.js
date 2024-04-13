const express = require('express');
const config = require('./src/config/local.json');


function serveBackend() {
    const app = express();
    const port = 3000;

    const server = app.listen(config.server.port, () => {
        console.log(`Server listening on port ${port}`);
    })
}

serveBackend();