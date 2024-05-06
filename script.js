const apiUrl1 = 'https://api.github.com/repos/Extravi/Installer/releases';
const apiUrl2 = 'https://api.github.com/repos/Extravi/Bloxshade/releases';
const apiUrl3 = 'https://api.github.com/repos/Extravi/bloxshade-args/releases';

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return await response.json();
}

async function calculateTotalDownloadCount() {
    try {
        const [releases1, releases2, releases3] = await Promise.all([
            fetchData(apiUrl1),
            fetchData(apiUrl2),
            fetchData(apiUrl3)
        ]);

        let totalDownloadCount = 0;
        for (const release of releases1.concat(releases2, releases3)) {
            totalDownloadCount += release.assets.reduce(
                (acc, asset) => acc + asset.download_count,
                0
            );
        }

        const formattedTotal = `- ${totalDownloadCount.toLocaleString()} downloads`;
        const downloadsCountElement = document.querySelector('.downloads-count');
        downloadsCountElement.textContent = formattedTotal;
    } catch (error) {
        console.error('Error:', error);
    }
}

calculateTotalDownloadCount();
