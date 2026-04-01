const store = {
  users: [
    {
      _id: 'default_user_1',
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
      contactNumber: '9876543210'
    }
  ],
  interviews: [],
};

const findUserByEmail = (email) => store.users.find(u => u.email === email);
const addUser = (user) => {
  const newUser = { ...user, _id: Date.now().toString() };
  store.users.push(newUser);
  return newUser;
};
const findUserById = (id) => store.users.find(u => u._id === id);

const addInterview = (interview) => {
  const newInterview = { ...interview, _id: Date.now().toString(), createdAt: new Date() };
  store.interviews.push(newInterview);
  return newInterview;
};
const findInterviewsByUserId = (userId) => store.interviews.filter(i => i.userId === userId);

module.exports = {
  store,
  findUserByEmail,
  addUser,
  findUserById,
  addInterview,
  findInterviewsByUserId,
};
