function RandomGreet() {
	let greet = [];

	greet[1] = "Hello";
	greet[2] = "Hi";
	greet[3] = "Hey";
	greet[4] = "Welcome";
	greet[5] = "Hello there";
	greet[6] = "Hi there";
	greet[7] = "Hey there";

	let genGreet = Math.floor(Math.random() * greet.length);
	if (genGreet === 0) genGreet = 1;
	return greet[genGreet];
}

export { RandomGreet };
