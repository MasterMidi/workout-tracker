{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

let
  # 1. Read the app.json file and parse it into a Nix attribute set
  appConfig = builtins.fromJSON (builtins.readFile ./app.json);

  # 2. Find the 'expo-build-properties' entry in the plugins list.
  # We search for a list where the first item is the plugin name.
  buildPropertiesPlugin =
    pkgs.lib.findFirst
      (plugin: pkgs.lib.isList plugin && builtins.head plugin == "expo-build-properties")
      (throw "Error: Could not find 'expo-build-properties' in your app.json plugins list.")
      appConfig.expo.plugins;

  # 3. Extract the android properties from the found plugin.
  # The properties are the second item in the list (e.g., [ "plugin-name", {properties} ]).
  androidProps = (builtins.elemAt buildPropertiesPlugin 1).android;

in

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  packages = with pkgs; [
    watchman

    # Testing framework
    maestro
    git
  ];

  # https://devenv.sh/languages/
  # languages.rust.enable = true;
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_23;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  android = {
    enable = true;
    platforms.version = [ (toString androidProps.compileSdkVersion) ];
    abis = [
      "arm64-v8a"
      "x86_64" # For better performance emulating on x
    ];
    cmake.version = [ "3.22.1" ];
    # cmdLineTools.version = "11.0";
    # tools.version = "26.1.1";
    platformTools.version = "35.0.2";
    buildTools.version = [ androidProps.buildToolsVersion ];
    emulator = {
      enable = true;
      version = "34.1.9";
    };
    # sources.enable = false;
    systemImages.enable = true;
    systemImageTypes = [ "google_apis_playstore" ];
    ndk = {
      enable = true;
      version = [ "27.1.12297006" ];
    };
    googleAPIs.enable = true;
    reactNative.enable = true;
  };

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';

  enterShell = ''
    hello
    git --version
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/git-hooks/
  # git-hooks.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
