const users = [
    {
        user: "arisuser",
        password: "123",
    },
    {
        user: "arisadmin",
        password: "123",
    },
];

export const getUser = (username) => {
    const found = users.find(user => user.user === username);
    return found;
};
