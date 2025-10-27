import React from "react";
// import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query GetReview($documentId: ID!) {
    review(documentId: $documentId) {
      title
      body
      rating
      documentId
    }
  }
`;

export default function ReviewDetails() {
  const { documentId } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { documentId: documentId },
  });

  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews/" + documentId
  // );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="review-card">
      <div className="rating">{data.review.rating}</div>
      <h2>{data.review.title}</h2>
      <p>
        {data.review.body
          .map((block) => block.children.map((child) => child.text).join(" "))
          .join("\n\n")}
      </p>
    </div>
  );
}
