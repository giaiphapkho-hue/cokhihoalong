module.exports = function(eleventyConfig) {
    // Copy các thư mục tài nguyên tĩnh nếu có vào thư mục dist
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        pathPrefix: "/cokhihoalong/",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
