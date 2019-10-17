import { gql } from 'apollo-boost';

const GET_SEARCH_RESULTS = gql`
  query getSearchResults($filter: String!, $category: SearchEntity!) {
    search(query: $filter, first: 5, entities: [$category]) {
      edges {
        node {
          displayLabel
          imageUrl
        }
      }
    }
  }
`;

export default GET_SEARCH_RESULTS;
