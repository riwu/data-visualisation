import React from 'react';
import { FormControl, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

const MultiTable = props => (
  <table>
    <thead>
      <tr>
        <td>Conference</td>
        <td>Year</td>
      </tr>
    </thead>
    <tbody>
      {props.compareTrends.conferences.map(([conf, year], index) => (
        <tr key={index}>
          <td>
            <FormControl
              value={conf}
              onChange={e => props.setTrendRowValue(0, index, e.target.value)}
              autoComplete="on"
              placeholder="Enter a venue"
            />
          </td>
          <td>
            <FormControl
              type="number"
              value={year}
              min={1}
              max={9999}
              onChange={e => props.setTrendRowValue(1, index, e.target.value)}
            />
          </td>
          {(index > 0) && (index < props.compareTrends.conferences.length - 1) &&
            <td>
              <OverlayTrigger
                overlay={<Tooltip id="Remove row">Click to remove row</Tooltip>}
              >
                <Glyphicon
                  style={{ cursor: 'pointer', color: 'red' }}
                  glyph="minus-sign"
                  onClick={() => props.removeTrendRow(index)}
                />
              </OverlayTrigger>
            </td>
          }
        </tr>
      ))}
    </tbody>
  </table>
);

export default MultiTable;
