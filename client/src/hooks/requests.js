const API_URL = 'v1';

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response  = await fetch(`${API_URL}/launches`);
  const fetchedLAunches = await response.json();
  return fetchedLAunches.sort((launch1, launch2) => launch1.flightNumber - launch2.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(launch)
    })
    
  } catch (error) {
    return {ok: false};
  }
 
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete'
    })
  } catch (error) {
      console.log('error', error)
      return {
        ok: false
      }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};