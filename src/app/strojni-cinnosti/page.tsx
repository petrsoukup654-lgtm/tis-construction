import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionPage } from "@/components/DivisionPage";
import { getDivision } from "@/lib/site";

const division = getDivision("strojni-cinnosti");

export const metadata: Metadata = {
  title: "Strojní činnosti",
  description: division?.intro,
};

export default function StrojniCinnostiPage() {
  if (!division) notFound();
  return <DivisionPage division={division} />;
}
