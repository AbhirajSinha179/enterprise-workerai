import markdownToHtml from "@/lib/markdownToHtml";
import { TERMS_OF_USE } from "../_docs";
import markdownStyles from "@/components/blogs/markdown-styles.module.css"

export default async function Page() {
  const content = await markdownToHtml(TERMS_OF_USE);
  return (
    <section className="container">
      <div className="mx-auto max-w-4xl">
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}