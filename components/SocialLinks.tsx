import { company } from "@/lib/site";
import { SocialIcon } from "./icons";

/** Round icon links to Inyange's social accounts. The visible mark is decorative; aria-label names the network. */
export function SocialLinks() {
  return (
    <ul className="social-list">
      {company.social.map((s) => (
        <li key={s.href}>
          <a className="social" href={s.href} aria-label={`Inyange on ${s.label}`} title={s.label}>
            <SocialIcon network={s.network} />
          </a>
        </li>
      ))}
    </ul>
  );
}
