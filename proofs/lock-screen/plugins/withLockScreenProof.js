const fs = require('node:fs');
const path = require('node:path');
const { IOSConfig, withPodfileProperties, withXcodeProject } = require('expo/config-plugins');

const minimumIOS = '26.0';
const sharedSources = ['ProofActivity.swift', 'ProofIntents.swift'];
const appSources = [...sharedSources, 'ProofStore.swift', 'ProofCoordinator.swift'];
const widgetSources = [...sharedSources, 'ProofWidget.swift'];
const sqlResource = 'ProofSQL.json';
const widgetPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key><string>$(DEVELOPMENT_LANGUAGE)</string>
  <key>CFBundleDisplayName</key><string>Workout Proof</string>
  <key>CFBundleExecutable</key><string>$(EXECUTABLE_NAME)</string>
  <key>CFBundleIdentifier</key><string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
  <key>CFBundleInfoDictionaryVersion</key><string>6.0</string>
  <key>CFBundleName</key><string>$(PRODUCT_NAME)</string>
  <key>CFBundlePackageType</key><string>XPC!</string>
  <key>CFBundleShortVersionString</key><string>$(MARKETING_VERSION)</string>
  <key>CFBundleVersion</key><string>$(CURRENT_PROJECT_VERSION)</string>
  <key>NSExtension</key>
  <dict>
    <key>NSExtensionPointIdentifier</key><string>com.apple.widgetkit-extension</string>
  </dict>
</dict>
</plist>
`;

function setBuildSettings(project, target, settings) {
  const lists = project.pbxXCConfigurationList();
  const configs = project.pbxXCBuildConfigurationSection();
  for (const { value } of lists[target.buildConfigurationList].buildConfigurations) {
    Object.assign(configs[value].buildSettings, settings);
  }
}

function installFiles(project, nativeDir, iosDir, folder, files, targetUuid) {
  const xcode = IOSConfig.XcodeUtils;
  const output = path.join(iosDir, folder);
  fs.mkdirSync(output, { recursive: true });
  xcode.ensureGroupRecursively(project, folder);
  for (const filename of files) {
    fs.copyFileSync(path.join(nativeDir, filename), path.join(output, filename));
    const options = { project, groupName: folder, filepath: folder + '/' + filename, targetUuid };
    if (filename === sqlResource) {
      xcode.addResourceFileToGroup({ ...options, isBuildFile: true });
    } else {
      xcode.addBuildSourceFileToGroup(options);
    }
    const ref = Object.values(project.pbxFileReferenceSection()).find(value =>
      value.isa === 'PBXFileReference' && typeof value.path === 'string' && xcode.unquote(value.path) === options.filepath
    );
    if (!ref) throw new Error('Missing Xcode reference: ' + options.filepath);
    if (ref.explicitFileType === undefined || ref.explicitFileType === 'undefined') delete ref.explicitFileType;
    if (ref.fileEncoding === undefined || ref.fileEncoding === 'undefined') delete ref.fileEncoding;
    if (filename === sqlResource) ref.lastKnownFileType = 'text.json';
  }
}

module.exports = function withLockScreenProof(config) {
  const extension = config.extra.eas.build.experimental.ios.appExtensions[0];
  config = withPodfileProperties(config, mod => {
    mod.modResults['ios.deploymentTarget'] = minimumIOS;
    return mod;
  });
  return withXcodeProject(config, mod => {
    const project = mod.modResults;
    const iosDir = mod.modRequest.platformProjectRoot;
    const nativeDir = path.join(mod.modRequest.projectRoot, 'native');
    const host = project.getTarget('com.apple.product-type.application');
    const { targetName, bundleIdentifier } = extension;
    const existing = Object.entries(project.pbxNativeTargetSection()).find(([, candidate]) =>
      candidate.isa === 'PBXNativeTarget' && IOSConfig.XcodeUtils.unquote(candidate.name) === targetName
    );
    let [targetUuid, target] = existing || [];
    if (!target) {
      // node-xcode only adds dependencies when both sections already exist.
      project.hash.project.objects.PBXContainerItemProxy ??= {};
      project.hash.project.objects.PBXTargetDependency ??= {};
      const added = project.addTarget(targetName, 'app_extension', targetName, bundleIdentifier);
      target = added.pbxNativeTarget;
      targetUuid = added.uuid;
      project.addBuildPhase([], 'PBXSourcesBuildPhase', 'Sources', targetUuid);
      project.addBuildPhase([], 'PBXFrameworksBuildPhase', 'Frameworks', targetUuid);
      project.addBuildPhase([], 'PBXResourcesBuildPhase', 'Resources', targetUuid);
    }

    setBuildSettings(project, host.target, { IPHONEOS_DEPLOYMENT_TARGET: minimumIOS });
    project.addFramework('libsqlite3.tbd', { target: host.uuid });
    setBuildSettings(project, target, {
      APPLICATION_EXTENSION_API_ONLY: 'YES',
      CODE_SIGN_STYLE: 'Automatic',
      CURRENT_PROJECT_VERSION: config.ios.buildNumber,
      GENERATE_INFOPLIST_FILE: 'NO',
      INFOPLIST_FILE: targetName + '/Info.plist',
      IPHONEOS_DEPLOYMENT_TARGET: minimumIOS,
      MARKETING_VERSION: config.version,
      PRODUCT_BUNDLE_IDENTIFIER: bundleIdentifier,
      SKIP_INSTALL: 'YES',
      SWIFT_ACTIVE_COMPILATION_CONDITIONS: '"$(inherited) PROOF_WIDGET_EXTENSION"',
      SWIFT_VERSION: '5.0',
      TARGETED_DEVICE_FAMILY: '1',
    });

    installFiles(project, nativeDir, iosDir, 'ProofHost', [...appSources, sqlResource], host.uuid);
    installFiles(project, nativeDir, iosDir, targetName, widgetSources, targetUuid);
    fs.writeFileSync(path.join(iosDir, targetName, 'Info.plist'), widgetPlist);
    return mod;
  });
};
