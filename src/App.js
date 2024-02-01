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


const { searchClient, setMeiliSearchParams } = instantMeiliSearch(
  'https://cve.teecybervault.com/', // Host
  '531c533fe69dd6af154008aa1d62a1f19df34233c21bbff168a26a130e6dab16', // API key
  {
    placeholderSearch: true, // default: true.
    primaryKey: 'id', // default: undefined
    // ...
  },
  {
    setMeiliSearchParams: {
      hybrid: {
        "semanticRatio": 0.7,
        "embedder": "default"
      }, 
    },
  },
)
setMeiliSearchParams({
  hybrid: {
    "semanticRatio": 0.6,
    "embedder": "default"
  }
})


const App = () => (
  <div className="ais-InstantSearch">
    <div className="title-container">
      <h1>CVE Search</h1>
      </div>
    
    <InstantSearch indexName="cve" searchClient={searchClient}>
      <div className="title-container">
        <Stats />
      </div>
      
      <SearchBox autoFocus />
      <InfiniteHits hitComponent={Hit} />
    </InstantSearch>
  </div>
);

const Hit = ({ hit }) => {
  return (
    <article key={hit.id} className="hit-card">
      <h2 className="hit-name">
        <Highlight attribute="id" hit={hit} />
      </h2>
      <p className="hit-product">
        <strong>Product:</strong> {hit.product}
      </p>
      <p className="hit-description">
        <strong>Description:</strong> {hit.description}
      </p>
      <p className="hit-version">
        <strong>Version:</strong> {hit.version}
      </p>
      <p className="hit-vulnerability">
        <strong>Vulnerability:</strong> {hit.vulnerability}
      </p>
      <div className="hit-poc">
        <strong>Proof of Concept:</strong>
        <ul>
          {hit.poc.reference.map((link, index) => (
            <li key={`reference-${index}`}>
              {link.startsWith('http') ? <a href={link}>{link}</a> : link}
            </li>
          ))}
        </ul>
      </div>
      <div className="hit-github">
        <strong>GitHub:</strong>
        <ul>
          {hit.poc.github.map((link, index) => (
            <li key={`github-${index}`}>
              {link.startsWith('http') ? <a href={link}>{link}</a> : link}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
export default App;