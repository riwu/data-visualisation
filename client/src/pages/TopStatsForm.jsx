import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import VenueInput from '../components/VenueInput';
import TitleInput from '../components/TitleInput';
import { conflicts } from '../reducers/topStats';
import './filter.css';


const TopStatsForm = props => (
  <div>
    <Form inline className="app-form">
      <div>
        <FormGroup>
          <ControlLabel className="app-controlLabel">Top</ControlLabel>
          <FormControl
            type="number"
            value={props.topStats.count}
            min={1}
            max={99}
            onChange={e => props.setTopValue('count', e.target.value)}
          />
        </FormGroup>
        <span className="app-dropdown">
          <DropdownButton
            id="Top Type"
            title={props.topStats.aggregator}
          >
            {['Venues', 'Papers', 'Authors', 'Years'].map(aggregator => (
              <MenuItem
                key={aggregator}
                onClick={() => props.setTopValue('aggregator', aggregator)}
                active={props.topStats.aggregator === aggregator}
              >{aggregator}
              </MenuItem>
        ))}
          </DropdownButton>
        </span>
        <span style={{ marginLeft: '10px' }}>by</span>
        <span className="app-dropdown">
          <DropdownButton
            id="Top Type"
            title={props.topStats.metric}
          >
            {['Number of papers', 'Citations made', 'Times cited', 'Number of authors', 'Number of venues']
              .filter(metric => !(conflicts[props.topStats.aggregator] || []).includes(metric))
              .map(metric => (
                <MenuItem
                  key={metric}
                  onClick={() => props.setTopValue('metric', metric)}
                  active={props.topStats.metric === metric}
                >{metric}
                </MenuItem>
          ))}
          </DropdownButton>
        </span>
      </div>
      <FormGroup>
        <DropdownButton
          id="Chart Type"
          title={props.topStats.chart}
        >
          {['Bar Chart', 'Pie Chart', 'Line Chart', 'Area Chart'].map(type => (
            <MenuItem
              key={type}
              onClick={() => props.setTopValue('chart', type)}
              active={props.topStats.chart === type}
            >{type}
            </MenuItem>
        ))}
        </DropdownButton>
      </FormGroup>
      <Button
        bsStyle="primary"
        onClick={() => props.getTopStats(props.topStats)}
      >
        Generate
      </Button>
    </Form>
    <div className="app-topStatFilters">
      <Form inline className="app-form" style={{ alignItems: 'center' }}>
        <h4 style={{ color: '#0084bf' }}>Optional filters</h4>
        {props.topStats.aggregator !== 'Venues' &&
        <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
          <ControlLabel className="app-controlLabel">Venue</ControlLabel>
          <VenueInput
            value={props.topStats.venue}
            onChange={value => props.setTopValue('venue', value)}
            placeholder="Search for a venue"
          />
        </FormGroup>
        }
        {props.topStats.aggregator !== 'Papers' &&
        <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
          <ControlLabel className="app-controlLabel">Paper</ControlLabel>
          <TitleInput
            value={props.topStats.paper}
            onChange={props.setTopValue}
          />
        </FormGroup>
        }
        {props.topStats.aggregator !== 'Authors' &&
        <FormGroup>
          <ControlLabel className="app-controlLabel">Author</ControlLabel>
          <FormControl
            value={props.topStats.author}
            onChange={e => props.setTopValue('author', e.target.value)}
            autoComplete="on"
            placeholder="Enter an author"
          />
        </FormGroup>
        }
      </Form>
    </div>
  </div>
);

export default TopStatsForm;
