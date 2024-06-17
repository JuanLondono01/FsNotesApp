require('dotenv').config()
require('./database')
const app = require('./app');



async function main () {
    await app.listen(2710);
    console.log('Server running on port 2710');
}

main();