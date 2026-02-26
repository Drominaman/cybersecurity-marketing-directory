import Link from "next/link";
import { Listing } from "@/types/listing";
import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface FeaturedListingProps {
  listing: Listing;
}

export default function FeaturedListing({ listing }: FeaturedListingProps) {
  return (
    <Card
      variant="elevated"
      padding="lg"
      className="border-primary/30 bg-gradient-to-br from-card to-muted/30 mb-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <Badge variant="success" className="mb-3">
            Editor&apos;s Choice
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {listing.name}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {listing.location && (
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {listing.location}
              </span>
            )}
            {listing.yearFounded && <span>Est. {listing.yearFounded}</span>}
            {listing.teamSize && (
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {listing.teamSize}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        {siteConfig.features.ratings && listing.rating && (
          <div className="flex-shrink-0 text-center bg-primary/10 rounded-lg px-4 py-3">
            <div className="text-3xl font-bold text-primary">
              {listing.rating}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Rating
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-foreground mb-6 border-l-4 border-primary pl-4">
        {listing.description}
      </p>

      {/* Services and Specialties */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
            Services
          </h3>
          <div className="flex flex-wrap gap-2">
            {listing.services.map((service) => (
              <Badge key={service} variant="secondary" size="sm">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {listing.specialties && listing.specialties.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {listing.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline" size="sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Case Studies */}
      {siteConfig.features.caseStudies &&
        listing.caseStudies &&
        listing.caseStudies.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Success Stories
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {listing.caseStudies.map((caseStudy, index) => (
                <div
                  key={index}
                  className="bg-muted/50 rounded-lg p-4 border border-border"
                >
                  <div className="font-medium text-foreground mb-1">
                    {caseStudy.client}
                  </div>
                  <div className="text-sm text-accent font-semibold mb-2">
                    {caseStudy.results}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {caseStudy.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          href={listing.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" size="lg">
            Visit Website
          </Button>
        </Link>

        <Link href={`/${siteConfig.listing.routePath}/${listing.id}`}>
          <Button variant="outline" size="lg">
            View Full Profile
          </Button>
        </Link>

        {listing.minBudget && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Starting at:</span>{" "}
            <span className="text-foreground font-semibold">
              {listing.minBudget}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
