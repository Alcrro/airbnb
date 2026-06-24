export interface RoomImages {
  thumbnail_url?: string;
  medium_url?: string;
  picture_url?: string;
  xl_picture_url?: string;
}

export interface RoomReviewScores {
  review_scores_accuracy?: number;
  review_scores_cleanliness?: number;
  review_scores_checkin?: number;
  review_scores_communication?: number;
  review_scores_location?: number;
  review_scores_value?: number;
  review_scores_rating?: number;
}

export interface RoomReview {
  _id: string;
  date?: string;
  reviewer_name?: string;
  comments?: string;
}

export interface Room {
  _id: string;
  name: string;
  listing_url?: string;
  summary?: string;
  space?: string;
  description?: string;
  neighborhood_overview?: string;
  notes?: string;
  transit?: string;
  access?: string;
  interaction?: string;
  house_rules?: string;
  property_type?: string;
  room_type?: string;
  bed_type?: string;
  minimum_nights?: string;
  maximum_nights?: string;
  cancellation_policy?: string;
  first_review?: string;
  last_review?: string;
  accommodates?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: { $numberDecimal: string } | number;
  number_of_reviews?: number;
  amenities?: string[];
  price: { $numberDecimal: string } | number;
  security_deposit?: { $numberDecimal: string };
  cleaning_fee?: { $numberDecimal: string };
  extra_people?: { $numberDecimal: string };
  guests_included?: { $numberDecimal: string };
  images: string | RoomImages | null;
  host_name: string;
  country: string;
  host?: {
    host_id?: string;
    host_name?: string;
    host_about?: string;
    host_location?: string;
    host_thumbnail_url?: string;
    host_picture_url?: string;
    host_neighbourhood?: string;
    host_response_time?: string;
    host_response_rate?: number;
    host_is_superhost?: boolean;
    host_has_profile_pic?: boolean;
    host_identity_verified?: boolean;
    host_listings_count?: number;
    host_verifications?: string[];
  };
  address?: {
    street?: string;
    suburb?: string;
    government_area?: string;
    market?: string;
    country?: string;
    country_code?: string;
  };
  availability?: {
    availability_30?: number;
    availability_60?: number;
    availability_90?: number;
    availability_365?: number;
  };
  review_scores?: RoomReviewScores;
  review_scores_rating?: number;
  reviews?: RoomReview[];
}
