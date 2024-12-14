import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "antd";

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts based on userId
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  // Handle opening the modal to view full post
  const handleViewPost = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null); // Reset selected post after closing
  };

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold mb-2 text-blue-600">
        Recent Posts:
      </h3>
      <ul className="list-disc list-inside">
        {posts.slice(0, 3).map((post) => (
          <li
            key={post.id}
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => handleViewPost(post)} // Open modal on post click
          >
            {post.title}
          </li>
        ))}
      </ul>

      {/* Modal to show full post details */}
      {selectedPost && (
        <Modal
          title={selectedPost.title}
          visible={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
        >
          <p>{selectedPost.body}</p>
        </Modal>
      )}
    </div>
  );
}

export default UserPosts;
