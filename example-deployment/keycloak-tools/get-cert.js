const { request, baseUrl } = require('./utils');

(async () => {
  try {
    // get the jws
    let resp = await request(`${baseUrl}/realms/rmf-web/.well-known/openid-configuration`);
    const jwksUri = resp.body.jwks_uri;
    resp = await request(jwksUri);
    const jwks = resp.body;
    const jws = jwks.keys[0];
    if (!jws) {
      process.exitCode = 1;
      return;
    }
    const x5c = jws.x5c[0];
    const pem = `-----BEGIN CERTIFICATE-----\n${x5c}\n-----END CERTIFICATE-----`;

    console.log(pem);
  } catch (e) {
    process.exitCode = 1;
  }
})();
