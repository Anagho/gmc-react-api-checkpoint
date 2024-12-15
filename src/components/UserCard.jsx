import { useState } from "react";
import { Button, Modal } from "antd";
import UserPosts from "./UserPosts"; // Import UserPosts

function UserCard({ id, name, email, phone }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isPostsModalOpen, setIsPostsModalOpen] = useState(false); // Modal state for all posts

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Toggle between showing and hiding user info
  const toggleUserInfo = () => {
    if (userDetails) {
      setUserDetails(null);
    } else {
      fetchUserDetails();
    }
  };

  // Open modal to view all posts
  const handleViewAllPosts = () => {
    setIsPostsModalOpen(true);
  };

  // Close modal
  const handleClosePostsModal = () => {
    setIsPostsModalOpen(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <p className="text-gray-600">{phone}</p>

      <div className="flex gap-4 mt-4">
        <Button type="primary" onClick={toggleUserInfo}>
          {userDetails ? "Hide Info" : "View More Info"}
        </Button>

        <Button type="default" onClick={handleViewAllPosts}>
          View All Posts
        </Button>
      </div>

      {userDetails && (
        <div className="mt-4 text-sm text-gray-700">
          <p>
            <strong>City:</strong> {userDetails.address.city}
          </p>
          <p>
            <strong>Street:</strong> {userDetails.address.street}
          </p>
          <p>
            <strong>Suite:</strong> {userDetails.address.suite}
          </p>
        </div>
      )}

      {/* Recent Posts Section */}
      <UserPosts userId={id} showRecent={true} />

      {/* Modal for All Posts */}
      <Modal
        title={<h2 className="text-blue-800">Posts by {name}</h2>}
        open={isPostsModalOpen}
        onCancel={handleClosePostsModal}
        footer={null}
        width={600}
      >
        <UserPosts userId={id} showRecent={false} /> {/* Fetch all posts */}
      </Modal>
    </div>
  );
}

export default UserCard;
