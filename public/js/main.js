const textElement = document.querySelector('#text')
const optionButtonsElement = document.querySelector('#option-buttons')

let state = {

}

const textNodes = [
	{
		id: 1,
		text: 'Vous vous réveillez dans la lisère d\'une étrange forêt...',
		options: [
			{
				text: 'Entrer dans la fôret',
				nextText: 2,
			},
			{
				text: 'Prendre la fuite',
				nextText: 3,
			}
		]
	},
	{
		id: 2,
		text: 'Un loup vous mange. Vous êtes mort.',
		options: [
			{
				text: 'Recommencer',
				// requiredState: (currentState) => currentState.rifle,
				// setState: { rifle: true },
				nextText: -1,
			}
		],
	},
	{
		id: 3,
		text: 'Vous entendez les cris d\'un enfant qui se fait dévorer par des loups.',
		options: [
			{
				text: 'Recommencer',
				nextText: -1,
			}
		],
	},
]

/**
 * Start the game and run it
 */
const startGame = () => {
	state = {}
	showTextNode(1)
}

/**
 * Show the text node with the param id
 * 
 * @param {number} textNodeIndex 
 */
const showTextNode = (textNodeIndex) => {
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
	textElement.innerText = textNode.text

	while(optionButtonsElement.firstChild) {
		optionButtonsElement.removeChild(optionButtonsElement.firstChild)
	}

	textNode.options.forEach(option => {
		if(showOption(option)) {
			const button = document.createElement('button')
			button.innerText = option.text
			button.classList.add('btn')
			button.addEventListener('click', () => selectOption(option))
			optionButtonsElement.appendChild(button)
		}
	})
}

/**
 * Check if the textNode has options and show them
 * 
 * @param {object} option 
 */
const showOption = (option) => {
	return option.requiredState == null || option.requiredState(state)
}

/**
 * Handle player's choices
 * 
 * @param {object} option 
 */
const selectOption = (option) => {
	const nextTextNodeId = option.nextText

	if(nextTextNodeId <= 0) {
		return startGame()
	}

	state = Object.assign(state, option.setState)
	showTextNode(nextTextNodeId)
}

startGame()