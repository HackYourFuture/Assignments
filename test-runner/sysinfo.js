//cspell: disable
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const si = require('systeminformation');
const { parse } = require('comment-json');
const _ = require('lodash');
const chalk = require('chalk');

const ONE_GB_1000 = 1_000_000_000;
const ONE_GB_1024 = 1024 * 1024 * 1024;

const vscodeUserSettingsLocations = {
  win32: String.raw`${process.env.APPDATA}\Code\User\settings.json`,
  darwin: `${process.env.HOME}/Library/Application Support/Code/User/settings.json`,
  linux: `${process.env.HOME}/.config/Code/User/settings.json`,
};

function writeJSON(sysInfo) {
  try {
    const json = JSON.stringify(sysInfo, null, 2);
    const filePath = path.join(__dirname, '../sysinfo.json');
    fs.writeFileSync(filePath, json, 'utf8');
    console.log(chalk.green('System information written to `sysinfo.json`.'));
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  }
}

function getVSCodeInfo(platform) {
  const vscodeInfo = { version: '', extensions: [], userSettings: {} };
  try {
    const versionOutput = execSync('code --version', { encoding: 'utf8' });
    vscodeInfo.version = versionOutput.split('\n')[0];

    const extensionOutput = execSync('code --list-extensions', {
      encoding: 'utf8',
    });
    vscodeInfo.extensions = extensionOutput
      .split('\n')
      .filter((line) => line.trim() !== '');

    const settingsPath = path.normalize(vscodeUserSettingsLocations[platform]);
    const userSettings = fs.readFileSync(settingsPath, 'utf8');
    vscodeInfo.userSettings = parse(userSettings);
  } catch (err) {
    console.error(chalk.red(`Something went wrong: ${err.message}`));
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return vscodeInfo;
  }
}

(async () => {
  console.log('Please wait while system information is being collected...');
  const _system = await si.system();
  const system = _.pick(_system, ['manufacturer', 'model']);

  const _cpu = await si.cpu();
  const cpu = _.pick(_cpu, [
    'manufacturer',
    'brand',
    'speed',
    'virtualization',
  ]);

  const _memory = await si.mem();
  const memory = `${(_memory.total / ONE_GB_1024).toFixed(0)} GB`;

  const _osInfo = await si.osInfo();
  const osInfo = _.pick(_osInfo, ['platform', 'distro', 'release']);

  const _blockDevices = await si.blockDevices();
  const blockDevices = _blockDevices
    .map((device) => _.pick(device, ['name', 'size', 'fsType', 'physical']))
    .map((device) => ({
      ...device,
      size: `${(device.size / ONE_GB_1000).toFixed(0)} GB`,
    }));

  const vscodeInfo = getVSCodeInfo(_osInfo.platform);

  const sysInfo = {
    node: process.version,
    system,
    cpu,
    memory,
    osInfo,
    blockDevices,
    vscodeInfo,
  };

  writeJSON(sysInfo);
})();
