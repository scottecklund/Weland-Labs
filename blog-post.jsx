// Renders a single blog post page (hero + body + sidebar of related posts).
// Expects `currentSlug` global to be set on the page before this script runs.

function BlogPostBody({ post }) {
  return (
    <div className="post-body">
      {post.body.map((block, i) => {
        if (block.kind === "h2") {
          return <h2 key={i}>{block.text}</h2>;
        }
        if (block.kind === "ul") {
          return (
            <ul key={i}>
              {block.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>);

        }
        if (block.kind === "callout") {
          return <aside key={i} className="post-callout">{block.text}</aside>;
        }
        return <p key={i}>{block.text}</p>;
      })}
    </div>);

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
                <span className="sidebar-post-meta">
                  <span className="sidebar-post-cat">{p.category}</span>
                  <span className="sidebar-post-title">{p.title}</span>
                  <span className="sidebar-post-read">{p.read} <IShell.Arrow /></span>
                </span>
              </a>
            </li>
          )}
        </ul>
        <a href="Blog.html" className="sidebar-all">View all posts <IShell.Arrow /></a>
      </div>
    </aside>);

}

function BlogPostPage({ slug }) {
  const post = postBySlug(slug);
  if (!post) {
    return <main><div className="container" style={{ padding: "80px 0" }}><p>Post not found.</p></div></main>;
  }
  return (
    <>
      <ShellNav current="blog" />
      <main>
        <section className="post-hero">
          <div className="container">
            <p className="post-crumbs">
              <a href="Blog.html">Blog</a>
              <span>/</span>
              <span>{post.category}</span>
            </p>
            <h1>{post.title}</h1>
            <p className="post-dek">{post.dek}</p>
          </div>
        </section>

        <section className="post-body-section">
          <div className="container post-layout">
            <article className="post-article">
              <div
                className="post-article-image"
                style={{ backgroundImage: `url('${post.image}')` }}
                role="img"
                aria-label={post.imageAlt}>
              </div>
              <div className="post-article-inner">
                <BlogPostBody post={post} />
                <div className="post-share">
                  <span className="post-share-label">Share</span>
                  <a href="#" aria-label="Share on Facebook"><IShell.Facebook /></a>
                  <a href="#" aria-label="Share on LinkedIn"><IShell.LinkedIn /></a>
                  <a href={`mailto:?subject=${encodeURIComponent(post.title)}`} aria-label="Email">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22 6 12 13 2 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
            <PostSidebar currentSlug={post.slug} />
          </div>
        </section>
      </main>
      <ShellFooter />
    </>);

}

Object.assign(window, { BlogPostBody, PostSidebar, BlogPostPage });
