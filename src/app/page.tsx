import { CardExperience } from "@/components/layout/CardExperience";
import {
  Card01Welcome,
  Card02MeetNina,
  Card03Services,
  Card04Experience,
  Card05Portfolio,
  Card06Stories,
  Card07Contact,
} from "@/components/cards";

export default function Home() {
  return (
    <CardExperience>
      <Card01Welcome />
      <Card02MeetNina />
      <Card03Services />
      <Card04Experience />
      <Card05Portfolio />
      <Card06Stories />
      <Card07Contact />
    </CardExperience>
  );
}
