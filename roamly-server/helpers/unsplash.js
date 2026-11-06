const axios = require('axios')

const cache = {}

async function getPhoto(destination) {
    try {
        const key = destination.toLowerCase()

        if (cache[key]) {
            return cache[key]
        }

        const { data } = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: destination,
                per_page: 1,
                orientation: 'landscape'
            },
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        })

        if (data.results.length === 0) {
            return null
        }

        const result = data.results[0]

        cache[key] = {
            url: result.urls.small,
            photographer: result.user.name,
            link: result.links.html
        }

        return cache[key]
    } catch (error) {
        return null
    }
}

module.exports = getPhoto