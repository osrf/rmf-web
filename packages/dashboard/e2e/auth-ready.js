const http = require('http');
const { execSync } = require('child_process');
/**
 * Waits for the authentication server to be ready.
 * @param timeout Max amount of time (in milliseconds) to wait for
 */
async function authReady(timeout = 30000) {
  console.log('........ auth Ready ..................');
  return new Promise((res) => {
    let req;
    const timer = setTimeout(() => {
      req && req.abort();
      clearTimeout(timer);
      clearTimeout(retryTimer);
      res(false);
    }, timeout);
    let retryTimer;
    const waitAuthReady = () => {
      let container = execSync('docker ps -q --filter ancestor=romi-dashboard/auth').toString();
      let authIpAddress;
      let githubIpAddress;
      console.log(
        '========================== waiting waiting waiting ----- waiting ==========================',
      );

      if (container) {
        console.log('Successuflly created auth container ----------------------- ' + container);

        process.env.CONTAINER = container;

        let isConnected = execSync(
          'docker ps -q --filter network=$NETWORK --filter ancestor=romi-dashboard/auth',
        ).toString();

        githubIpAddress = execSync(
          "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $OTHERCONTAINER",
        );
        console.log(githubIpAddress);
        process.env.GITHUB_IP_ADDRESS = githubIpAddress;

        authIpAddress = execSync(
          "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER",
        ).toString();
        console.log('auth ip address >>>>>>> ' + authIpAddress);

        if (!isConnected) {
          console.log('I am inside isConnected!!! >>>>> ' + isConnected);

          execSync('docker network connect $NETWORK $CONTAINER', {
            stdio: 'inherit',
          });

          execSync('docker network disconnect romidashboarde2e_default $CONTAINER', {
            stdio: 'inherit',
          });
        }

        console.log('=========================== END =============================');
      } else {
        console.log('again ------------------------------------');
        console.log('=========================== END =============================');
      }

      req = http.request(`http://${authIpAddress ? authIpAddress : 'localhost'}:8080/auth/`, () => {
        console.log(
          '-------------------------------- connecting success ------------------------------',
        );
        clearTimeout(timer);
        clearTimeout(retryTimer);
        res(true);
      });
      req.once('error', (err) => {
        console.log(err);
        retryTimer = setTimeout(waitAuthReady, 1000);
      });
      req.end();
    };
    waitAuthReady();
  });
}

authReady();
