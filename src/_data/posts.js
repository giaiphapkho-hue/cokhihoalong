// Bỏ dòng require("node-fetch") đi vì Node.js 18+ đã có sẵn fetch native

module.exports = async function() {
  const url = "https://hoalongcorp.com/wp-json/wp/v2/posts?per_page=20&_embed=1";

  try {
    const response = await fetch(url);
    const posts = await response.json();

    return posts.map(post => {
      let featuredImage = "https://via.placeholder.com/600x400/004b93/ffffff?text=Co+Khi+Hoa+Long";
      if (
        post._embedded &&
        post._embedded["wp:featuredmedia"] &&
        post._embedded["wp:featuredmedia"][0] &&
        post._embedded["wp:featuredmedia"][0].source_url
      ) {
        featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
      }

      let categoryName = "Tin Tức";
      if (
        post._embedded &&
        post._embedded["wp:term"] &&
        post._embedded["wp:term"][0] &&
        post._embedded["wp:term"][0][0]
      ) {
        categoryName = post._embedded["wp:term"][0][0].name;
      }

      const postDate = new Date(post.date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });

      return {
        id: post.id,
        title: post.title.rendered,
        link: post.link,
        excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 140) + "...",
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
