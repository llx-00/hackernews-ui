import { TypeItems } from '~/type'
import { classNames, getDomainHost } from '~/utils'

export default function StoriesItem(props: {
  data: TypeItems | null
  index: number
}) {
  const { data, index } = props

  const Item = (props: {
    children?: string | null | JSX.Element | JSX.Element[]
  }) => {
    const { children } = props

    return (
      <div
        className={classNames(
          'p-2  hover:bg-gray-300 min-h-10 flex',
          index % 2 === 1 ? 'bg-gray-100' : 'bg-gray-200'
        )}
      >
        {children}
      </div>
    )
  }

  if (data === null) return <Item />

  const itemUrl = `https://news.ycombinator.com/item?id=${data.id}`
  const url = data.url || itemUrl
  const host = data.url ? getDomainHost(data.url) : null
  const date = new Date(data.time * 1000).toLocaleString()

  function SplitSymbol() {
    return null
    return <span className="op50 select-none">|</span>
  }

  return (
    <Item>
      <div className="w-8 mr-2 op75 select-none pointer-events-none text-right">
        {index}.
      </div>

      <div className="flex-1">
        {/* title */}
        <p className="m0">
          <a
            className="font-600"
            target="_blank"
            href={url}
          >
            <span dangerouslySetInnerHTML={{ __html: data.title || '' }} />
          </a>
        </p>

        {/* info */}
        <p className="text-xs flex gap-2 m-0 mt-1">
          {host && (
            <>
              <a
                className="color-blue-400"
                target="_blank"
                href={`https://news.ycombinator.com/from?site=${host}`}
              >
                {host}
              </a>
              <SplitSymbol />
            </>
          )}

          <a
            className=""
            target="_blank"
            href={itemUrl}
          >
            {data.score || 0} points
          </a>

          <SplitSymbol />

          <a
            className=""
            target="_blank"
            href={itemUrl}
          >
            {data.descendants || 0} comments
          </a>
          <SplitSymbol />

          <a
            className=""
            target="_blank"
            href={`https://news.ycombinator.com/user?id=${data.by}`}
          >
            by: {data.by}
          </a>
          <SplitSymbol />

          <a
            className=""
            target="_blank"
            href={itemUrl}
          >
            {date}
          </a>
        </p>
      </div>
    </Item>
  )
}
