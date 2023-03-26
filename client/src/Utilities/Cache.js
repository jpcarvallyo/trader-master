const CacheObj = {}; 

const Cache = (() => {
	const set =  (searchTerm, data) => {
		CacheObj[searchTerm] = data;
	}
	const results = () => {
		return CacheObj;
	}

	const contains = (searchTerm) => {
		return Boolean(CacheObj[searchTerm] || undefined);
	}

    const get = (searchTerm) => {
        return CacheObj[searchTerm];
    }

	return {
		set,
		results,
		contains,
        get,
	}
})();


export default Cache;