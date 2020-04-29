const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const { Search, AllSubstringsIndexStrategy } = require("js-search");

const initSearchEngine = () => {
  const searchEngine = new Search("alpha3Code");
  searchEngine.indexStrategy = new AllSubstringsIndexStrategy();
  searchEngine.addIndex("name");
  searchEngine.addIndex("altSpellings");
  searchEngine.addIndex("alpha2Code");
  searchEngine.addIndex("alpha3Code");
  searchEngine.addIndex("demonym");
  searchEngine.addIndex("translations");
  searchEngine.addIndex("currencies");
  searchEngine.addIndex("capital");
  searchEngine.addIndex("callingCodes");
  searchEngine.addIndex("topLevelDomain");
  searchEngine.addIndex("regionalBlocs");
  searchEngine.addIndex("region");
  return searchEngine;
};

const prefetch = async () => {
  try {
    const data = await fetch("https://restcountries.eu/rest/v2/name/india");
    const json = await data.json();
    const searchEngine = initSearchEngine();
    searchEngine.addDocuments(json);
    return searchEngine;
  } catch (e) {
    console.error(e);
    return process.exit(1);
  }
};

prefetch().then(searchEngine => {
  router.get("/", function(req, res, next) {
    const queryName = req.query.q;
    res.json(searchEngine.search(queryName));
  });
});

module.exports = router;
