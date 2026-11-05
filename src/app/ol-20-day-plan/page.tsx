import { LearningPage } from "@/components/LearningPage";
import { LEARNING_PAGES } from "@/lib/learning-pages";
import { pageMetadata } from "@/lib/seo";

const page = LEARNING_PAGES[2];
export const metadata = pageMetadata(page.title, page.description, page.path);

export default function Page() {
  return <LearningPage page={page} />;
}
