import markdownToHtml from "@/lib/markdownToHtml"
import { PRIVACY_POLICY } from "../_docs"
import markdownStyles from "@/components/blogs/markdown-styles.module.css"

export default async function Page() {
  const content = await markdownToHtml(PRIVACY_POLICY)
  return (
    <section className="container">
      <div className="mx-auto max-w-4xl">
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  )
}
