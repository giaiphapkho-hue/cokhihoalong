module.exports = function(eleventyConfig) {
    // Chỉ copy thư mục js nếu đã có trong src/
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
