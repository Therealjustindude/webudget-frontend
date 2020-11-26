export const loadState = () => {
	try {
	  const serializedState= localStorage.getItem('currentUser');
	  if (serializedState === null) {
		return undefined;
	  }
	  return JSON.parse(serializedState);
	} catch (err) {
	  return undefined;
	}
};
  
export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
	  	localStorage.setItem('currentUser', serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveToken = (token) => {
		localStorage.setItem('authToken', token);
};

export const removeAuth = () => {
	localStorage.removeItem('currentUser')
	localStorage.removeItem('authToken')
};
  
