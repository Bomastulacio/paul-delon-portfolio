const https = require('https');

const pages = [
    'paul-delon', // Likely about page
    'retrato-de-escultor',
    'damian-kuc-minerva',
    '' // Home page
];

let i = 0;
function fetchPage(slug) {
    const url = 'https://pauldelonph.myportfolio.com/' + slug;
    console.log(`Fetching ${url}...`);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            const regex = /https:\/\/cdn\.myportfolio\.com\/[a-f0-9-]+\/[a-f0-9-]+_rw_\d+\.[a-z]+\?h=[a-f0-9]+/gi;
            const urls = new Set();
            let m;
            while ((m = regex.exec(data)) !== null) {
                urls.add(m[0]);
            }
            console.log(`=== ${slug || 'home'} === (${urls.size} images)`);
            urls.forEach(u => console.log(u));
            console.log('');

            i++;
            if (i < pages.length) fetchPage(pages[i]);
        });
    }).on('error', (e) => {
        console.log(`ERROR ${slug}: ${e.message}`);
        i++;
        if (i < pages.length) fetchPage(pages[i]);
    });
}
fetchPage(pages[0]);
