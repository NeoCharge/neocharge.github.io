const blacklist = require('metro-config/src/defaults/blacklist');

// to use SVGs
const { getDefaultConfig } = require("metro-config");

// blacklist is a function that takes an array of regexes and combines
// // them with the default blacklist to return a single regex.
//
// module.exports = {
//   resolver: {
//     blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
//   }

// };

module.exports = (async () => {
  const {
    resolver: {
      sourceExts,
      assetExts
    }
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();