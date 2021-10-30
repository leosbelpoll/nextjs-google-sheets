import mockPosts from "../../mockPosts.json";

export function getServerSideProps() {
  return {
    props: {
      posts: mockPosts,
    },
  };
}

export default function Posts({ posts }) {
  if (!posts) return <p>Loading ....</p>;

  return (
    <>
      {posts.map(({ id, title }, index) => (
        <>
          <a href={`/posts/${id}`}>
            <h3>
              {index + 1} {">>"} {title}
            </h3>
          </a>
        </>
      ))}
    </>
  );
}
