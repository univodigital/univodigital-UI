import { MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { FOOTER_NAV, SOCIAL_LINKS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

type IconProps = SVGProps<SVGSVGElement>;

function LinkedInIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socialIconMap: Record<SocialLink["icon"], ComponentType<IconProps>> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  twitter: LinkedInIcon,
  facebook: LinkedInIcon,
  youtube: LinkedInIcon,
  github: LinkedInIcon,
};

type FooterProps = {
  className?: string;
};

/**
 * Site footer — logo, navigation, services, contact, social, CTA, copyright.
 */
export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();
  const companyLinks =
    FOOTER_NAV.find((column) => column.title === "Company")?.links ?? [];
  const serviceLinks =
    FOOTER_NAV.find((column) => column.title === "Services")?.links ?? [];

  const hasAddress = Boolean(
    SITE.address.line1 || SITE.address.city || SITE.address.region,
  );

  return (
    <footer
      className={cn(
        "mt-auto border-t border-border bg-surface text-text-primary",
        className,
      )}
    >
      <div className="border-b border-border">
        <Container
          size="max"
          className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12"
        >
          <div className="max-w-xl space-y-2">
            <h2 className="font-heading text-h4 text-text-primary">
              Ready to grow your brand?
            </h2>
            <p className="text-body text-text-secondary">
              Tell us about your project. We&apos;ll help you move from idea to
              impact.
            </p>
          </div>
          <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
            <Link href={ROUTES.contact}>Get a consultation</Link>
          </Button>
        </Container>
      </div>

      <Container size="max" className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href={ROUTES.home}
              className="inline-block text-base font-semibold tracking-tight text-text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label={`${SITE.name} home`}
            >
              {SITE.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-text-secondary">
              {SITE.tagline}
            </p>

            <ul
              className="mt-6 flex items-center gap-2"
              aria-label="Social media"
            >
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIconMap[social.icon] ?? LinkedInIcon;
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (opens in a new tab)`}
                      className="inline-flex size-10 items-center justify-center rounded-md text-text-secondary outline-none transition-colors hover:bg-muted hover:text-text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-labelledby="footer-nav-heading" className="lg:col-span-2">
            <h3
              id="footer-nav-heading"
              className="text-caption font-semibold tracking-wide text-text-primary uppercase"
            >
              Navigation
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <FooterLink href={ROUTES.home}>Home</FooterLink>
              </li>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-labelledby="footer-services-heading"
            className="lg:col-span-3"
          >
            <h3
              id="footer-services-heading"
              className="text-caption font-semibold tracking-wide text-text-primary uppercase"
            >
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <FooterLink href={ROUTES.services.root}>All services</FooterLink>
              </li>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3
              id="footer-contact-heading"
              className="text-caption font-semibold tracking-wide text-text-primary uppercase"
            >
              Contact
            </h3>
            <ul
              className="mt-4 flex flex-col gap-3"
              aria-labelledby="footer-contact-heading"
            >
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-start gap-2.5 text-sm text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <MailIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-start gap-2.5 text-sm text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <PhoneIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{SITE.phone}</span>
                </a>
              </li>
              {hasAddress ? (
                <li className="text-sm text-text-secondary">
                  <address className="not-italic">
                    {SITE.address.line1 ? (
                      <span>{SITE.address.line1}</span>
                    ) : null}
                    {(SITE.address.city || SITE.address.region) && (
                      <span className="mt-1 block">
                        {[SITE.address.city, SITE.address.region]
                          .filter(Boolean)
                          .join(", ")}
                        {SITE.address.postalCode
                          ? ` ${SITE.address.postalCode}`
                          : ""}
                      </span>
                    )}
                  </address>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container
          size="max"
          className="flex flex-col gap-3 py-6 text-caption text-text-secondary sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="sm:text-right">{SITE.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const classes =
    "rounded-sm text-sm text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-3 focus-visible:ring-ring/50";

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
