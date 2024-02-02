let refreshTokens = [];

function cacheFunc(token){
    refreshTokens.push(token);
    return;
};


async function deleteToken(token) {
    refreshTokens = refreshTokens.filter((c) => c !== token);
    return;
};

function searchToken(token){
    return refreshTokens.includes(token);
}

module.exports = { cacheFunc, deleteToken, searchToken };