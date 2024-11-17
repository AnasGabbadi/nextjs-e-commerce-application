const { gql } = require("@apollo/client");
const { default: client } = require("client");

const handler = async (req, res) => {
    try {
        const filters = JSON.parse(req.body);
        const { category, page, minPrice, maxPrice, neuf, occasion } = filters;

        let occasionFilter = ``;
        let neufFilter = ``;
        let minPriceFilter = ``;
        let maxPriceFilter = ``;
        let categoryFilter = `
        {
            key: "categorie", 
            compare: EQUAL_TO, 
            value: "${category}"
        },
        `;

        if (occasion) {
            occasionFilter = `
            {
                key: "occasion", 
                compare: EQUAL_TO, 
                value: "1"
            },
            `;
        }
        if (neuf) {
            neufFilter = `
            {
                key: "neuf", 
                compare: EQUAL_TO, 
                value: "1"
            },
            `;
        }
        if (minPrice) {
            minPriceFilter = `
            {
                key: "prix", 
                compare: GREATER_THAN_OR_EQUAL_TO, 
                value: "${minPrice}"
                type: NUMERIC
            },
            `;
        }
        if (maxPrice) {
            maxPriceFilter = `
            {
                key: "prix", 
                compare: LESS_THAN_OR_EQUAL_TO, 
                value: "${maxPrice}"
                type: NUMERIC
            },
            `;
        }

        const { data } = await client.query({
            query: gql`
            query AllPropertiesQuery {
                properties(where: {
                    offsetPagination: {
                        size: 9, 
                        offset: ${(page - 1) * 9}
                    }
                    metaQuery: {
                        relation: AND, 
                        metaArray: [
                            ${categoryFilter}
                            ${neufFilter}
                            ${occasionFilter}
                            ${minPriceFilter}
                            ${maxPriceFilter}
                        ]
                    }
                }) {
                    pageInfo {
                        offsetPagination {
                            total
                        }
                    }
                    nodes {
                        title
                        uri
                        featuredImage {
                            node {
                                uri
                                sourceUrl
                            }
                        }
                        propertyFeatures {
                            quantite
                            occasion
                            neuf
                            prix
                            categorie
                        }
                    }
                }
            }
            `,
        });

        return res.status(200).json({
            total: data.properties.pageInfo.offsetPagination.total,
            properties: data.properties.nodes,
        });
    } catch (e) {
        console.log("ERROR:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default handler;
