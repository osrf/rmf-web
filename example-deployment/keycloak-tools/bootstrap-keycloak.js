const { baseUrl, getToken, request, tryRequest } = require('./utils');

function authHeaders(token) {
  return { Authorization: `bearer ${token}` };
}

async function setClientScopeToClient(headers, clientId, clientScopeId) {
  // set client with client scope
  await request(
    `${baseUrl}/admin/realms/rmf-web/clients/${clientId}/default-client-scopes/${clientScopeId}`,
    {
      method: 'PUT',
      headers: headers,
    },
  );
}

async function createAudienceClientScope(headers, name, description, audience) {
  // set client with client scope
  return await tryRequest(
    `${baseUrl}/admin/realms/rmf-web/client-scopes`,
    {
      method: 'POST',
      headers: headers,
    },
    {
      name: name,
      protocol: 'openid-connect',
      description: description,
      protocolMappers: [
        {
          config: {
            'access.token.claim': 'true',
            'id.token.claim': 'false',
            'included.client.audience': audience,
          },
          name: 'rmf-audience',
          protocol: 'openid-connect',
          protocolMapper: 'oidc-audience-mapper',
        },
      ],
    },
  );
}

(async () => {
  try {
    const token = await getToken();
    let resp;

    console.log('create rmf-web realm');
    await tryRequest(
      `${baseUrl}/admin/realms/`,
      {
        method: 'POST',
        headers: authHeaders(token),
      },
      {
        realm: 'rmf-web',
        enabled: true,
      },
    );

    console.log('create dashboard client');
    await tryRequest(
      `${baseUrl}/admin/realms/rmf-web/clients`,
      {
        method: 'POST',
        headers: authHeaders(token),
      },
      {
        clientId: 'dashboard',
        rootUrl: 'https://example.com',
        redirectUris: ['https://example.com/*'],
        webOrigins: ['https://example.com'],
        publicClient: true,
        directAccessGrantsEnabled: true,
      },
    );

    console.log('get dashboard keycloak client id');
    resp = await request(`${baseUrl}/admin/realms/rmf-web/clients?clientId=dashboard`, {
      method: 'GET',
      headers: authHeaders(token),
    });
    let dashboardKCId = resp.body[0].id;

    const keycloakRoleIdMap = {};

    console.log('create rmf roles');
    const roles = ['_rmf_superadmin', '_rmf_task_submit', '_rmf_task_cancel', '_rmf_task_admin'];
    for (const role of roles) {
      console.log(`create ${role} role`);
      await tryRequest(
        `${baseUrl}/admin/realms/rmf-web/clients/${dashboardKCId}/roles`,
        {
          method: 'POST',
          headers: authHeaders(token),
        },
        {
          name: role,
        },
      );
      resp = await request(
        `${baseUrl}/admin/realms/rmf-web/clients/${dashboardKCId}/roles/${role}`,
        {
          method: 'GET',
          headers: authHeaders(token),
        },
      );
      keycloakRoleIdMap[role] = resp.body.id;
    }

    console.log('create exmaple roles/groups');
    const groups = ['rmf_group_1', 'rmf_group_2'];
    for (const group of groups) {
      console.log(`create ${group} role`);
      await tryRequest(
        `${baseUrl}/admin/realms/rmf-web/clients/${dashboardKCId}/roles`,
        {
          method: 'POST',
          headers: authHeaders(token),
        },
        {
          name: group,
        },
      );
      resp = await request(
        `${baseUrl}/admin/realms/rmf-web/clients/${dashboardKCId}/roles/${group}`,
        {
          method: 'GET',
          headers: authHeaders(token),
        },
      );
      keycloakRoleIdMap[group] = resp.body.id;
    }

    console.log('create reporting server client');
    await tryRequest(
      `${baseUrl}/admin/realms/rmf-web/clients`,
      {
        method: 'POST',
        headers: authHeaders(token),
      },
      {
        clientId: 'reporting',
        rootUrl: 'https://example.com',
        redirectUris: ['https://example.com/*'],
        webOrigins: ['https://example.com'],
        publicClient: true,
        directAccessGrantsEnabled: true,
      },
    );

    console.log('create example users');
    const users = [
      { username: 'admin', roles: ['_rmf_superadmin'] },
      { username: 'example1', roles: ['rmf_group_1', '_rmf_task_submit', '_rmf_task_cancel'] },
      { username: 'example2', roles: ['rmf_group_2', '_rmf_task_submit', '_rmf_task_cancel'] },
      { username: 'example3', roles: ['rmf_group_1'] },
    ];
    for (const user of users) {
      console.log(`create user ${user.username}`);
      await tryRequest(
        `${baseUrl}/admin/realms/rmf-web/users`,
        {
          method: 'POST',
          headers: authHeaders(token),
        },
        {
          username: user.username,
          enabled: true,
        },
      );

      // get the newly created user
      resp = await request(`${baseUrl}/admin/realms/rmf-web/users?username=${user.username}`, {
        method: 'GET',
        headers: authHeaders(token),
      });
      const keycloakUser = resp.body[0];

      console.log(`add roles ${user.roles} to user ${user.username}`);
      await tryRequest(
        `${baseUrl}/admin/realms/rmf-web/users/${keycloakUser.id}/role-mappings/clients/${dashboardKCId}`,
        {
          method: 'POST',
          headers: authHeaders(token),
        },
        user.roles.map((role) => ({ id: keycloakRoleIdMap[role], name: role })),
      );

      // set the password
      await request(
        `${baseUrl}/admin/realms/rmf-web/users/${keycloakUser.id}/reset-password`,
        {
          method: 'PUT',
          headers: authHeaders(token),
        },
        {
          value: user.username,
          temporary: false,
        },
      );
    }

    await tryRequest(
      `${baseUrl}/admin/realms/rmf-web/events/config`,
      {
        method: 'PUT',
        headers: authHeaders(token),
      },
      {
        eventsEnabled: true,
        eventsListeners: ['jsonlog_event_listener'],
      },
    );

    console.log('create audience client scopes');
    await createAudienceClientScope(
      authHeaders(token),
      'dashboard',
      'dashboard scope',
      'dashboard',
    );

    await createAudienceClientScope(
      authHeaders(token),
      'reporting',
      'reporting scope',
      'reporting',
    );

    console.log('assign audience client scopes');
    // get existing clients
    const clientsRaw = await request(`${baseUrl}/admin/realms/rmf-web/clients`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const clientArray = clientsRaw.body;

    const reportingId = clientArray.filter(function (item) {
      return item.clientId === 'reporting';
    })[0].id;

    // get existing clients scopes (dashboard and reporting)
    const clientsScopeRaw = await request(`${baseUrl}/admin/realms/rmf-web/client-scopes`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const clientScopesArray = clientsScopeRaw.body;
    const clientScopeRmfServerId = clientScopesArray.filter(function (item) {
      return item.name == 'dashboard';
    })[0].id;

    const clientScopeReportingId = clientScopesArray.filter(function (item) {
      return item.name == 'reporting';
    })[0].id;

    await setClientScopeToClient(authHeaders(token), dashboardKCId, clientScopeRmfServerId);
    await setClientScopeToClient(authHeaders(token), reportingId, clientScopeReportingId);
  } catch (e) {
    process.exitCode = 1;
  }
})();
