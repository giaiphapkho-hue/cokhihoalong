module.exports = function(eleventyConfig) {
    // Chỉ giữ lại copy js vì src/js đã có sẵn
    eleventyConfig.addPassthroughCopy("src/js");

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
