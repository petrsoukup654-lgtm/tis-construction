import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionPage } from "@/components/DivisionPage";
import { getDivision } from "@/lib/site";

const division = getDivision("stavebni-cinnosti");

export const metadata: Metadata = {
  title: "Stavební činnosti",
  description: division?.intro,
};

export default function StavebniCinnostiPage() {
  if (!division) notFound();
  return <DivisionPage division={division} />;
}
