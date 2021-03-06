import React from 'react';
import AllCharts from '../components/AllCharts';
import CompareTrendsForm from './CompareTrendsFormContainer';
import './filter.css';

const CompareTrends = props => (
  <div style={{ display: 'flex' }}>
    <CompareTrendsForm />
    <div style={{ width: '85%' }}>
      {props.title &&
        <h3 className="app-filterTitle">
          Citations for {' '}
          <span className="app-filterTitleSpecial">
            {props.title.conferences
              .filter(([conf, year]) => conf.trim() !== '' && year.trim() !== '')
              .map(([venue, year]) => `${venue} (${year})`).join(', ')}
          </span> from year <span className="app-filterTitleSpecial">{props.title.startYear}</span> to
          year <span className="app-filterTitleSpecial">{props.title.endYear}</span>
          {props.title.filterConference &&
          <span> for papers cited from <span className="app-filterTitleSpecial">{props.title.filterConference.label}</span></span>
          }
        </h3>
      }
      <AllCharts data={props.data} chart={props.chart} />
    </div>
  </div>
);

export default CompareTrends;
