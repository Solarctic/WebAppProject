// Initialize user data safely
export let userData = (() => {
  const data = sessionStorage.getItem('authToken')
  return data ? JSON.parse(data) : null
})()

// Initialize saveData
export let saveData = {
  sceneID: userData?.save?.sceneID || null,
  hasJade: userData?.save?.hasJade || false,
  hasKey: userData?.save?.hasKey || false,
}

export function setUserData(data = {}) {
  userData = data
  sessionStorage.setItem('authToken', JSON.stringify(data))
  saveData = data.save
}

// export function saveStateLocal() {
//   userData.save = saveData
//   sessionStorage.setItem('authToken', JSON.stringify(userData))
// }

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

export function loadState() {
  //   if (!userData) {
  //     return false
  //   }

  //   const res = await fetch(`http://localhost:3000/users/${userData.id}`)

  //   if (res.ok) {
  //     const data = await res.json()
  //     userData = data
  //     saveData = data.save
  //     sessionStorage.setItem('authToken', JSON.stringify(data))
  //     return true
  //   }

  return userData != null
}
