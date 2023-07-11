const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	
	//iterate over fruit array 
	for(let searchStr of fruit){
		//checking if the search string is a substring of the string pulled from the fruit array
		//adding any matches to the results, ignoring case 
		//old code:.slice(0,str.length)
		if(searchStr.toLowerCase().includes(str.toLowerCase())) 
			results.push(searchStr);
	}
	//send an empty array if the search string is empty
	if(str == "") results = [];
	return results;
}

function searchHandler(e) {
	//gets triggered every time a new character is entered
	console.log(input.value);
	//get the current input
	let inputVal = input.value;
	//get the search results from that input
	let results = search(inputVal);
	//and send both input and results to the showSuggestion() function
	showSuggestions(results,inputVal);
	//as is the best practice, seperating input, format, and underlying logic
	//into their own functions
}

function showSuggestions(results, inputVal) {
	//create a suggestions ul based on the current input
	//clear the ul so that the suggestions are only based on the current input
	suggestions.innerHTML = "";
	//loop through all the results
	for(let fruit of results){
		//create an li element and add it to the suggestion ul
		let newSug = document.createElement("li");
		//use inputVal to bold the relavent characters in the suggestion list
		let index = fruit.toLowerCase().indexOf(inputVal.toLowerCase());
		let newFruit = fruit.slice(0,index) + "<b>" + fruit.slice(index,index+inputVal.length);
		newFruit += "</b>" +fruit.slice(index+inputVal.length,fruit.length);
		newSug.innerHTML = newFruit;
		suggestions.appendChild(newSug);
	}
	//how do I make it so that it only shows up while the cursor is in the search box?
	//Is there a "cursorLocation" property somewhere?
	//that's advanced behavior that I can wait to implement
}

function useSuggestion(e) {
	// respond to the click of one of the suggestions
	//get the fruit clikced
	//use that to populate the input
	input.value = e.target.innerText;
	//clear suggestion list
	showSuggestions([],"");
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);