import { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import UserPosts from "./UserPosts";

function UserCard({ id, name, email, phone }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUserDetails(response.data);
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

  // Open modal to view full posts
  const handleViewPosts = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <p className="text-gray-600">{phone}</p>

      <div className="flex gap-4 mt-4">
        {/* Button to toggle user details */}
        <Button type="primary" onClick={toggleUserInfo}>
          {userDetails ? "Hide Info" : "View More Info"}
        </Button>

        {/* Button to open modal for posts */}
        <Button type="default" onClick={handleViewPosts}>
          View Posts
        </Button>
      </div>

      {/* Display user details */}
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

      {/* Display UserPosts component with the id as userId */}
      <UserPosts userId={id} />

      {/* Modal for viewing full posts */}
      <Modal
        title={`Posts by ${name}`}
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        {/* Posts will be rendered inside UserPosts */}
      </Modal>
    </div>
  );
}

export default UserCard;
