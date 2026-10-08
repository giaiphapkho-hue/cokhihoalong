module.exports = function(eleventyConfig) {
    // Copy thư mục js tĩnh nếu có
    eleventyConfig.addPassthroughCopy("src/js");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "dist"
        },
        pathPrefix: "/cokhihoalong/",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md"]
    };
};
