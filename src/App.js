import "instantsearch.css/themes/algolia-min.css";
import React from "react";
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  Highlight
} from "react-instantsearch-dom";
import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const searchClient = instantMeiliSearch(
  "http://137.184.44.57",
  ""
);


const App = () => (
  <div className="ais-InstantSearch">
    <div className="title-container">
      <h1>CVE Search</h1>
      </div>
    
    <InstantSearch indexName="cve" searchClient={searchClient}>
      <div className="title-container">
        <Stats />
      </div>
      
      <SearchBox />
      <InfiniteHits hitComponent={Hit} />
    </InstantSearch>
  </div>
);

const Hit = ({ hit }) => {
  const metadata = JSON.parse(hit.metadata.text);
  const pocLinks = metadata.poc.split(',').map((link) => link.trim());

  return (
    <article key={hit.id} className="hit-card">
            <h2 className="hit-name">
        <Highlight attribute="id" hit={hit} />
      </h2>
      <p className="hit-description">
        <strong>Description:</strong> {metadata.description}
      </p>
      <p className="hit-product">
        <strong>Product:</strong> {metadata.product}
      </p>
      <p className="hit-version">
        <strong>Version:</strong> {metadata.version}
      </p>
      <p className="hit-vulnerability">
        <strong>Vulnerability:</strong> {metadata.vulnerability}
      </p>
      <div className="hit-poc">
        <strong>Proof of Concept:</strong>
        <ul>
          {pocLinks.map((link, index) => (
            <li key={index}>
              <a href={link}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
export default App;