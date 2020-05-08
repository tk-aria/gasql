export const sync = router => {
	if (!window.google) {
	  return
	}
  
	window.google.script.url.getLocation(location => {
	  const path = location.hash
	  const query = location.parameter
	  router.replace({ path, query })
	})
  
	router.afterEach(route => {
	  window.google.script.history.replace(null, route.query, route.path)
	})
}