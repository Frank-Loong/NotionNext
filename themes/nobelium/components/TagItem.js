import Link from 'next/link'

const TagItem = ({ tag }) => (
  (<Link href={`/tag/${encodeURIComponent(tag)}`}>
    <p className="mr-1 rounded-full px-2 py-1 border leading-none text-sm dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition duration-200">
      {tag}
    </p>
  </Link>)
)

export default TagItem
