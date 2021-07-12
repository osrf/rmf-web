import { getReport, login, overwriteClick } from './utils';
import { rmfData } from './mock-data';
import fetch from 'node-fetch';

describe('reporting interactions', () => {
  before(() => overwriteClick());
  before(() => browser.url('/'));

  before(login);

  it('should populate the database', async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify(rmfData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let response;
    try {
      const res = await fetch(`http://localhost:8003/log/rmfserver`, options);
      response = await res.text();
    } catch (error) {
      console.log(error);
    }

    expect(response).toBe('"Logs were saved correctly"');
  });

  it('should retrieve dispenser state report', async () => {
    const options = {
      listOrder: 2,
      elemName: 'div*=Dispensers',
      reportTitle: 'h6=Dispenser State',
    };
    getReport(options);
    expect($('h6=Dispenser State')).toBeVisible();
  });
  it('should retrieve door state report', async () => {
    const options = {
      listOrder: 3,
      elemName: 'div*=Doors',
      reportTitle: 'h6=Door State',
    };
    getReport(options);
    expect($('h6=Door State')).toBeVisible();
  });

  it('should retrieve the fleet state report', async () => {
    const options = {
      listOrder: 4,
      elemName: 'div*=Fleets',
      reportTitle: 'h6=Fleet State',
    };
    getReport(options);
    expect($('h6=Fleet State')).toBeVisible();
  });

  it('should retrieve the health report', async () => {
    const options = {
      listOrder: 5,
      elemName: 'div*=Health',
      reportTitle: 'h6=Health',
    };
    getReport(options);
    expect($('h6=Health')).toBeVisible();
  });

  it('should retrieve ingestor state report', async () => {
    const options = {
      listOrder: 6,
      elemName: 'div*=Ingestor',
      reportTitle: 'h6=Ingestor State',
    };
    getReport(options);
    expect($('h6=Ingestor State')).toBeVisible();
  });

  it('should retrieve lift state report', async () => {
    const options = {
      listOrder: 7,
      elemName: 'div*=Lifts',
      reportTitle: 'h6=Lift State',
    };
    getReport(options);
    expect($('h6=Lift State')).toBeVisible();
  });

  it('should retrieve the task summary report', async () => {
    const options = {
      listOrder: 8,
      elemName: 'div*=Tasks',
      reportTitle: 'h6=Task Summary',
    };
    getReport(options);
    expect($('h6=Task Summary')).toBeVisible();
  });
});
