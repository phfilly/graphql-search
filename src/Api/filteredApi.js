import { gql } from 'apollo-boost';

const GET_FILTERED_SEARCH_RESULTS = gql`
  query getSearchResults($filter: String!, $category: SearchEntity!) {
    search(query: $filter, first: 5, entities: [$category]) {
      edges {
        node {
          displayLabel
          imageUrl,
          href
        }
      }
    }
  }
`;

export default GET_FILTERED_SEARCH_RESULTS;