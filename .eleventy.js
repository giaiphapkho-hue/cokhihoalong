module.exports = function(eleventyConfig) {
    // Copy trực tiếp CSS, JS, hình ảnh sang thư mục xuất bản (dist)
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");

    return {
        dir: {
            input: "src",       // Thư mục mã nguồn
            output: "dist"      // Thư mục biên dịch xuất bản
        },
        // Đặt pathPrefix cho GitHub Pages (tên repository của bạn)
        pathPrefix: "/cokhihoalong/"
    };
};
