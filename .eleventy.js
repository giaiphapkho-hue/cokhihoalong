module.exports = function(eleventyConfig) {
    // Tự động copy thư mục js nếu tồn tại
    eleventyConfig.addPassthroughCopy("src/js");

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        pathPrefix: "/cokhihoalong/"
    };
};
