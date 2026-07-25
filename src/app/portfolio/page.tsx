import { PageHeader } from "@/components/page-header";
import { PortfolioFilters } from "@/components/portfolio-filters";
import { Container } from "@/components/primitives";
import { getProjects } from "@/lib/queries";
import { getLocale } from "@/lib/i18n-server";
import { pick } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const locale = await getLocale();
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow={pick({ en: "Portfolio", zh: "作品集" }, locale)}
        title={pick({ en: <>Work that feels <span className="display-italic">considered.</span></>, zh: <>講究的<span className="display-italic">作品。</span></> }, locale)}
        intro={pick({
          en: "Filter by room type, budget tier and style to find projects close to your own situation — then request a similar design in a single tap.",
          zh: "按房間、預算及風格篩選，找出與你情況相近的項目——然後一鍵要求類似設計。",
        }, locale)}
      />
      <Container className="py-16 sm:py-20">
        <PortfolioFilters projects={projects} locale={locale} />
      </Container>
    </>
  );
}
