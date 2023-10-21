import React from 'react';
import '../assets/css/CardProfe.css';


function ProfessionalCard({ professional }) {
    return (
      <div className="professional-card">
        <div className="professional-card-details">
          <h3>{`${professional.first_name} ${professional.last_name}`}</h3>
          <p>{professional.about_me}</p>
          <div className="rating">
            {Array.from({ length: professional.specialties.length }).map((_, index) => (
              <span key={index} className="star">★★★★</span>
            ))}
          </div>
        </div>
        <div className="professional-card-image">
          {professional.professional_photo && (
            <img src={professional.professional_photo} alt={professional.first_name} />
          )}
        </div>
      </div>
    );
  }
  
  export default ProfessionalCard;
  
