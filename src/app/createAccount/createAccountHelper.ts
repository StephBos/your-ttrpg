async function fetchUsers(){
    console.log('getting all users')
    try {
      const response = await fetch("http://localhost:3000/users")
            
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  export default {
    fetchUsers
  }