import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results || data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4 text-primary">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr><td colSpan="4" className="text-center">No activities found.</td></tr>
            ) : (
              activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{activity.name || '-'}</td>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.details || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
