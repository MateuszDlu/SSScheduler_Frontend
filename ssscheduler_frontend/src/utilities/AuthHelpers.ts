const getCurrentUser = () => JSON.parse(sessionStorage.getItem('user') as string);
const isAuthenticated = () => {
    const user = getCurrentUser();
    return !!user;
}

export {getCurrentUser, isAuthenticated};