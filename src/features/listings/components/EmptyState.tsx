import React from "react";
import Link from "next/link";
import "./emptyState.scss";

interface Props {
  location?: string;
  type?: string;
}

export default function EmptyState({ location, type }: Props) {
  const parts: string[] = [];
  if (type) parts.push(type);
  if (location) parts.push(location);
  const description = parts.length > 0 ? parts.join(" in ") : "your search";

  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <i className="bi bi-search" />
      </div>
      <h2 className="empty-state__title">No exact matches</h2>
      <p className="empty-state__desc">
        We couldn&apos;t find any properties for <strong>{description}</strong>.
        <br />
        Try adjusting your filters or exploring other options.
      </p>
      <div className="empty-state__actions">
        <Link href="/" className="empty-state__btn empty-state__btn--primary">
          Clear all filters
        </Link>
        {type && location && (
          <Link
            href={`/?type=${encodeURIComponent(type)}`}
            className="empty-state__btn empty-state__btn--secondary"
          >
            Remove location
          </Link>
        )}
      </div>
    </div>
  );
}
