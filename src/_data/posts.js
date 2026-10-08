const fetch = require("node-fetch");

module.exports = async function() {
  // WordPress REST API Endpoint lấy 20 bài viết mới nhất kèm dữ liệu media (_embed)
  const url = "https://hoalongcorp.com/wp-json/wp/v2/posts?per_page=20&_embed=1";

  try {
    const response = await fetch(url);
    const posts = await response.json();

    return posts.map(post => {
      // 1. Trích xuất URL ảnh đại diện (Featured Image)
      let featuredImage = "https://via.placeholder.com/600x400/004b93/ffffff?text=Co+Khi+Hoa+Long";
      if (
        post._embedded &&
        post._embedded["wp:featuredmedia"] &&
        post._embedded["wp:featuredmedia"][0] &&
        post._embedded["wp:featuredmedia"][0].source_url
      ) {
        featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
      }

      // 2. Trích xuất Tên Chuyên Mục (Category Name)
      let categoryName = "Tin Tức";
      if (
        post._embedded &&
        post._embedded["wp:term"] &&
        post._embedded["wp:term"][0] &&
        post._embedded["wp:term"][0][0]
      ) {
        categoryName = post._embedded["wp:term"][0][0].name;
      }

      // 3. Định dạng ngày đăng
      const postDate = new Date(post.date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });

      return {
        id: post.id,
        title: post.title.rendered,
        link: post.link, // URL chính xác trỏ thẳng về bài viết trên hoalongcorp.com
        excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 140) + "...", // Lọc bỏ tag HTML
        date: postDate,
        image: featuredImage,
        category: categoryName
      };
    });
  } catch (error) {
    console.error("Lỗi khi fetch bài viết từ hoalongcorp.com:", error);
    return [];
  }
};
