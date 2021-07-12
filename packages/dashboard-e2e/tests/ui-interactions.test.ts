import { Element } from '@wdio/sync';
import { makeLauncher } from '../../dashboard/rmf-launcher';
import { login, overwriteClick } from './utils';

describe('ui interactions', () => {
  let doorAccordion: Element;
  const launcher = makeLauncher();

  before(async () => await launcher.launch());
  after(async () => await launcher.kill());

  before(() => overwriteClick());
  before(() => browser.url('/'));

  before(login);

  function closeOmniPanel() {
    $(`#omnipanel [aria-label=Close]`).click();
  }

  function omniPanelMainMenu() {
    $(`#omnipanel [aria-label=Back]`).click();
  }

  function openDoorAccordian() {
    doorAccordion = $('.MuiAccordion-root*=main_door');
    doorAccordion.click();
  }

  // interactive item tests
  it('clicking a door on the map focuses it on the panel', () => {
    closeOmniPanel();
    const door = $(`[data-component=DoorMarker]`);
    const doorName = door.getAttribute('aria-label');
    door.waitForClickable();
    door.click();

    expect($(`.MuiAccordion-root*=${doorName}`).$('.MuiAccordionDetails-root')).toBeVisible();
  });

  it('clicking a dispenser on the map focuses it on the panel', () => {
    closeOmniPanel();
    const dispenser = $('[data-component=DispenserMarker]');
    const guid = dispenser.getAttribute('aria-label');
    dispenser.click();

    expect($(`.MuiAccordion-root*=${guid}`).$('.MuiAccordionDetails-root')).toBeVisible();
  });

  it('clicking a robot on the map focuses it on the panel', () => {
    closeOmniPanel();
    const robot = $('[data-component=RobotMarker]');
    const robotName = robot.getAttribute('aria-label');
    robot.click();

    expect($(`.MuiAccordion-root*=${robotName}`).$('.MuiAccordionDetails-root')).toBeVisible();
  });

  // filter test
  it('Clicking on an equipment on the map resets the filter', () => {
    omniPanelMainMenu();
    $('[data-component=MainMenu] [data-item=Doors]').click();
    // set value to filter input
    $('[data-component=simple-filter]').$('input').setValue('value');

    // get door marker and click
    const door = $('[data-component=DoorMarker]');
    const doorName = door.getAttribute('aria-label');

    door.waitForClickable();
    door.click();

    // check that the filter is empty after clicking
    expect($('[data-component=simple-filter]').$('input').getValue()).toEqual('');
    // check that door panel is expanded
    expect($(`.MuiAccordion-root*=${doorName}`).$('.MuiAccordionDetails-root')).toBeVisible();
  });

  // door interaction test
  it('clicking on open button opens the door', () => {
    openDoorAccordian();
    doorAccordion.$('button=Open').click();
    expect(doorAccordion.$('[role=status]')).toHaveText('OPEN');
  });

  it('clicking on close button closes the door', () => {
    openDoorAccordian();
    doorAccordion.$('button=Close').click();
    expect(doorAccordion.$('[role=status]')).toHaveText('CLOSED');
  });

  // submit task test
  it('can submit loop task', () => {
    browser.url('/tasks');
    $('button[aria-label="Create Task"]').click();
    $('#task-type').click();
    const getLoopOption = () => $$('[role=option]').find((elem) => elem.getText() === 'Loop');
    browser.waitUntil(() => !!getLoopOption());
    const loopOption = getLoopOption()!;
    loopOption.click();

    $('#start-location').setValue('coe');
    $('#finish-location').setValue('pantry');

    $('button[aria-label="Submit"]').click();
    browser.waitUntil(() => $('div=Successfully created task').isDisplayed(), {
      timeout: 15000,
      interval: 500,
    });
  }).timeout(20000);
});
