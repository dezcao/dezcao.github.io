function linuxMasterFn() {
	try {
		const hidra = document.querySelectorAll('.hidra');
		if (hidra[0].classList.contains('burrow')) {
			hidra.forEach(h => {
				h.classList.remove('burrow');
			})
		} else {
			hidra.forEach(h => {
				h.classList.add('burrow');
			})
		}
	} catch (error) {
		
	}
}