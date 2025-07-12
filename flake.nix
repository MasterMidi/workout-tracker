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
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_24
            watchman
            (with nodePackages; [
              # eas-cli
            ])

            # For Android development
            jdk17

            # For iOS development (macOS only)
            (lib.optional stdenv.isDarwin [
              cocoapods
              xcbuild
            ])
          ];

          shellHook = ''
            echo "Expo development environment activated!"
            echo "Run 'npx create-expo-app my-app' to create a new Expo project"
          '';
        };
      }
    );
}
