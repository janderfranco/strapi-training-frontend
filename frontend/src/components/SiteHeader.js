import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query GetVategories {
    categories {
      name
      documentId
    }
  }
`;

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="site-header">
      <Link to="/">
        <h1>Game Reviews</h1>
      </Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {data.categories.map((category) => (
          <Link key={category.documentId} to={`/category/${category.documentId}`}>
            {category.name}
          </Link>
        ))}
        </nav>
    </div>
  );
}
