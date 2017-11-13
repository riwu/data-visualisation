import axios from 'axios';

axios.defaults.baseURL = 'https://cs3219.ycholocron.com/';
// axios.defaults.baseURL = 'http://localhost:3020/';

const get = (path) => {
  console.log('getting', path);
  return axios.get(path).then(response => response.data);
};

const encodeQueries = arr => arr.reduce((str, [key, value]) =>
  `${str + key}=${encodeURIComponent(value)}&`, '').slice(0, -1); // remove trailing &

const mapToArr = obj => Object.entries(obj).map(([key, value]) =>
  ({ name: key, value: Math.round(value) }));

export default {
  getVenues: () => get('venues').then(venues =>
    venues.map(venue => ({ label: venue, value: venue }))),
  getTitles: () => get('venues').then(venues =>
    venues.map(venue => ({ label: venue, value: venue }))),
  getTrendStats: (params) => {
    const conferences = params.conferences
      .filter(([conf, year]) => conf.trim() !== '' && year.trim() !== '');
    const conferenceQuery = conferences.reduce((arr, [conf, year]) => {
      arr.push(['conference', conf]);
      arr.push(['year', year]);
      return arr;
    }, []);
    const queries = [['start', params.startYear], ['end', params.endYear]];
    const getLabel = (conference, year) => `${conference} (${year})`;
    return get(`compare?${encodeQueries([...conferenceQuery, ...queries])}`).then((data) => {
      const yearMap = data.reduce((obj, fields) => {
        Object.entries(fields.citations).forEach(([year, count]) => {
          const label = getLabel(fields.conference, fields.year);
          obj[year] = { // eslint-disable-line
            ...obj[year],
            [label]: ((obj[year] || {})[label] || 0) + count,
          };
        });
        return obj;
      }, {}); // { [year]: { confLabel: count } }
      console.log('year map', yearMap, conferences);
      return Object.entries(yearMap).reduce((arr, [year, value]) => {
        arr.push({
          name: year,
          ...conferences.reduce((obj, [conf, confYear]) => {
            const label = getLabel(conf, confYear);
            obj[label] = value[label] || 0; // eslint-disable-line
            return obj;
          }, {}),
        });
        return arr;
      }, []); // [ { name: year, confLabel1: count, confLabel2: count, ... }]
    });
  },
  getTopStats: (params) => {
    const aggregator = {
      Authors: 'author',
      Venues: 'venue',
      Papers: 'title',
      Years: 'year',
    }[params.aggregator];

    const metric = {
      'Number of papers': 'numPapers',
      'Citations made': 'numCites',
      'Times cited': 'numCitedBy',
      'Number of authors': 'numAuthors',
      'Number of venues': 'numVenues',
    }[params.metric];

    const filters = [['n', params.count], ['venue', params.venue.label], ['author', params.author], ['title', params.paper]]
      .filter(([key, value]) => value.trim() !== '');
    return get(`top/${aggregator}/${metric}?${encodeQueries(filters)}`).then(data => mapToArr(data));
  },

  getImpactStats: params => get(`year/${params.year}/impact-factor?top=${params.count}`).then(data => mapToArr(data)),
  getCitationWeb: ({ paper, depth }) => get(`paper/${encodeURIComponent(paper.trim())}/web-citation?depth=${depth}`),
};
