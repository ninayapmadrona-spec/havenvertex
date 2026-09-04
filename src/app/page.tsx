import { CardExperience } from "@/components/layout/CardExperience";
import {
  Card01Welcome,
  Card02MeetNina,
  Card03Services,
  Card04Experience,
  Card05Clients,
  Card06Portfolio,
  Card07Stories,
  Card08Contact,
} from "@/components/cards";

export default function Home() {
  return (
    <CardExperience>
      <Card01Welcome />
      <Card02MeetNina />
      <Card03Services />
      <Card04Experience />
      <Card05Clients />
      <Card06Portfolio />
      <Card07Stories />
      <Card08Contact />
    </CardExperience>
  );
}
