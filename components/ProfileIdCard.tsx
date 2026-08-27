"use client";

import "./ProfileIdCard.css";

export function ProfileIdCard() {
  return (
    <div className="profile-id-shell" aria-label="Kristy Kate Taylor profile card">
      <div className="profile-id-card">
        <div className="profile-id-lanyard" aria-hidden="true" />

        <div className="profile-id-photo-wrap">
          <img
            src="/media/kristy-profile.webp"
            alt="Kristy Kate Taylor"
            className="profile-id-photo"
            draggable={false}
          />
        </div>

        <div className="profile-id-content">
          <p className="profile-id-eyebrow">PORTFOLIO ID</p>
          <h3>Kristy Kate Taylor</h3>
          <p className="profile-id-role">Software Developer · UI/UX Designer</p>
          <div className="profile-id-meta">
            <span>React</span>
            <span>Systems</span>
            <span>Design</span>
          </div>
        </div>
      </div>
    </div>
  );
}
