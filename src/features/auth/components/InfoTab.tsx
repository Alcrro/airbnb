import React from "react";

interface Props {
  name: string;
  email: string;
  image: string | null;
  createdAt: string | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function InfoTab({ name, email, createdAt }: Props) {
  return (
    <div className="profile-info-tab">
      <h3 className="profile-info-tab__section-title">Personal information</h3>
      <div className="profile-info-tab__fields">
        <div className="profile-info-tab__field">
          <span className="profile-info-tab__label">Full name</span>
          <span className="profile-info-tab__value">{name}</span>
        </div>
        <div className="profile-info-tab__field">
          <span className="profile-info-tab__label">Email address</span>
          <span className="profile-info-tab__value">{email}</span>
        </div>
        <div className="profile-info-tab__field">
          <span className="profile-info-tab__label">Member since</span>
          <span className="profile-info-tab__value">{formatDate(createdAt)}</span>
        </div>
      </div>

      <h3 className="profile-info-tab__section-title">Verifications</h3>
      <div className="profile-info-tab__verifications">
        <div className="profile-info-tab__verify-item profile-info-tab__verify-item--ok">
          <i className="bi bi-patch-check-fill" />
          Email address confirmed
        </div>
      </div>
    </div>
  );
}
