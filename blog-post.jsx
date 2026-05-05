// Renders a single blog post page (hero + body + sidebar of related posts).
// Expects `currentSlug` global to be set on the page before this script runs.
// Body content is now an HTML string (managed by CMS) rendered via dangerouslySetInnerHTML.

function BlogPostBody({ post }) {
  return (
    <div
      className="post-body"
      dangerouslySetInnerHTML={{ __html: post.body }}
    />
  );
}

function PostSidebar({ currentSlug }) {
  const others = relatedPosts(currentSlug);
  return (
    <aside className="post-sidebar">
      <div className="post-sidebar-inner">
        <p className="eyebrow" style={{ color: "var(--cyan)" }}>More reading</p>
        <h3>From the Weland blog</h3>
        <ul className="sidebar-posts">
          {others.map((p) =>
          <li key={p.slug}>
              <a href={postUrl(p)} className="sidebar-post">
                <span
                className="sidebar-post-img"
                style={{ backgroundImage: `url('${p.image}')` }}>
                </span>
                <span className="sidebar-post-text">
                  <span className="sidebar-post-cat">{p.category}</span>
                  <span className="sidebar-post-title">{p.title}</span>
                </span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}

function BlogPostPage({ slug }) {
  const post = postBySlug(slug);
  if (!post) {
    return (
      <div style={{ padding: "80px 32px", textAlign: "center" }}>
        <p>Post not found.</p>
      </div>
    );
  }
  return (
    <InteriorShell
      pageId="blog-post"
      title={post.title}
      metaDesc={post.dek}
      heroImage={post.image}
      heroImageAlt={post.imageAlt}
      heroOverlay={true}
      crumbs={[
        { label: "Home", href: "index.html" },
        { label: "Blog", href: "Blog.html" },
        { label: post.title }
      ]}
    >
      <div className="post-layout">
        <article className="post-article">
          <header className="post-header">
            <span className="post-category">{post.category}</span>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-dek">{post.dek}</p>
            <div className="post-byline">
              <span className="post-author">{post.author}</span>
              <span className="post-dot">·</span>
              <span className="post-role">{post.authorRole}</span>
              <span className="post-dot">·</span>
              <span className="post-date">{post.date}</span>
              <span className="post-dot">·</span>
              <span className="post-read">{post.read}</span>
            </div>
          </header>
          <BlogPostBody post={post} />
        </article>
        <PostSidebar currentSlug={slug} />
      </div>
    </InteriorShell>
  );
}
