import { gql } from 'graphql-request';

// --- 1. FOR THE ARCHIVE GRID (Articles.tsx) ---
export const GET_ARCHIVE = gql`
  query GetArchive {
    # Fetch Categories for the Filter Bar
    categories {
      id
      name
      slug
      color
    }

    # Fetch Posts for the Grid
    posts(orderBy: releaseDate_DESC, first: 100) {
      id
      title
      slug
      releaseDate
      coverImage {
        url
      }
      categories {
        name
        slug
        color
      }
      content {
        text # We fetch Text to calculate reading time & preview
      }
    }
  }
`;

// --- 2. FOR THE SINGLE ARTICLE READER (ArticleView.tsx) ---
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      releaseDate
      coverImage {
        url
      }
      categories {
        name
        slug
        color
      }
      content {
        raw # Required for the Rich Text Renderer
        text # Used for reading time calculation
        
        # ⚠️ CRITICAL UPDATE: Fetch Embedded Models (Dividers & Images)
        references {
          ... on Divider {
            id
          }
          ... on Asset {
            id
            url
            mimeType
          }
        }
      }
      citations {
        sourceName
        publisher
        url
        tier
      }
    }
  }
`;

// --- 3. FOR THE TOOLS / GEAR CHECK (Tools.tsx) ---
export const GET_TOOLS = gql`
  query GetTools {
    tools {
      id
      title
      description
      icon
      file {
        url
        size
        mimeType
      }
      categories {
        color
      }
    }
  }
`;

// --- 4. FOR THE SEARCH INDEX (Fuse.js) ---
export const GET_SEARCH_INDEX = gql`
  query GetSearchIndex {
    posts(first: 100) {
      id
      title
      slug
      categories {
        name
      }
      content {
        text
      }
    }
  }
`;