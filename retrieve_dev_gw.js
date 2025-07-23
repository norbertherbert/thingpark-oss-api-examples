const platform_hostname = 'community.thingpark.io';
const client_id = 'sub-XXXXXXXXX/YYY';
const client_secret = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

/**
 * Fetches an OAuth2 token using client credentials.
 */
async function getToken() {
  const tokenResponse = await fetch(`https://${platform_hostname}/users-auth/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id,
      client_secret,
      grant_type: 'client_credentials'
    })
  });

  if (!tokenResponse.ok) {
    throw new Error(`Token request failed with status ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * Fetches devices and parses the response as JSON.
 */
async function fetchDevices() {
  const accessToken = await getToken();

  const devicesResponse = await fetch(`https://${platform_hostname}/thingpark/wireless/rest/subscriptions/mine/devices`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  if (!devicesResponse.ok) {
    throw new Error(`Device request failed with status ${devicesResponse.status}`);
  }

  const devices = await devicesResponse.json();
  return devices;
}

/**
 * Fetches gateways and parses the response as JSON.
 */
async function fetchGateways() {
  const accessToken = await getToken();

  const response = await fetch(`https://${platform_hostname}/thingpark/wireless/rest/partners/mine/bss`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Gateway request failed with status ${response.status}`);
  }

  const gateways = await response.json();
  return gateways; 
}

/**
 * Main runner
 */
async function run() {
  try {


    const devices = await fetchDevices();
    console.log('------------------- DEVICES -------------------');
    console.log('Devices:', devices);


    const gateways = await fetchGateways();
    console.log('------------------ GATEWAYS -------------------');
    console.log('Gateways:', gateways);


  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute
run();

