import Link from 'next/link'

const TagItem = ({ tag }) => (
  (<Link href={`/tag/${encodeURIComponent(tag)}`}>
    <p className="mr-1 rounded-full px-2 py-1 border leading-none text-sm dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition duration-200">
      {tag}
    </p>
  </Link>)
)

export default TagItem
