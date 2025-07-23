module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo", // Preset principal do Expo
      "nativewind/babel",   // Preset do NativeWind
    ],
    plugins: [],
  };
};