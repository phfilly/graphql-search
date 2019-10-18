import { gql } from 'apollo-boost';

const GET_ALL_SEARCH_RESULTS = gql`
  query getSearchResults($filter: String!) {
    search(query: $filter, first: 5) {
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

export default GET_ALL_SEARCH_RESULTS;