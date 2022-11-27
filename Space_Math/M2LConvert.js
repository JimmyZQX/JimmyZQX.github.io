/*
Input: a string of math text
Output: the corresponding Latex string of that math text
Description: A helper function which generalize several steps to take the original Spacemath input into corresponding Latex output.

2022.10.07 created, only trivial return of test need is done at this stage.
2022.10.12 test method for M2Tree;
*/
function M2LConvert(str){
    console.log(M2TreeConvert(str));
    //return "M" + str + "M"; // for temporary test use

    let tree = M2TreeConvert(str);
    //let translatedTree = translate(tree);
    let latexStr = combineTree2Latex(tree);
    return trimSpaces(latexStr);
    return latexStr;
}