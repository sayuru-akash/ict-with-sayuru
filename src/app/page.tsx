import { HomePage } from "@/components/HomePage";
import { StructuredData } from "@/components/StructuredData";
import { HOME_JSON_LD } from "@/lib/seo";

export default function Page() {
  return (
    <>
      <StructuredData data={HOME_JSON_LD} />
      <HomePage />
    </>
  );
}
