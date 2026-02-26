import Link from "next/link";
import { Listing } from "@/types/listing";
import { siteConfig } from "@/config/site.config";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  // Support both single badge and multiple badges
  const badges =
    listing.editorBadges || (listing.editorBadge ? [listing.editorBadge] : []);

  return (
    <Card
      variant="bordered"
      className="hover:shadow-lg hover:border-primary/50 transition-all duration-200"
    >
      {/* Editor Badges */}
      {badges.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {badges.map((badge) => (
            <Badge key={badge} variant="warning" size="sm">
              {badge}
            </Badge>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
            {listing.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {listing.shortDescription}
          </p>
        </div>

        {/* Rating */}
        {siteConfig.features.ratings && listing.rating && (
          <div className="ml-4 flex-shrink-0 text-center">
            <div className="text-xl font-bold text-primary">{listing.rating}</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
        {listing.location && (
          <div className="flex items-center gap-1">
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
            <span>{listing.location}</span>
          </div>
        )}

        {listing.teamSize && (
          <div className="flex items-center gap-1">
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
            <span>{listing.teamSize}</span>
          </div>
        )}
      </div>

      {/* Services */}
      <div className="mb-4">
        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
          Services
        </div>
        <div className="flex flex-wrap gap-1.5">
          {listing.services.slice(0, 4).map((service) => (
            <Badge key={service} variant="secondary" size="sm">
              {service}
            </Badge>
          ))}
          {listing.services.length > 4 && (
            <span className="text-sm text-muted-foreground">
              +{listing.services.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Link href={`/${siteConfig.listing.routePath}/${listing.id}`}>
          <Button variant="outline" size="sm" fullWidth>
            View Details
          </Button>
        </Link>
        <Link
          href={listing.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" size="sm" fullWidth>
            Visit Website
          </Button>
        </Link>
      </div>
    </Card>
  );
}
