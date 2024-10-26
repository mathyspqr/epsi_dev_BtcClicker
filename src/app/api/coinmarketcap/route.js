export async function GET() {
    try {
        const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': '0125d9ce-e7da-4117-814c-910878c87392',
                'Accept': 'application/json',
            },
        });

        const responseText = await response.text();
        console.log(responseText);

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const data = JSON.parse(responseText);

        // Transformation des données pour inclure le logo
        const transformedData = data.data.map(crypto => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            rank: crypto.cmc_rank,
            logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`, // Construction de l'URL du logo
            quote: {
                USD: {
                    price: crypto.quote.USD.price,
                    volume_24h: crypto.quote.USD.volume_24h,
                    percent_change_1h: crypto.quote.USD.percent_change_1h,
                    percent_change_24h: crypto.quote.USD.percent_change_24h,
                    percent_change_7d: crypto.quote.USD.percent_change_7d,
                    market_cap: crypto.quote.USD.market_cap,
                    last_updated: crypto.quote.USD.last_updated,
                }
            }
        }));

        return new Response(JSON.stringify({ data: transformedData }), { status: 200 });
    } catch (err) {
        console.error('Erreur dans le bloc catch:', err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
