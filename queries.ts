import { gql } from 'graphql-request';

export const GET_LATEST_POSTS = gql`
  query GetLatestPosts {
    posts(orderBy: releaseDate_DESC, first: 10) {
      id
      title
      slug
      releaseDate
      type    # QuickMagnet, DeepDive, etc.
      tone    # T1, T2, etc.
      
      # 1. THE TOP BUN (Component)
      openingHook {
        ... on SinekHook {
          variant
          beliefStatement
          alienationStatement
          invitationStatement
        }
      }

      # 2. THE MEAT (Rich Text)
      content {
        raw  # Required for the Rich Text Renderer
      }

      # 3. THE BOTTOM BUN (Component)
      theVerdict {
        ... on VerdictBlock {
          emoji
          command
          linkUrl
        }
      }

      # 4. THE REFERENCES
      citations {
        sourceName
        publisher
        year
        tier
        url
      }
    }
  }
`;