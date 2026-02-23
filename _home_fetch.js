const https = require('https');

const url = 'https://pauldelonph.myportfolio.com/';
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        // Look for images with keywords in alt/src or parent classes
        const regex = /<img[^>]+src="([^">]+)"[^>]*>/gi;
        let m;
        while ((m = regex.exec(data)) !== null) {
            console.log(m[0]);
        }
    });
});
