import React from "react";
import styles from '../../styles/components/ReviewsSection.module.css';

// Reviews data with proper avatars & genders
const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    gender: "female",
    position: "HR Manager at TechCorp",
    review:
      "Talentphere connected us with exceptional talent. The hiring process was seamless and professional!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Lee",
    gender: "male",
    position: "Project Lead at SoftSolutions",
    review:
      "The platform is amazing! We found skilled developers in no time. Highly recommend Talentphere!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sara Williams",
    gender: "female",
    position: "CEO at InnovateX",
    review:
      "Excellent service and quality candidates. Talentphere is now our go-to talent outsourcing platform.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "David Kim",
    gender: "male",
    position: "CTO at BrightLabs",
    review:
      "We found brilliant engineers through Talentphere. Truly a game-changing platform for outsourcing.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Emily Carter",
    gender: "female",
    position: "Operations Manager at FutureWorks",
    review:
      "Talentphere made our recruitment process so much easier. The candidates we hired exceeded expectations.",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: 6,
    name: "James Anderson",
    gender: "male",
    position: "Managing Director at GlobalTech",
    review:
      "The quality of professionals on Talentphere is unmatched. We saved time and found the right talent quickly.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const ReviewsSection = () => {
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>What Our Clients Say</h2>
        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <img
                src={review.avatar}
                alt={`${review.name} (${review.gender})`}
                className={styles.avatar}
              />
              <p className={styles.reviewText}>"{review.review}"</p>
              <h4 className={styles.clientName}>{review.name}</h4>
              <p className={styles.clientPosition}>{review.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;