const elastic = require("../service/elasticsearch")

function processQuery(query) {
    return query.split(' ');
}

async function searchRelevantText(query, size = 5) {
    const importantTerms = processQuery(query);

    const shouldQueries = importantTerms.map(term => ({
        match: {
            content: {
                query: term,
                boost: 4.0
            }
        }
    }));

    const boolQuery = {
        bool: {
            should: shouldQueries,
        }
    };

    const searchResponse = await elastic.searchDocument(boolQuery, size);

    const highlights = searchResponse.hits.hits
        .flatMap(hit => hit.highlight.content || []);

    return highlights;
}

module.exports = searchRelevantText