import axios from "axios";
import { useEffect, useState } from "react";

function UserPosts({ userId, showRecent }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts based on userId
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="mt-4">
      {showRecent ? (
        <>
          <h3 className="text-md font-semibold mb-2 text-blue-600">
            Recent Posts:
          </h3>
          <ul className="list-disc list-inside">
            {posts.slice(0, 3).map((post) => (
              <li key={post.id} className="text-sm text-gray-600">
                {post.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="p-2 mb-3 border-b border-gray-300">
              <h3 className="font-bold text-lg text-gray-800 capitalize">
                {post.title}
              </h3>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPosts;
