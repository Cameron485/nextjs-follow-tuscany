import { notFound } from 'next/navigation'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getAllCourses, getCourse } from '../../../lib/contentful'
import { Document } from '@contentful/rich-text-types'

export default async function Course({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  console.log()
  console.log(params)
  const { slug } = await params
  const article = await getCourse(slug)
  console.log('poo', article)

  if (!article) {
    notFound()
  }
  return (
    <main>
      {documentToReactComponents(article.body.json as unknown as Document)}
    </main>
  )
}

interface Course {
  slug: string
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const allCourses: Course[] = await getAllCourses()

  return allCourses.map((course: Course) => ({
    slug: course.slug,
  }))
}
