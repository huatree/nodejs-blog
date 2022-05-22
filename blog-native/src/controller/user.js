const signIn = (username, password) => {
  console.log('signIn', username, password)
  if (username === 'lisi' && password === '123') {
    return true
  }
  return false
}

module.exports = {
  signIn
}
