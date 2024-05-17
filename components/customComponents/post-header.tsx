import CoverImage from "./cover-image"
import { PostTitle } from "./post-title"

type Props = {
  title: string
  coverImage: string
}

export function PostHeader({ title, coverImage }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  )
}
