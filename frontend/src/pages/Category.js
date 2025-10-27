import React from "react";
// import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(documentId: $documentId) {
      name
      documentId
      review {
        title
        body
        rating
        documentId
        categories {
          name
          documentId
        }
      }
    }
  }
`;

export default function Category() {
  const { documentId } = useParams();

  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { documentId: documentId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div>
      <h2>{data.category.name}</h2>

      {data.category.reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map(c => (
            <small key={c.documentId}>{c.name}</small>
          ))} 
 
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
