const COURSE_GRAPHQL_FIELDS = `
    sys {
        id
    }
    title
    body {
        json
    }
    slug
    startDate
    endDate
    instructorsCollection {
        items {
            sys {
                id
            }
            name
        }
    }
`

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags: ['articles'] },
    }
  ).then((response) => response.json())
}

interface Sys {
  id: string
}

interface Avatar {
  url: string
}

interface Instructor {
  name: string
  avatar: Avatar
}

interface Course {
  sys: Sys
  title: string
  slug: string
  startDate: string
  body: {
    json: Document
  }
  endDate: string
  instructors: Instructor[]
}

interface CourseCollection {
  items: Course[]
}

interface FetchResponse {
  data: {
    courseCollection: CourseCollection
  }
}

function extractCourseEntries(fetchResponse: FetchResponse): Course[] {
  return fetchResponse?.data?.courseCollection?.items
}

export async function getAllCourses(
  // For this demo set the default limit to always return 3 articles.
  limit = 3,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const courses = await fetchGraphQL(
    `query {
        courseCollection(where:{slug_exists: true}, order: startDate_DESC, limit: ${limit}, preview: ${
          isDraftMode ? 'true' : 'false'
        }) {
          items {
            ${COURSE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  )
  return extractCourseEntries(courses)
}

export async function getCourse(slug: string, isDraftMode = false) {
  const course = await fetchGraphQL(
    `query {
        courseCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
          isDraftMode ? 'true' : 'false'
        }) {
          items {
            ${COURSE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  )
  return extractCourseEntries(course)[0]
}
