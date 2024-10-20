import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiEdit2Fill, RiDeleteBin2Line } from 'react-icons/ri';
import { toast, ToastContainer } from 'react-toastify';

function Home() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const token = localStorage.getItem('token');
  const userdata = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/getuser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userdata();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setEditEmail(user.email);
    setEditPassword(user.password);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `/updateuser/${selectedUser._id}`,
        {
          email: editEmail,
          password: editPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('User updated successfully!');
      userdata(); 
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
  };

  const deleteUser = async (user_id) => {
    try {
      await axios.delete(`/deleteuser/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User deleted successfully!');
      userdata();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  return (
    <>
      <div className='background h-screen p-2 md:p-24'>
        <div className='flex justify-center p-4'>
          <img
            src='/images/group.svg' 
            alt='Logo'
            className='h-16 w-auto' 
          />
        </div>

        <div className='text-center mb-4'>
          <h1 className='text-3xl font-bold text-gray-800'>User Management</h1>
        </div>

        <div className='p-5 rounded-xl from-teal-800 to-teal-400 shadow-xl h-fit overflow-y-auto '>
          <div className='md:flex py-5 ps-5 my-2 rounded-lg bg-teal-950 border-b border-blue-50 shadow-sm text-center hidden md:block'>
            <div className='font-medium text-gray-800 ps-4 text-lg flex-1'>ID</div>
            <div className='font-medium text-gray-800 ps-4 text-lg flex-[3]'>Email</div>
            <div className='font-medium text-gray-800 ps-4 text-lg flex-[3]'>Password</div>
            <div className='font-medium text-gray-800 ps-4 text-lg flex-[2]'>Actions</div>
          </div>

          <div className='p-4 w-full overflow-y-scroll table-h overflow-hidden'>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              user.map((item, index) => (
                <div
                  className='p-2 md:py-5 md:ps-5 my-2 rounded-lg bg-teal-950 border-b border-blue-50 shadow-sm flex gap-y-6 flex-col sm:flex-row text-center'
                  key={item.user_id}
                  id={item.user_id}
                >
                  <div className='font-medium text-gray-800 ps-4 text-lg flex-1'>{index + 1}</div>
                  <div className='font-medium text-gray-800 ps-4 text-lg flex-[3]'>{item.email}</div>
                  <div className='font-medium text-gray-800 ps-4 text-lg flex-[3] clamped-text'>{item.password}</div>
                  <div className='flex justify-evenly items-center flex-[2] mt-2 sm:mt-0'>
                    <RiEdit2Fill className='text-3xl cursor-pointer hover:text-teal-500' onClick={() => openModal(item)} />
                      <div className=' text-4xl  font-light md:hidden'>|</div>
                    <RiDeleteBin2Line className='text-3xl cursor-pointer  hover:text-teal-500' onClick={() => deleteUser(item._id)} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-teal-600 bg-opacity-50 backdrop-blur-md'>
          <div className='glass-modal p-9 rounded-lg shadow-2xl'>
            <h2 className='text-2xl mb-4'>Edit User</h2>
            <input
              type='email'
              className='border p-2 mb-2 w-full rounded-lg focus:outline-cyan-500 bg-teal-700'
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder='Edit email'
            />
            <input
              type='password'
              className='border p-2 mb-2 w-full rounded-lg bg-teal-700'
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder='Edit password'
            />
            <button
              className='bg-teal-500 text-white p-2 rounded w-full'
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className='bg-gray-800 text-white p-2 rounded w-full mt-2'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default Home;
