import React from "react";

function ProtectedRoute() {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await fetch("/api/v1/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.data.posts);
      } else {
        console.log(`Error`, data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <h3>Posts:</h3>
      {posts.map((post) => (
        <div>
          <h4>{post.title}</h4>
          <p>{post.plot}</p>
          <p>Author: {post.author}</p>
        </div>
      ))}
    </div>
  );

  return <div>ProtectedRoute</div>;
}

export default ProtectedRoute;
