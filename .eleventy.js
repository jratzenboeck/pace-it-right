module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/index.js");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
