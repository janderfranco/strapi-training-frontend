import React from "react";
// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      documentId
      rating
      body
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS);
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews"
  // );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div>
      {data.reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          <small>console list</small>

          <p>
            {review.body
              .map((block) =>
                block.children.map((child) => child.text).join(" ")
              )
              .join("\n\n")}
          </p>

          <Link to={`/api/details/${review.documentId}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}
