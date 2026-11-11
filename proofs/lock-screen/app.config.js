const bundleIdentifier = 'com.fgzmac.swoldier.lockproof';
const targetName = 'SwoldierProofLiveActivity';

module.exports = {
  name: 'Swoldier Lock Screen Proof',
  slug: 'swoldier-lock-screen-proof',
  version: '1.0.0',
  platforms: ['ios'],
  ios: {
    bundleIdentifier,
    buildNumber: '1',
    infoPlist: { NSSupportsLiveActivities: true },
  },
  experiments: { inlineModules: { watchedDirectories: ['modules'] } },
  plugins: ['./plugins/withLockScreenProof'],
  extra: {
    eas: {
      build: {
        experimental: {
          ios: {
            appExtensions: [{
              targetName,
              bundleIdentifier: bundleIdentifier + '.LiveActivity',
              entitlements: {},
            }],
          },
        },
      },
    },
  },
};
