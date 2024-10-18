
export function debounce(func: (...args: any[]) => void, wait: number) {
	let timeout: any;
	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function getRandomNumberBetween(min: number, max: number) : number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomNumber(): number {
	return Math.floor(Math.random() * 100);
}


export function parseString(string: string) : string[] {
    return string.replace(/[^a-zA-Z ]/g, '').trim().split(' ');
}