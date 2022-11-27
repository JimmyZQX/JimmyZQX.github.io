/*
Input: a translated tree
Output: corresponding Latex
Description: A function to call combine method in tree root to get the latex string

2022.10.12 created, only works for simple equation with operators at this stage.
*/
function combineTree2Latex(tree){
	tree.root.combine();
	return tree.root.value;
}