// Initialize user data
export let userData = (() => {
  const data = sessionStorage.getItem('authToken')
  return data ? JSON.parse(data) : null
})()

// Initialize saveData
export let saveData = {
  sceneID: userData?.save?.sceneID || null,
  hasJade: userData?.save?.hasJade || false,
  hasKey: userData?.save?.hasKey || false,
  cheatCount: userData?.save?.cheatCount || 0,
}

export function resetSaveData() {
  saveData = {
    sceneID: null,
    hasJade: false,
    hasKey: false,
    cheatCount: 0,
  }
}

// Update the user data
export function setUserData(data = {}) {
  userData = data
  sessionStorage.setItem('authToken', JSON.stringify(data))
  saveData = data.save
}

// Save the state and upload to the db server
export async function saveState() {
  if (!userData) {
    return false
  }

  userData.save = saveData
  sessionStorage.setItem('authToken', JSON.stringify(userData))

  const res = await fetch(`http://localhost:3000/users/${userData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ save: saveData }),
  })

  if (res.ok) {
    return true
  }

  return false
}
