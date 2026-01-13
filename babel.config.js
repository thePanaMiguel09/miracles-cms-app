module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }]
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@/assets": "./src/assets",
            "@presentation": "./src/presentation",
            "@domain": "./src/domain",
            "@data": "./src/data",
            "@core": "./src/core",
            "@libs": "./src/libs",
          },
        },
      ],
      // Reanimated debe ir al final
      "react-native-reanimated/plugin",
    ],
  };
};