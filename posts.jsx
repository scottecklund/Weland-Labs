// posts.jsx — Weland Labs blog post data loader
// Content is managed via the CMS at /admin and stored in data/posts.json.
// Uses synchronous XHR so blogPosts is available before React initializes.

(function () {
  let posts = [];
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/posts.json", false); // synchronous load
    xhr.send();
    if (xhr.status === 200) {
      posts = JSON.parse(xhr.responseText);
    }
  } catch (e) {
    console.warn("[Weland CMS] Could not load data/posts.json:", e);
  }

  window.blogPosts = posts;

  window.relatedPosts = function (currentSlug) {
    return posts.filter(function (p) { return p.slug !== currentSlug; });
  };

  window.postBySlug = function (slug) {
    return posts.find(function (p) { return p.slug === slug; });
  };

  window.postUrl = function (post) {
    var safe = post.title.replace(/[:?()]/g, "").replace(/\s+/g, " ").trim();
    return "Blog - " + safe + ".html";
  };
})();
