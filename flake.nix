{
  description = "Expo React Native Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.android_sdk.accept_license = true;
          config.allowUnfree = true;
        };

        androidComposition = pkgs.androidenv.composeAndroidPackages {
          platformVersions = [ "35" ];
          platformToolsVersion = [ "35.0.2" ];
          buildToolsVersions = [ "35.0.1" ];
          systemImageTypes = [ "google_apis_playstore" ];
          abiVersions = [
            "arm64-v8a"
          ];
          includeNDK = true;
          includeExtras = [
            "extras;google;auto"
          ];
          includeEmulator = true;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_24
            watchman

            # For Android development
            jdk17
            (android-studio.withSdk androidComposition.androidsdk)

            # Testing framework
            maestro
          ];

          shellHook = ''
            export ANDROID_HOME=${androidComposition.androidsdk}/libexec/android-sdk
            echo "Expo development environment activated!"
            echo "Run 'npx create-expo-app my-app' to create a new Expo project"
          '';
        };
      }
    );
}
